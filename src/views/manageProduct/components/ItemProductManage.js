import React, { useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "../styles/ItemProductManage.module.scss";
import { Button, Typography } from "@mui/material";
import { convertPrice } from "../../../utils/number";
import { useNavigate } from "react-router-dom";
import API from "../../../service/api";
import request from "../../../service/http.service";
import { statusCode } from "../../../constants/status";
import { handleErrorResponse } from "../../../utils/handleError";

const cx = classNames.bind(styles);

const ItemProductManage = ({ infoItem, handleRefesh }) => {
  const navigate = useNavigate();

  const handleDeleteProduct = useCallback(
    async (id) => {
      try {
        const url = `${API.PRODUCT}/${id}`;
        const res = await request().delete(url);

        if (res.status === statusCode.successNumer) {
          handleRefesh();
        }
      } catch (error) {
        // Hiển hị lỗi xóa thất bại ở đây
        handleErrorResponse(error);
      }
    },
    [handleRefesh]
  );

  const renderInfoProduct = () => {
    return (
      <div className={cx("info_product")}>
        <Typography className={cx("title")}>{infoItem?.title}</Typography>
        <Typography className={cx("price")}>
          {convertPrice(infoItem?.price)}
        </Typography>
        <Typography
          className={cx("quantity")}
        >{`Số lượng: ${infoItem?.quantity}`}</Typography>
      </div>
    );
  };

  const renderStatusProduct = () => {
    return (
      <div
        className={cx("status_product", {
          out_of_stock: !infoItem?.status?.value,
        })}
      >
        {infoItem?.status?.label}
      </div>
    );
  };

  const renderListAction = () => {
    return (
      <div className={cx("list_action")}>
        <Button
          onClick={() => navigate(`/manageProduct/${infoItem?.id}/edit`)}
          className={cx("edit")}
        >
          Chỉnh sửa
        </Button>
        <Button
          onClick={() => handleDeleteProduct(infoItem?.id)}
          className={cx("delete")}
        >
          Xóa
        </Button>
      </div>
    );
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <img className={cx("image")} src={infoItem?.image} alt="" />
        {renderInfoProduct()}
        {renderStatusProduct()}
        {renderListAction()}
      </div>
    </div>
  );
};

ItemProductManage.propTypes = {
  infoItem: PropTypes.object,
  handleRefesh: PropTypes.func,
};

export default ItemProductManage;
