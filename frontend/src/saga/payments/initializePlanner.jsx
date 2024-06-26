import {
  plannerRequestAction,
  plannerRequestError,
  plannerRequestPending,
  plannerRequestSuccess,
} from "../../features/payments/initializePlanner";
import axios from "../../api/main";
import { plannerRequest } from "../../api/endpoints";
import { put, call, takeLatest } from "redux-saga/effects";

function* handlePlannerRequest(action) {
  console.log("Planner initialization payload", action.payload);
  try {
    yield put(plannerRequestPending()); // Start loading

    const response = yield call(axios.post, plannerRequest, action.payload);
    console.log("Planner request response saga\n", response);

    // Assuming your response structure is consistent with the middleware
    const { status, code, message, data } = response.data;

    // Dispatch success action
    yield put(plannerRequestSuccess({ status, code, message, data }));
  } catch (error) {
    // Dispatch error action
    yield put(plannerRequestError(error));
  }
}

export function* watchPlannerRequest() {
  yield takeLatest(plannerRequestAction, handlePlannerRequest);
}
