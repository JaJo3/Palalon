import { all } from 'redux-saga/effects';
import { userLogin, userLogout, initAuth } from './auth';

// Combines all application sagas (login, logout, and init) for concurrent execution
export default function* rootSaga() {
  yield all([initAuth(), userLogin(), userLogout()]);
}
