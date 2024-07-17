import {
    forgetPasswordAction,
    forgetPasswordError,
    forgetPasswordPending,
    forgetPasswordSuccess,
  } from "../../features/auth/forgetPassword";
  import axios from "../../api/main";
  import { forgetPassword } from "../../api/endpoints";
  import { put, call, takeLatest } from "redux-saga/effects";
  
  function* handleForgetPassword(action) {
    console.log("sign in payload", action.payload);
    try {
      yield put(forgetPasswordPending()); // Start loading
  
      const response = yield call(axios.post, forgetPassword, action.payload);
      console.log("forget-password response saga", response);
  
      // Assuming your response structure is consistent with the middleware
      const { status, code, message, data } = response.data;
  
      // Dispatch success action
      yield put(forgetPasswordSuccess({ status, code, message, data }));
    } catch (error) {
      // Dispatch error action
      yield put(forgetPasswordError(error));
    }
  }
  
  export function* watchForgetPassword() {
    yield takeLatest(forgetPasswordAction, handleForgetPassword);
  }
  