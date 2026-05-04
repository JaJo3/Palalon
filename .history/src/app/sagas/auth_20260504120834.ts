import { put, takeLatest, call } from 'redux-saga/effects';
import {
  USER_LOGIN,
  USER_LOGOUT,
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
export function* initAuthAsync(): Generator<any, void, any> {
  try {
    // Check if user is already signed in with Firebase/Google
    const isSignedIn: boolean = yield call(_isSignedIn);
    console.log('Auth Initialization - User signed in:', isSignedIn);
    
    // Get token from AsyncStorage if available
    if (isSignedIn) {
      const token: string | null = yield call([AsyncStorage, 'getItem'], 'auth_token');
      if (token) {
        console.log('Existing token found, restoring session');
        yield put({
          type: USER_LOGIN_COMPLETE,
          payload: { token, access_token: token },
        });
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
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
export function* userLogoutAsync(action: LogoutAction): Generator<any, void, any> {
  console.log('User Logout Action:', action.payload);
  try {
    // Clear token from AsyncStorage
    yield call([AsyncStorage, 'removeItem'], 'auth_token');
    console.log('Token removed from AsyncStorage');
    
    // Dispatch USER_LOGOUT action to reset auth state in Redux
    // This will trigger navigation back to AuthNav (login screen)
    yield put({ type: USER_LOGOUT });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Logout Error:', errorMessage);
  }
}

// Listens for USER_LOGOUT actions and executes userLogoutAsync saga
export function* userLogout(): Generator<any, void, any> {
  yield takeLatest(USER_LOGOUT, userLogoutAsync);
}
