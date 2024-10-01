import { statusCode } from "../constants/status";

export const handleErrorResponse = (errors) => {
  const { status } = errors.response || {};

  let getMessageError = () => {
    switch (status) {
      case statusCode.unProcessable: {
        return "Không thể xử lý";
      }

      case statusCode.unauthorized: {
        return "Bạn chưa đăng nhập. Vui lòng đăng nhập lại.";
      }

      case statusCode.notFound: {
        return "Không tìm thấy tài nguyên.";
      }

      case statusCode.forbidden: {
        return "Bạn không có quyền truy cập.";
      }

      default: {
        // Trường hợp lỗi 500 thông thường do không thể kết nối tới server
        return "Lỗi máy chủ. Vui lòng thử lại sau.";
      }
    }
  };

  return {
    ...(errors.response?.data || {}),
    status_code: status,
    message: getMessageError(),
  };
};
