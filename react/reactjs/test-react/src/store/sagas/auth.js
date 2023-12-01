import { delay, put } from 'redux-saga/effects';

// redux sagas are used to handle side-effects
// they don't change the store
// function* is a generator, it can be executed incrementally
// they don't run from start to end immediatly but can be paused during async code to finish
// if sync code is used they will finish to end

// yield will wait for the line to execute before continuing
// put is used to dispatch actions to store
export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
//   to delay exec instead of using setTimeOut
  yield delay(1000);
  //   we can either dispatch actions or import an action creators and run it inside put
  yield put({ type: 'AUTH_LOGOUT' });
}
