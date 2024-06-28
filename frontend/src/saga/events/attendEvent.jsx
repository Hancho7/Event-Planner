import {
  attendEventAction,
  attendEventError,
  attendEventPending,
  attendEventSuccess,
} from "../../features/events/attendEvent";
import axios from "../../api/main";
import { attendEvent } from "../../api/endpoints";
import { put, call, takeLatest } from "redux-saga/effects";

function* handleAttendEvent(action) {
  try {
    yield put(attendEventPending()); // Start loading

    const response = yield call(axios.post, attendEvent, action.payload);
    console.log("attend events response saga", response);

    // Dispatch success action
    yield put(attendEventSuccess(response.data));
  } catch (error) {
    // Dispatch error action
    yield put(attendEventError(error));
  }
}

export function* watchAttendEvent() {
  yield takeLatest(attendEventAction, handleAttendEvent);
}
