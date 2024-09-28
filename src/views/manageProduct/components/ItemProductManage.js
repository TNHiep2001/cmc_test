import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "../styles/ItemProductManage.module.scss";
import { Button, Typography } from "@mui/material";
import { convertPrice } from "../../../utils/number";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const ItemProductManage = ({ infoItem }) => {
  const navigate = useNavigate();

  const renderInfoProduct = () => {
    return (
      <div className={cx("info_product")}>
        <Typography className={cx("title")}>{infoItem.title}</Typography>
        <Typography className={cx("price")}>
          {convertPrice(infoItem.price)}
        </Typography>
        <Typography
          className={cx("quantity")}
        >{`Số lượng ${infoItem.quantity}`}</Typography>
      </div>
    );
  };

  const renderStatusProduct = () => {
    return <div className={cx("status_product")}>{infoItem.status}</div>;
  };

  const renderListAction = () => {
    return (
      <div className={cx("list_action")}>
        <Button
          onClick={() => navigate(`/manageProduct/${infoItem.id}/edit`)}
          className={cx("edit")}
        >
          Chỉnh sửa
        </Button>
        <Button className={cx("delete")}>Xóa</Button>
      </div>
    );
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <img className={cx("image")} src={infoItem.image} alt="" />
        {renderInfoProduct()}
        {renderStatusProduct()}
        {renderListAction()}
      </div>
    </div>
  );
};

ItemProductManage.propTypes = {
  infoItem: PropTypes.object,
};

export default ItemProductManage;
