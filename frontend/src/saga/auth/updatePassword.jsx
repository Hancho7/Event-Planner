import {
  updatePasswordAction,
  updatePasswordError,
  updatePasswordPending,
  updatePasswordSuccess,
} from "../../features/auth/updatePassword";
import axios from "../../api/main";
import { updatePassword } from "../../api/endpoints";
import { put, call, takeLatest } from "redux-saga/effects";

function* handleUpdatePassword(action) {
  console.log("sign in payload", action.payload);
  console.log(action.payload)
  try {
    yield put(updatePasswordPending()); // Start loading

    const response = yield call(
      axios.post,
      `${updatePassword}/${action.payload.userID}/${action.payload.tokenLink}`,
      action.payload
    );
    console.log("forget-password response saga", response);

    // Assuming your response structure is consistent with the middleware
    const { status, code, message, data } = response.data;

    // Dispatch success action
    yield put(updatePasswordSuccess({ status, code, message, data }));
  } catch (error) {
    // Dispatch error action
    yield put(updatePasswordError(error));
  }
}

export function* watchUpdatePassword() {
  yield takeLatest(updatePasswordAction, handleUpdatePassword);
}
