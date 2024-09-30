import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "../styles/ItemProduct.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../../utils/number";

const cx = classNames.bind(styles);

const ItemProduct = ({ infoItem }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/detailProduct/${infoItem?.id}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <img src={infoItem.image} alt="" className={cx("image")} />
        <div className={cx("content")}>
          <div className={cx("title")}>{infoItem.title}</div>
          <div className={cx("desc")}>{infoItem.description}</div>
          <div className={cx("price")}>{convertPrice(infoItem.price)}</div>
          <Button
            onClick={handleDetail}
            style={{ background: "#000", color: "#fff", fontSize: "12px" }}
          >
            Chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

ItemProduct.propTypes = { infoItem: PropTypes.object };

export default ItemProduct;
