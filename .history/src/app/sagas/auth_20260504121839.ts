import { put, takeLatest, call } from 'redux-saga/effects';
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGOUT_REQUEST,
  USER_LOGIN_REQUEST,
  USER_LOGIN_COMPLETE,
  USER_LOGIN_ERROR,
  INIT_AUTH,
  INIT_AUTH_COMPLETE,
} from '../actions';
import { authLogin, LoginPayload } from '../api/auth';
import { _isSignedIn } from '../../utils/firebase';

// AsyncStorage import for token management
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginAction {
  type: string;
  payload: LoginPayload;
}

// Initializes auth state by checking for existing signed-in user (non-blocking)
// Prioritizes AsyncStorage token over Firebase to ensure Symfony JWT persists on restart
export function* initAuthAsync(): Generator<any, void, any> {
  try {
    // First, prioritize checking AsyncStorage for existing auth_token (Symfony JWT)
    const token: string | null = yield call([AsyncStorage, 'getItem'], 'auth_token');
    
    if (token) {
      console.log('Existing JWT token found in AsyncStorage, restoring Symfony session');
      yield put({
        type: USER_LOGIN_COMPLETE,
        payload: { token, access_token: token },
      });
    } else {
      // Fall back to Firebase verification if no token in AsyncStorage
      const isSignedIn: boolean = yield call(_isSignedIn);
      console.log('No JWT token found, checking Firebase sign-in status:', isSignedIn);
      
      if (!isSignedIn) {
        console.log('User not signed in - login required');
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Init auth error';
    console.error('Auth Initialization Error:', errorMessage);
  } finally {
    // Always mark initialization as complete, whether successful or not
    // This prevents the splash screen from blocking the app
    yield put({ type: INIT_AUTH_COMPLETE });
  }
}

// Listens for INIT_AUTH actions and executes initAuthAsync saga
export function* initAuth(): Generator<any, void, any> {
  yield takeLatest(INIT_AUTH, initAuthAsync);
}

// Handles async login API call, token storage, and login state updates
// Properly handles 401 Unauthorized and other error responses from Symfony backend
export function* userLoginAsync(action: LoginAction): Generator<any, void, any> {
  console.log('User Login Action:', action.payload);
  yield put({ type: USER_LOGIN_REQUEST });
  try {
    const response: any = yield call(authLogin, action.payload);
    console.log('Login Success Response:', { payload: response });
    console.log('Token:', response.token);

    // Save token to AsyncStorage
    if (response.token) {
      yield call([AsyncStorage, 'setItem'], 'auth_token', response.token);
      console.log('Token saved to AsyncStorage');
    }
    yield put({ type: USER_LOGIN_COMPLETE, payload: response });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Invalid credentials';
    console.error('Login Error:', errorMessage);
    yield put({ type: USER_LOGIN_ERROR, payload: errorMessage });
  }
}

// Listens for USER_LOGIN actions and executes userLoginAsync saga
export function* userLogin(): Generator<any, void, any> {
  yield takeLatest(USER_LOGIN, userLoginAsync);
}

interface LogoutAction {
  type: string;
  payload?: any;
}

// Handles logout by clearing token and resetting authentication state
// Ensures USER_LOGOUT is only dispatched after token is successfully removed from AsyncStorage
export function* userLogoutAsync(action: LogoutAction): Generator<any, void, any> {
  console.log('User Logout Action:', action.payload);
  try {
    // Clear token from AsyncStorage
    yield call([AsyncStorage, 'removeItem'], 'auth_token');
    console.log('Token removed from AsyncStorage');
    
    // Dispatch USER_LOGOUT action only after successful token removal
    // This resets auth state in Redux and triggers navigation back to login screen
    yield put({ type: USER_LOGOUT });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Logout Error:', errorMessage);
    
    // Still dispatch logout to ensure user can access login screen even if token removal fails
    yield put({ type: USER_LOGOUT });
  }
}

// Listens for USER_LOGOUT_REQUEST actions and executes userLogoutAsync saga
// Prevents infinite loops by separating request action (USER_LOGOUT_REQUEST) from completion action (USER_LOGOUT)
export function* userLogout(): Generator<any, void, any> {
  yield takeLatest(USER_LOGOUT_REQUEST, userLogoutAsync);
}
