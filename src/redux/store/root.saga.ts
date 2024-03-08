import {all} from 'redux-saga/effects';
import {watchFetchUsers} from '../sagas/user.saga';

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    // Add other sagas here
  ]);
}
