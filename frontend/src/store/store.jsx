import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/auth/registerSlice";
import loginReducer from "../features/auth/loginSlice";
import getAllEventsReducer from "../features/events/getAllEvents";
import plannerRequestReducer from "../features/payments/initializePlanner";
import addNewEventReducer from "../features/events/addNewEvents";
import getUserPaymentsReducer from "../features/payments/getUserPayments";
import deletePaymentRequestReducer from "../features/payments/deletePaymentRequest";
import attendEventReducer from "../features/events/attendEvent";
import verifyEmailReducer from "../features/auth/verifyEmail";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    //Authentication
    register: registerReducer,
    login: loginReducer,
    verifyEmail: verifyEmailReducer,

    //payments
    plannerRequest: plannerRequestReducer,
    getUserPayments: getUserPaymentsReducer,
    deletePaymentRequest: deletePaymentRequestReducer,

    //events
    addNewEvent: addNewEventReducer,
    getAllEvents: getAllEventsReducer,
    attendEvent: attendEventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
