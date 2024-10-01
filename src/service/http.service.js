import axios from "axios";
import { store } from "../store";
// import { toast } from "react-toastify";

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

  // // Có thể dùng cách này xử lý hiển thị thông báo lỗi toàn cục khi call API
  // const instance = axios.create(defaultOptions);
  // // Thêm interceptor cho các phản hồi
  // instance.interceptors.response.use(
  //   (response) => {
  //     // Nếu phản hồi thành công, trả về dữ liệu như bình thường
  //     return response;
  //   },
  //   (error) => {
  //     // Xử lý các lỗi từ API
  //     if (error.response) {
  //       const status = error.response.status;
  //       // Xử lý các lỗi dựa trên mã trạng thái HTTP
  //       switch (status) {
  //         case 400:
  //           toast.error("Yêu cầu không hợp lệ.");
  //           break;
  //         case 401:
  //           toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
  //           break;
  //         case 403:
  //           toast.error("Bạn không có quyền truy cập.");
  //           break;
  //         case 404:
  //           toast.error("Không tìm thấy tài nguyên.");
  //           break;
  //         case 500:
  //           toast.error("Lỗi máy chủ. Vui lòng thử lại sau.");
  //           break;
  //         default:
  //           toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
  //       }
  //     } else {
  //       // Nếu không có phản hồi từ máy chủ (lỗi mạng)
  //       toast.error("Lỗi kết nối. Vui lòng kiểm tra mạng.");
  //     }
  //     // Trả về lỗi để có thể xử lý thêm ở phía gọi hàm nếu cần
  //     return Promise.reject(error);
  //   }
  // );

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
