import {
  registerPending,
  registerSuccess,
  registerError,
  registerAction,
} from "../../features/auth/registerSlice";
import axios from "../../api/main";
import { signUp } from "../../api/endpoints";
import { put, call, takeLatest } from "redux-saga/effects";

function* handleRegister(action) {
  console.log("sign up payload", action.payload);
  try {
    yield put(registerPending()); // Start loading

    const response = yield call(axios.post, signUp, action.payload);
    console.log("register response saga", response)

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
