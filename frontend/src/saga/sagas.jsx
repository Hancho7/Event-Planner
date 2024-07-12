import { watchForgetPassword } from "./auth/forgetPassword";
import { watchLogin } from "./auth/login";
import { watchRegister } from "./auth/register";
import { watchUpdatePassword } from "./auth/updatePassword";
import { watchVerifyEmail } from "./auth/verifyEmail";
import { watchAddNewEvent } from "./events/addnewEvent";
import { watchAttendEvent } from "./events/attendEvent";
import { watchGetAllEvents } from "./events/getAllEvents";
import { watchDeletePaymentRequest } from "./payments/deletePaymentRequest";
import { watchGetUserPayments } from "./payments/getUserPayments";
import { watchPlannerRequest } from "./payments/initializePlanner";

export const sagas = [
  //authentication
  watchRegister(),
  watchLogin(),
  watchVerifyEmail(),
  watchForgetPassword(),
  watchUpdatePassword(),

  //events
  watchGetAllEvents(),
  watchAttendEvent(),

  //payments
  watchPlannerRequest(),
  watchGetUserPayments(),
  watchAddNewEvent(),
  watchDeletePaymentRequest(),
];
