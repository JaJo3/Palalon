import { all } from 'redux-saga/effects';
import { userLogin, userLogout } from './auth';

// Combines all application sagas (login and logout) for concurrent execution
export default function* rootSaga() {
  yield all([userLogin(), userLogout()]);
}
