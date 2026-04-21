import { put, takeLatest, call } from 'redux-saga/effects';
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_COMPLETE,
  USER_LOGIN_ERROR,
} from '../actions';
import { authLogin, LoginPayload } from '../api/auth';

// AsyncStorage import for token management
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginAction {
  type: string;
  payload: LoginPayload;
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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Logout Error:', errorMessage);
  }
}

// Listens for USER_LOGOUT actions and executes userLogoutAsync saga
export function* userLogout(): Generator<any, void, any> {
  yield takeLatest(USER_LOGOUT, userLogoutAsync);
}
