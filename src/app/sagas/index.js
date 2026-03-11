import { all } from 'redux-saga/effects';
import { userLogin, userLogout } from './auth';

export default function* rootSaga() {
  yield all([
    userLogin(),
    userLogout(),
  ]);
}

