import React from "react";
import PropTypes from "prop-types";
import { Button, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./styles/ManageProduct.module.scss";
import ItemProductManage from "./components/ItemProductManage";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const FAKE_DATA = [
  {
    id: 1,
    title: "Sản Phẩm 1",
    desc: "Mô tả sản phẩm 1 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
    quantity: 1,
    status: "Còn hàng",
  },
  {
    id: 2,
    title: "Sản Phẩm 2",
    desc: "Mô tả sản phẩm 2 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
    quantity: 1,
    status: "Còn hàng",
  },
  {
    id: 3,
    title: "Sản Phẩm 3",
    desc: "Mô tả sản phẩm 3 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
    quantity: 1,
    status: "Còn hàng",
  },
  {
    id: 4,
    title: "Sản Phẩm 4",
    desc: "Mô tả sản phẩm 4 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
    quantity: 1,
    status: "Còn hàng",
  },
  {
    id: 5,
    title: "Sản Phẩm 5",
    desc: "Mô tả sản phẩm 5 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
    quantity: 1,
    status: "Còn hàng",
  },
  {
    id: 6,
    title: "Sản Phẩm 6",
    desc: "Mô tả sản phẩm 6 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
    quantity: 1,
    status: "Còn hàng",
  },
  {
    id: 7,
    title: "Sản Phẩm 7",
    desc: "Mô tả sản phẩm 7 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
    quantity: 1,
    status: "Còn hàng",
  },
  {
    id: 8,
    title: "Sản Phẩm 8",
    desc: "Mô tả sản phẩm 8 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
    quantity: 1,
    status: "Còn hàng",
  },
];

const ManageProduct = (props) => {
  const navigate = useNavigate();

  const renderTitle = () => {
    return (
      <Typography fontSize={26} fontWeight={600}>
        Quản lý sản phẩm
      </Typography>
    );
  };

  const renderBtnAddProduct = () => {
    return (
      <div className={cx("add_product")}>
        <Button
          onClick={() => navigate("/manageProduct/new")}
          className={cx("btn_add_product")}
        >
          <AddCircleOutline /> Thêm mới
        </Button>
      </div>
    );
  };

  const renderListProduct = () => {
    return (
      <div className={cx("list_product")}>
        {FAKE_DATA.map((item) => (
          <ItemProductManage infoItem={item} />
        ))}
      </div>
    );
  };

  return (
    <div className={cx("wrapper")}>
      {renderTitle()}
      {renderBtnAddProduct()}
      {renderListProduct()}
    </div>
  );
};

ManageProduct.propTypes = {};

export default ManageProduct;
