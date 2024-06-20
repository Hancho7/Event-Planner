import { watchLogin } from "./auth/login";
import { watchRegister } from "./auth/register";
import { watchVerifyEmail } from "./auth/verifyEmail";
import { watchGetAllEvents } from "./events/getAllEvents";

export const sagas = [
  //authentication
  watchRegister(),
  watchLogin(),
  watchVerifyEmail(),

  //events
  watchGetAllEvents(),
];
