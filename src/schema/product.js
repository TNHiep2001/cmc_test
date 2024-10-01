import * as Yup from "yup";
import { ERROR_MESSAGE, errorCharacter } from "../constants/message";

export const productSchema = () => {
  return Yup.object({
    title: Yup.string()
      .max(100, errorCharacter(100))
      .required(ERROR_MESSAGE.textRequired),
    description: Yup.string()
      .max(1024, errorCharacter(1024))
      .required(ERROR_MESSAGE.textRequired),
    image: Yup.string().required(ERROR_MESSAGE.textRequired),
    price: Yup.number().required(ERROR_MESSAGE.textRequired),
    quantity: Yup.number().required(ERROR_MESSAGE.textRequired),
    status: Yup.object().nullable().required(ERROR_MESSAGE.textRequired),
  });
};
