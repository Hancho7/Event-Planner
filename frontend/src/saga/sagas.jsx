import { watchRegister } from "./logs/register";

export const sagas = [
  //authentication
  watchRegister(),
];
