import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/auth/registerSlice";
import loginReducer from "../features/auth/loginSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    //Authentication
    register: registerReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
