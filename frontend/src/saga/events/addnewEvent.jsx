import {
  addNewEventPending,
  addNewEventSuccess,
  addNewEventError,
  addNewEventAction,
} from "../../features/events/addNewEvents";
import axios from "../../api/main";
import { addNewEvents } from "../../api/endpoints";
import { put, call, takeLatest } from "redux-saga/effects";

function* handleAddNewEvent(action) {
  console.log("new event payload", action.payload);
  try {
    yield put(addNewEventPending()); // Start loading

    const response = yield call(axios.post, addNewEvents, action.payload);
    console.log("new event response saga", response);

    // Assuming your response structure is consistent with the middleware
    const { status, code, message, data } = response.data;

    // Dispatch success action
    yield put(addNewEventSuccess({ status, code, message, data }));
  } catch (error) {
    // Dispatch error action
    yield put(addNewEventError(error));
  }
}

export function* watchAddNewEvent() {
  yield takeLatest(addNewEventAction, handleAddNewEvent);
}
