import {
  verifyEmailPending,
  verifyEmailSuccess,
  verifyEmailError,
  verifyEmailAction,
} from "../../features/auth/verifyEmail";
import axios from "../../api/main";
import { put, call, takeLatest } from "redux-saga/effects";

function* handleVerifyEmail(action) {
  console.log("sign in payload", action.payload);
  try {
    yield put(verifyEmailPending()); // Start loading

    const response = yield call(
      axios.post,
      `/logs/${action.payload.userID}/${action.payload.tokenLink}`,
      action.payload
    );
    console.log("verifyEmail response saga", response);

    // Assuming your response structure is consistent with the middleware
    const { status, code, message, data } = response.data;

    // Dispatch success action
    yield put(verifyEmailSuccess({ status, code, message, data }));
  } catch (error) {
    // Dispatch error action
    yield put(verifyEmailError(error));
  }
}

export function* watchVerifyEmail() {
  yield takeLatest(verifyEmailAction, handleVerifyEmail);
}
