// userSaga.ts
import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} from '../slices/user.slice';

function* fetchUsersSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      'https://randomuser.me/api/?results=10',
    );
    yield put(fetchUsersSuccess(response.data.results));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message));
  }
}

export function* watchFetchUsers() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
}
