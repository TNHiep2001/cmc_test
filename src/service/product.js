import { handleErrorResponse } from "../utils/handleError";
import API from "./api";
import request from "./http.service";

// Lấy ra list danh sách product
export const getListProduct = async () => {
  const params = {};

  try {
    const response = await request().get(API.PRODUCT, { params });

    return {
      data: response.data,
      status_code: response.status,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

// Lấy ra detail product
export const getDetailProduct = async (id) => {
  const params = {};

  try {
    const response = await request().get(`${API.PRODUCT}/${id}`, {
      params,
    });

    return {
      data: response.data,
      status_code: response.status,
    };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

// Tạo product
export const createProduct = async (data) => {
  try {
    const response = await request().post(API.PRODUCT, data);
    return {
      data: response.data,
      status_code: response.status,
    };
  } catch (error) {
    handleErrorResponse(error);
  }
};

// Update product
export const editProduct = async (data, id) => {
  try {
    const response = await request().put(`${API.PRODUCT}/${id}`, data);
    return {
      data: response.data,
      status_code: response.status,
    };
  } catch (error) {
    handleErrorResponse(error);
  }
};
