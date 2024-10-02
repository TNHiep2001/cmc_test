import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import ProductForm from "../views/manageProduct/ProductForm";
import {
  createProduct,
  editProduct,
  getDetailProduct,
} from "../service/product";

// Mock các API và toast
jest.mock("../service/product", () => ({
  createProduct: jest.fn(),
  editProduct: jest.fn(),
  getDetailProduct: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("ProductForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Hiển thị from", () => {
    render(
      <MemoryRouter>
        <ProductForm />
      </MemoryRouter>
    );

    // Kiểm tra xem các trường nhập có được hiển thị không
    expect(screen.getByLabelText(/Tên sản phẩm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mô Tả sản phẩm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ảnh sản phẩm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Giá sản phẩm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Số lượng sản phẩm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Trạng thái sản phẩm/i)).toBeInTheDocument();
  });

  test("Tạo một sản phẩm khi nhấn submit", async () => {
    createProduct.mockResolvedValue({
      status_code: 201,
    });

    render(
      <MemoryRouter>
        <ProductForm />
      </MemoryRouter>
    );

    // Nhập liệu vào form
    fireEvent.change(screen.getByLabelText(/Tên sản phẩm/i), {
      target: { value: "Sản phẩm mới" },
    });
    fireEvent.change(screen.getByLabelText(/Mô Tả sản phẩm/i), {
      target: { value: "Mô tả sản phẩm" },
    });
    fireEvent.change(screen.getByLabelText(/Giá sản phẩm/i), {
      target: { value: "1000" },
    });
    fireEvent.change(screen.getByLabelText(/Số lượng sản phẩm/i), {
      target: { value: "10" },
    });
    // Giả lập upload ảnh sản phẩm
    const file = new File(["dummy content"], "product.jpg", {
      type: "image/jpeg",
    });
    const inputFile = screen.getByLabelText(/Ảnh sản phẩm/i);
    fireEvent.change(inputFile, { target: { files: [file] } });
    // Thay đổi trạng thái sản phẩm (giả lập lựa chọn trong dropdown)
    fireEvent.change(screen.getByLabelText(/Trạng thái sản phẩm/i), {
      target: { value: JSON.stringify({ label: "Còn hàng", value: true }) },
    });

    // Submit form
    fireEvent.click(screen.getByText(/Tạo mới/i));

    // Đợi hàm createProduct được gọi
    await waitFor(() => {
      expect(createProduct).toHaveBeenCalled();
    });

    // Kiểm tra toast thành công được gọi
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Tạo sản phẩm mới thành công");
    });
  });

  test("Chỉnh sửa sản phẩm khi nhấn submit", async () => {
    const mockProductData = {
      title: "Sản phẩm 1",
      description: "Mô tả sản phẩm",
      image: "image.jpg",
      price: "500",
      quantity: "5",
      status: { value: true, label: "Còn hàng" },
    };

    getDetailProduct.mockResolvedValue({
      data: mockProductData,
      status_code: 200,
    });

    editProduct.mockResolvedValue({
      status_code: 200,
    });

    render(
      <MemoryRouter initialEntries={["/manageProduct/1/edit"]}>
        <ProductForm />
      </MemoryRouter>
    );

    // Chờ dữ liệu sản phẩm được tải về
    await waitFor(() => {
      expect(screen.getByDisplayValue("Sản phẩm 1")).toBeInTheDocument();
    });

    // Thay đổi giá trị và submit form
    fireEvent.change(screen.getByLabelText(/Giá sản phẩm/i), {
      target: { value: "2000" },
    });
    fireEvent.click(screen.getByText(/Cập nhật/i));

    // Kiểm tra hàm editProduct được gọi đúng cách
    await waitFor(() => {
      expect(editProduct).toHaveBeenCalled();
    });

    // Kiểm tra toast thành công được gọi
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Chỉnh sửa sản phẩm thành công"
      );
    });
  });

  test("Hiển thị thông báo lỗi nếu tạo sản phẩm thất bại", async () => {
    createProduct.mockResolvedValue({
      status_code: 400,
      message: "Tạo sản phẩm thất bại",
    });

    render(
      <MemoryRouter>
        <ProductForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Tên sản phẩm/i), {
      target: { value: "Sản phẩm lỗi" },
    });
    fireEvent.click(screen.getByText(/Tạo mới/i));

    // Kiểm tra toast báo lỗi
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Tạo sản phẩm thất bại");
    });
  });
});
