import React from "react";
import PropTypes from "prop-types";
import ItemProduct from "./components/ItemProduct";
import classNames from "classnames/bind";
import styles from "./styles/ListProduct.module.scss";
import { Typography } from "@mui/material";

const cx = classNames.bind(styles);

const FAKE_DATA = [
  {
    title: "Sản Phẩm 1",
    desc: "Mô tả sản phẩm 1 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
  },
  {
    title: "Sản Phẩm 2",
    desc: "Mô tả sản phẩm 2 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
  },
  {
    title: "Sản Phẩm 3",
    desc: "Mô tả sản phẩm 3 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
  },
  {
    title: "Sản Phẩm 4",
    desc: "Mô tả sản phẩm 4 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
  },
  {
    title: "Sản Phẩm 5",
    desc: "Mô tả sản phẩm 5 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
  },
  {
    title: "Sản Phẩm 6",
    desc: "Mô tả sản phẩm 6 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
  },
  {
    title: "Sản Phẩm 7",
    desc: "Mô tả sản phẩm 7 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
  },
  {
    title: "Sản Phẩm 8",
    desc: "Mô tả sản phẩm 8 nhé",
    price: 300000,
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-23010-qusbwpefyylvd3.webp",
  },
];

const ListProduct = (props) => {
  const renderListProduct = () => {
    return (
      <div className={cx("list_product")}>
        {FAKE_DATA.map((item, index) => {
          return <ItemProduct key={index} infoItem={item} />;
        })}
      </div>
    );
  };

  const renderTitle = () => {
    return (
      <Typography fontSize={26} fontWeight={600}>
        Danh sách sản phẩm
      </Typography>
    );
  };

  return (
    <div className={cx("wrapper")}>
      {renderTitle()}
      {renderListProduct()}
    </div>
  );
};

ListProduct.propTypes = {};

export default ListProduct;
