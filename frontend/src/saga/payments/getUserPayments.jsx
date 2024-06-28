import {
    getUserPaymentsAction,
    getUserPaymentsError,
    getUserPaymentsPending,
    getUserPaymentsSuccess,
  } from "../../features/payments/getUserPayments";
  import axios from "../../api/main";
  import { getAllUserPayments } from "../../api/endpoints";
  import { put, call, takeLatest } from "redux-saga/effects";
  
  function* handleGetUserPayments(action) {
    console.log("Payload:", action.payload);
    try {
      yield put(getUserPaymentsPending()); // Start loading
  
      // Construct the correct URL
      const response = yield call(
        axios.get,
        `${getAllUserPayments}/${action.payload}`
      );
      console.log("Payments request response saga:", response);
  
      // Assuming your response structure is consistent with the middleware
      const { status, code, message, data } = response.data;
  
      // Dispatch success action
      yield put(getUserPaymentsSuccess({ status, code, message, data }));
    } catch (error) {
      // Dispatch error action
      yield put(getUserPaymentsError(error));
    }
  }
  
  export function* watchGetUserPayments() {
    yield takeLatest(getUserPaymentsAction, handleGetUserPayments);
  }
  