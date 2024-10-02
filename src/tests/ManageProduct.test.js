import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import { getListProduct } from "../service/product";
import { store } from "../store";
import ManageProduct from "../views/manageProduct";

jest.mock("../service/product"); // Giả lập API
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("ManageProduct Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Đảm bảo không còn mock nào tồn đọng
  });

  test("Hiển thị danh sách sản phẩm sau khi call API", async () => {
    // Giả lập API trả về dữ liệu
    getListProduct.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Product A",
          price: 100000,
          quantity: 20,
          image: "test_image.jpg",
          status: { label: "Còn hàng", value: true },
        },
        {
          id: 2,
          title: "Product B",
          price: 200000,
          quantity: 10,
          image: "test_image_2.jpg",
          status: { label: "Còn hàng", value: true },
        },
      ],
      status_code: 200,
    });

    // Render component
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ManageProduct />
        </MemoryRouter>
      </Provider>
    );

    // Đợi API và kiểm tra các sản phẩm có được render đúng không
    const productA = await screen.findByText("Product A");
    expect(productA).toBeInTheDocument();

    const productB = screen.getByText("Product B");
    expect(productB).toBeInTheDocument();
  });

  test("Hiển thị thông báo lỗi khi call API thất bại", async () => {
    // Giả lập API trả về lỗi
    getListProduct.mockResolvedValue({
      status_code: 400,
      message: "Lỗi lấy danh sách sản phẩm",
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ManageProduct />
        </MemoryRouter>
      </Provider>
    );

    // Kiểm tra toast error được gọi
    expect(toast.error).toHaveBeenCalledWith("Lỗi lấy danh sách sản phẩm");
  });

  test("Di chuyển đến form tạo sản phẩm với button onclick", () => {
    const navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ManageProduct />
        </MemoryRouter>
      </Provider>
    );

    // Click nút thêm mới
    const addButton = screen.getByText(/Thêm mới/i);
    fireEvent.click(addButton);

    // Kiểm tra nếu hàm điều hướng được gọi đúng
    expect(navigateMock).toHaveBeenCalledWith("/manageProduct/new");
  });
});
