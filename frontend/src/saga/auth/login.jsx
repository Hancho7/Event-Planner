import {
  loginPending,
  loginSuccess,
  loginError,
  loginAction,
} from "../../features/auth/loginSlice";
import axios from "../../api/main";
import { login } from "../../api/endpoints";
import { put, call, takeLatest } from "redux-saga/effects";

function* handleLogin(action) {
  console.log("sign in payload", action.payload);
  try {
    yield put(loginPending()); // Start loading

    const response = yield call(axios.post, login, action.payload);
    console.log("login response saga", response);

    // Assuming your response structure is consistent with the middleware
    const { status, code, message, data } = response.data;

    // Dispatch success action
    yield put(loginSuccess({ status, code, message, data }));
  } catch (error) {
    // Dispatch error action
    yield put(loginError(error));
  }
}

export function* watchLogin() {
  yield takeLatest(loginAction, handleLogin);
}
