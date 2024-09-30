import { handleErrorResponse } from "../utils/handleError";
import API from "./api";
import request from "./http.service";

// Lấy ra list danh sách user
export const getListUser = async () => {
  const params = {};

  try {
    const response = await request().get(API.USER, { params });

    return {
      data: response.data,
      status_code: response.status,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
};
