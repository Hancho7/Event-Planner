import { watchLogin } from "./auth/login";
import { watchRegister } from "./auth/register";
import { watchVerifyEmail } from "./auth/verifyEmail";
import { watchAddNewEvent } from "./events/addnewEvent";
import { watchGetAllEvents } from "./events/getAllEvents";
import { watchPlannerRequest } from "./payments/initializePlanner";

export const sagas = [
  //authentication
  watchRegister(),
  watchLogin(),
  watchVerifyEmail(),

  //events
  watchGetAllEvents(),

  //payments
  watchPlannerRequest(),
  watchAddNewEvent(),
];
