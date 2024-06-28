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

    const formData = new FormData();
    formData.append("plannerID", action.payload.plannerID);
    formData.append("name", action.payload.name);
    formData.append("location", action.payload.location);
    formData.append("startOfDate", action.payload.startOfDate);
    action.payload.images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("endOfDate", action.payload.endOfDate);
    formData.append("bookingDeadline", action.payload.bookingDeadline);
    formData.append("attendees", action.payload.attendees || "");
    formData.append(
      "numberOfAttendees",
      action.payload.numberOfAttendees || ""
    );
    formData.append("price", action.payload.price || "");
    console.log("formData", formData);

    const response = yield call(axios.post, addNewEvents, formData);
    console.log("new event response saga", response);

    const { status, code, message, data } = response.data;

    yield put(addNewEventSuccess({ status, code, message, data }));
  } catch (error) {
    yield put(addNewEventError(error));
  }
}

export function* watchAddNewEvent() {
  yield takeLatest(addNewEventAction, handleAddNewEvent);
}
