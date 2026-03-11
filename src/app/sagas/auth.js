import { put, takeLatest, call } from 'redux-saga/effects';
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_COMPLETE,
  USER_LOGIN_ERROR,
} from '../actions';
import { authLogin } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function* userLoginAsync(action) {
  console.log('User Login Action:', action.payload);
  yield put({ type: USER_LOGIN_REQUEST });
  try {
    const response = yield call(authLogin, action.payload);
    console.log('Login Success Response:', { payload: response });
    console.log('Token:', response.token);

    // Save token to AsyncStorage
    if (response.token) {
      yield call([AsyncStorage, 'setItem'], 'auth_token', response.token);
      console.log('Token saved to AsyncStorage');
    }
    yield put({ type: USER_LOGIN_COMPLETE, payload: response });
  } catch (error) {
    console.error('Login Error:', error.message);
    yield put({ type: USER_LOGIN_ERROR, payload: error.message });
  }
}

export function* userLogin() {
  yield takeLatest(USER_LOGIN, userLoginAsync);
}

export function* userLogoutAsync(action) {
  console.log('User Logout Action:', action.payload);
  try {
    // Clear token from AsyncStorage
    yield call([AsyncStorage, 'removeItem'], 'auth_token');
    console.log('Token removed from AsyncStorage');
  } catch (error) {
    console.error('Logout Error:', error.message);
  }
}

export function* userLogout() {
  yield takeLatest(USER_LOGOUT, userLogoutAsync);
}