import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import classNames from "classnames/bind";
import styles from "./styles/ProductForm.module.scss";

const cx = classNames.bind(styles);

const ProductForm = (props) => {
  const { id } = useParams();

  const [loading, setLoading] = useState();

  // validate form and submit to server
  /**
   * Bắt validate và handle submit
   */
  const formik = useFormik({
    // initialValues: initAmenities,
    // validationSchema: amenitiesSchema(id),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const {
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    values,
    touched,
    setValues,
  } = formik;

  const renderTitle = () => {
    const title = () => {
      if (id) return "Chỉnh sửa sản phẩm";
      return "Thêm sản phẩm mới";
    };
    return (
      <Typography fontSize={24} fontWeight="600" marginBottom={4}>
        {title()}
      </Typography>
    );
  };

  const renderBtnSubmit = () => {
    const nameBtn = id ? "Cập nhật" : "Tạo mới";

    return (
      <Box marginTop={4} textAlign="center">
        <Button
          disabled={loading}
          size="medium"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={cx("btn_submit")}
        >
          {loading ? <CircularProgress size="2rem" color="success" /> : nameBtn}
        </Button>
      </Box>
    );
  };

  const renderForm = () => {
    return <Container>{renderBtnSubmit()}</Container>;
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {renderTitle()}
      {renderForm()}
    </Box>
  );
};

ProductForm.propTypes = {};

export default ProductForm;
