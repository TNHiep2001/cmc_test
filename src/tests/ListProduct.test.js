import { render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import ListProduct from "../views/listProduct";
import { getListProduct } from "../service/product";
import { Provider } from "react-redux";
import { store } from "../store";

// Mock các module bên ngoài
jest.mock("../service/product");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("ListProduct Component", () => {
  // Mock dữ liệu sản phẩm
  const mockProducts = [
    { id: 1, title: "Product 1", description: "Description 1" },
    { id: 2, title: "Product 2", description: "Description 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks(); // Xóa mọi mock trước mỗi test
  });

  test("Hiển thị tiêu đề danh sách sản phẩm", () => {
    render(
      <Provider store={store}>
        <ListProduct />
      </Provider>
    );
    // Kiểm tra xem tiêu đề có được render đúng không
    expect(screen.getByText(/Danh sách sản phẩm/i)).toBeInTheDocument();
  });

  test("Hiển thị danh sách sản phẩm khi call API thành công", async () => {
    // Mock API trả về dữ liệu thành công
    getListProduct.mockResolvedValue({
      status_code: 200,
      data: mockProducts,
    });

    render(
      <Provider store={store}>
        <ListProduct />
      </Provider>
    );

    // Sử dụng `findByText` để kiểm tra sự xuất hiện của sản phẩm
    expect(await screen.findByText(/Product 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Product 2/i)).toBeInTheDocument();
  });

  test("Hiển thị thông báo khi call API thất bại", async () => {
    // Mock API trả về lỗi
    getListProduct.mockResolvedValue({
      status_code: 400,
      message: "Failed to fetch products",
    });

    render(
      <Provider store={store}>
        <ListProduct />
      </Provider>
    );

    // Chờ để kiểm tra thông báo lỗi
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to fetch products");
    });
  });
});
