import React from "react";
import PropTypes from "prop-types";
import ItemProduct from "./components/ItemProduct";

const FAKE_DATA = [
  { title: "Sản Phẩm 1", desc: "Mô tả sản phẩm 1 nhé", image: "" },
  { title: "Sản Phẩm 2", desc: "Mô tả sản phẩm 2 nhé", image: "" },
  { title: "Sản Phẩm 3", desc: "Mô tả sản phẩm 3 nhé", image: "" },
  { title: "Sản Phẩm 4", desc: "Mô tả sản phẩm 4 nhé", image: "" },
  { title: "Sản Phẩm 5", desc: "Mô tả sản phẩm 5 nhé", image: "" },
  { title: "Sản Phẩm 6", desc: "Mô tả sản phẩm 6 nhé", image: "" },
  { title: "Sản Phẩm 7", desc: "Mô tả sản phẩm 7 nhé", image: "" },
  { title: "Sản Phẩm 8", desc: "Mô tả sản phẩm 8 nhé", image: "" },
];

const ListProduct = (props) => {
  const renderListProduct = () => {
    return FAKE_DATA.map((item) => {
      return <ItemProduct />;
    });
  };
  return <div>{renderListProduct()}</div>;
};

ListProduct.propTypes = {};

export default ListProduct;
