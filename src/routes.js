import ListProduct from "./views/listProduct";
import DetailProduct from "./views/detailProduct";
import ManageProduct from "./views/manageProduct";
import ProductForm from "./views/manageProduct/ProductForm";

const routes = [
  {
    path: "/listProduct",
    component: ListProduct,
  },
  {
    path: "/detailProduct/:id",
    component: DetailProduct,
  },
  {
    path: "/manageProduct",
    component: ManageProduct,
  },
  {
    path: "/manageProduct/new",
    component: ProductForm,
  },
  {
    path: "/manageProduct/:id/edit",
    component: ProductForm,
  },
];

export default routes;
