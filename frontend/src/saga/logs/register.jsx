import {
  registerPending,
  registerSuccess,
  registerError,
  registerAction,
} from "../../features/registerSlice";
import axios from "../../api/main";
import { signUp } from "../../api/endpoints";
import { put, call, takeLatest } from "redux-saga/effects";

function* handleRegister(action) {
  try {
    yield put(registerPending()); // Start loading

    const response = yield call(axios.post, signUp, action.payload);

    // Assuming your response structure is consistent with the middleware
    const { status, code, message, data } = response.data;

    // Dispatch success action
    yield put(registerSuccess({ status, code, message, data }));
  } catch (error) {
    // Dispatch error action
    yield put(registerError(error));
  }
}

export function* watchRegister() {
  yield takeLatest(registerAction, handleRegister);
}
