import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/auth/registerSlice";
import loginReducer from "../features/auth/loginSlice";
import getAllEventsReducer from "../features/events/getAllEvents";
import plannerRequestReducer from "../features/payments/initializePlanner";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    //Authentication
    register: registerReducer,
    login: loginReducer,
    getAllEvents: getAllEventsReducer,

    //payments
    plannerRequest: plannerRequestReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
