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
import forgetPasswordReducer from "../features/auth/forgetPassword";
import updatePasswordReducer from "../features/auth/updatePassword";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    //Authentication
    register: registerReducer,
    login: loginReducer,
    verifyEmail: verifyEmailReducer,
    forgetPassword: forgetPasswordReducer,
    updatePassword: updatePasswordReducer,

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
