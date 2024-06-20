import {
  getAllEventsAction,
  getAllEventsError,
  getAllEventsPending,
  getAllEventsSuccess,
} from "../../features/events/getAllEvents";
import axios from "../../api/main";
import { getAllEvents } from "../../api/endpoints";
import { put, call, takeLatest } from "redux-saga/effects";

function* handleGetAllEvents() {
  try {
    yield put(getAllEventsPending()); // Start loading

    const response = yield call(axios.get, getAllEvents);
    console.log("get all events response saga", response);

    // Dispatch success action
    yield put(getAllEventsSuccess(response.data));
  } catch (error) {
    // Dispatch error action
    yield put(getAllEventsError(error));
  }
}

export function* watchGetAllEvents() {
  yield takeLatest(getAllEventsAction, handleGetAllEvents);
}
