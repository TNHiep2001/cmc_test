import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./styles/ManageProduct.module.scss";
import ItemProductManage from "./components/ItemProductManage";
import { AddCircleOutline, ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getListProduct } from "../../service/product";
import { statusCode } from "../../constants/status";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ManageProduct = (props) => {
  const navigate = useNavigate();

  const [dataProduct, setDataProduct] = useState([]);

  const handleGetListProduct = useCallback(async () => {
    const { data, status_code, message } = await getListProduct();

    if (status_code === statusCode.successNumer) {
      setDataProduct(data);
    } else {
      toast.error(message);
    }
  }, []);

  useEffect(() => {
    handleGetListProduct();
  }, [handleGetListProduct]);

  const handleRefesh = () => {
    handleGetListProduct();
  };

  const handleBack = () => {
    navigate("/listProduct");
  };

  const renderBtnBack = () => {
    return (
      <div className={cx("btn_back")} onClick={handleBack}>
        <ChevronLeft className={cx("icon_back")} />
      </div>
    );
  };

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
        {dataProduct.map((item, index) => (
          <ItemProductManage
            key={index}
            infoItem={item}
            handleRefesh={handleRefesh}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cx("wrapper")}>
      {renderBtnBack()}
      {renderTitle()}
      {renderBtnAddProduct()}
      {renderListProduct()}
    </div>
  );
};

ManageProduct.propTypes = {};

export default ManageProduct;
