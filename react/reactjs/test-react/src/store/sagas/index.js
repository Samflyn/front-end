import { takeEvery } from 'redux-saga/effects';

import { logoutSaga } from './auth';

// takeEvery listens to actions and runs the saga when the action is dispatched
export function* watchAuth() {
  yield takeEvery('AUTH_INITIATE_LOGOUT', logoutSaga);
  // the order dosen't matter as it will check for the action type
  // yield takeEvery('AUTH_INITIATE_LOGOUT', logoutSaga);
}
