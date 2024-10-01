import * as Yup from "yup";
import { ERROR_MESSAGE, errorCharacter } from "../constants/message";

export const loginSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email(ERROR_MESSAGE.textErrorEmail)
      .required(ERROR_MESSAGE.textRequired),
    password: Yup.string()
      .min(6, errorCharacter(6))
      .max(25, errorCharacter(25))
      .required(ERROR_MESSAGE.textRequired),
  });
};
