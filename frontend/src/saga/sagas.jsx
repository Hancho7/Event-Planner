import { watchLogin } from "./auth/login";
import { watchRegister } from "./auth/register";
import { watchVerifyEmail } from "./auth/verifyEmail";

export const sagas = [
  //authentication
  watchRegister(),
  watchLogin(),
  watchVerifyEmail,
];
