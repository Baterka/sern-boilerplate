import { put, takeLatest, all, call } from 'redux-saga/effects';
import { SHOW_ERROR, USERNAME_RECEIVED } from '../actions/types';
import axios from 'axios';

function* getUsername() {
    try {
        const res = yield call(() => axios.get('/api/v1/user', {}));

        if (res.data.status !== 'success')
            throw new Error(res.data.data.message);
        yield put({
            type: USERNAME_RECEIVED,
            payload: res.data.data
        });
    } catch (err) {
        yield put({
            type: SHOW_ERROR,
            payload: err.message
        });
    }
}

function* actionWatcher() {
    yield takeLatest('GET_USERNAME', getUsername)
}

export default function* rootSaga() {
    yield all([
        actionWatcher()
    ]);
}
