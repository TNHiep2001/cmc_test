import axios from "axios";
import { store } from "../store";

export default function request() {
  const token = store.getState().infoUser.token;

  const defaultOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "x-access-token": token,
      Authorization: token,
    },
    baseURL: "https://66f9148d2a683ce97310d59c.mockapi.io/",
    timeout: 20000,
  };

  return {
    get: (url, options = {}) =>
      axios.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) => {
      return axios.post(url, data, { ...defaultOptions, ...options });
    },
    put: (url, data, options = {}) =>
      axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) =>
      axios.delete(url, { ...defaultOptions, ...options }),
  };
}
