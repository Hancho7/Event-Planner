import {
  deletePaymentRequestAction,
  deletePaymentRequestError,
  deletePaymentRequestPending,
  deletePaymentRequestSuccess,
} from "../../features/payments/deletePaymentRequest";
import axios from "../../api/main";
import { deletePaymentRequest } from "../../api/endpoints";
import { put, call, takeLatest } from "redux-saga/effects";

function* handleDeletePaymentRequest(action) {
  console.log("Payload:", action.payload);
  try {
    yield put(deletePaymentRequestPending()); // Start loading

    // Construct the correct URL
    const response = yield call(
      axios.post,
      deletePaymentRequest,
      action.payload
    );
    console.log("Payments request delete response saga:", response);

    // Assuming your response structure is consistent with the middleware
    const { status, code, message, data } = response.data;

    // Dispatch success action
    yield put(deletePaymentRequestSuccess({ status, code, message, data }));
  } catch (error) {
    // Dispatch error action
    yield put(deletePaymentRequestError(error));
  }
}

export function* watchDeletePaymentRequest() {
  yield takeLatest(deletePaymentRequestAction, handleDeletePaymentRequest);
}
