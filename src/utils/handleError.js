// import { store } from "store/index";
// import { openDialogUnauthorized } from "store/reducers/dialog";
import { statusCode } from "../constants/status";

export const handleErrorResponse = (errors) => {
  const { status } = errors.response || {};

  let getMessageError = () => {
    switch (status) {
      case statusCode.unProcessable: {
        return "Không thể xử lý";
      }

      case statusCode.unauthorized: {
        // Hiển thị popup phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại
        // store.dispatch(openDialogUnauthorized());
        return "Không được ủy quyền";
      }

      case statusCode.notFound: {
        return "Không tìm thấy";
      }

      default: {
        // Trường hợp lỗi 500 thông thường do không thể kết nối tới server
        return "Lỗi máy chủ";
      }
    }
  };

  return {
    ...(errors.response?.data || {}),
    status_code: status,
    message: getMessageError(),
  };
};
