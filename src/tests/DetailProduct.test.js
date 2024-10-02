import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import { getDetailProduct } from "../service/product";
import { store } from "../store";
import DetailProduct from "../views/detailProduct";

jest.mock("../service/product"); // Giả lập API
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("DetailProduct Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Xóa mock trước mỗi test
  });

  test("Hiển thị chi tiết sản phẩm sau khi gọi API", async () => {
    // Giả lập API trả về dữ liệu
    getDetailProduct.mockResolvedValue({
      data: {
        title: "Sản phẩm A",
        price: 100000,
        rate: 4,
        countRate: 20,
        image: "url_to_image",
        description: "Mô tả sản phẩm A",
      },
      status_code: 200,
    });

    // Render component
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailProduct />
        </MemoryRouter>
      </Provider>
    );

    // Đợi API hoàn thành và kiểm tra các thành phần đã render đúng
    const title = await screen.findByText("Sản phẩm A");
    expect(title).toBeInTheDocument();

    const price = screen.getByText("100.000 VNĐ");
    expect(price).toBeInTheDocument();

    const rate = screen.getByText("4");
    expect(rate).toBeInTheDocument();

    const countRate = screen.getByText("20 đánh giá");
    expect(countRate).toBeInTheDocument();

    const description = screen.getByText("Mô tả sản phẩm A");
    expect(description).toBeInTheDocument();
  });

  test("Hiển thị thông báo lỗi khi call API thất bại", async () => {
    // Giả lập API trả về lỗi
    getDetailProduct.mockResolvedValue({
      status_code: 400,
      message: "Lỗi lấy chi tiết sản phẩm",
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailProduct />
        </MemoryRouter>
      </Provider>
    );

    // Kiểm tra thông báo lỗi hiển thị
    expect(toast.error).toHaveBeenCalledWith("Lỗi lấy chi tiết sản phẩm");
  });
});
