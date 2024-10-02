import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import ItemProductManage from "../views/manageProduct/components/ItemProductManage";
import request from "../service/http.service";

jest.mock("../service/product"); // Giả lập API
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("ItemProductManage Component", () => {
  const mockNavigate = jest.fn();
  const mockHandleRefesh = jest.fn();

  const infoItem = {
    id: 1,
    title: "Product A",
    price: 100000,
    quantity: 10,
    image: "test_image.jpg",
    status: {
      value: true,
      label: "Còn hàng",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);
  });

  test("Hiển thị item thông tin sản phẩm", () => {
    render(
      <MemoryRouter>
        <ItemProductManage
          infoItem={infoItem}
          handleRefesh={mockHandleRefesh}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("100.000 VNĐ")).toBeInTheDocument();
    expect(screen.getByText("Số lượng: 10")).toBeInTheDocument();
    expect(screen.getByText("Còn hàng")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "test_image.jpg");
  });

  test("Di chuyển đến trang chỉnh sửa product khi click button chỉnh sửa", () => {
    render(
      <MemoryRouter>
        <ItemProductManage
          infoItem={infoItem}
          handleRefesh={mockHandleRefesh}
        />
      </MemoryRouter>
    );

    const editButton = screen.getByText("Chỉnh sửa");
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/manageProduct/1/edit`);
  });

  test("Xóa sản phẩm và refreshes danh sách khi bấm button xóa", async () => {
    request.mockResolvedValue({
      status: 200,
    });

    render(
      <MemoryRouter>
        <ItemProductManage
          infoItem={infoItem}
          handleRefesh={mockHandleRefesh}
        />
      </MemoryRouter>
    );

    const deleteButton = screen.getByText("Xóa");
    fireEvent.click(deleteButton);

    await waitFor(async () => {
      expect(request).toHaveBeenCalledWith({
        method: "delete",
        url: "/product/1",
      });
    });

    await waitFor(async () => {
      expect(toast.success).toHaveBeenCalledWith("Xóa sản phẩm thành công");
    });

    await waitFor(async () => {
      expect(mockHandleRefesh).toHaveBeenCalled();
    });
  });

  test("Hiển thị thông báo lỗi khi xóa sản phẩm thất bại", async () => {
    request.mockRejectedValue(new Error("Xóa sản phẩm thất bại"));

    render(
      <MemoryRouter>
        <ItemProductManage
          infoItem={infoItem}
          handleRefesh={mockHandleRefesh}
        />
      </MemoryRouter>
    );

    const deleteButton = screen.getByText("Xóa");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Xóa sản phẩm thất bại");
    });
  });
});
