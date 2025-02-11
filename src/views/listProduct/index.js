import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemProduct from "./components/ItemProduct";
import classNames from "classnames/bind";
import styles from "./styles/ListProduct.module.scss";
import { Box, CircularProgress, Typography } from "@mui/material";
import { statusCode } from "../../constants/status";
import { getListProduct } from "../../service/product";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ListProduct = (props) => {
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetListProduct = useCallback(async () => {
    setLoading(true);
    const { data, status_code, message } = await getListProduct();

    if (status_code === statusCode.successNumer) {
      setDataProduct(data);
    } else {
      toast.error(message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    handleGetListProduct();
  }, [handleGetListProduct]);

  const renderListProduct = () => {
    return (
      <div className={cx("list_product")}>
        {dataProduct.map((item, index) => {
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

  if (loading)
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="error" />
      </Box>
    );

  return (
    <div className={cx("wrapper")}>
      {renderTitle()}
      {renderListProduct()}
    </div>
  );
};

ListProduct.propTypes = {};

export default ListProduct;
