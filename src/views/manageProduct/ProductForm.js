import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import classNames from "classnames/bind";
import styles from "./styles/ProductForm.module.scss";
import FormInput from "../../components/FormControl/FormInput";
import { initProduct, optionsStatusProduct } from "../../constants/product";
import FormSelect from "../../components/FormControl/FormSelect";
import InputFile from "../../components/FormControl/InputFile";
import { IMG_SIZE_UPLOAD } from "../../constants/units";
import { textErrorSizeImageCustom } from "../../constants/message";
import {
  createProduct,
  editProduct,
  getDetailProduct,
} from "../../service/product";
import { statusCode } from "../../constants/status";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ProductForm = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState();
  // Dùng để render ra UI
  const [previewFile, setPreviewFile] = useState({
    image: "",
  });
  // Hiển thị lỗi của file
  const [errorFile, setErrorFile] = useState({
    image: "",
  });

  // validate form and submit to server
  /**
   * Bắt validate và handle submit
   */
  const formik = useFormik({
    initialValues: initProduct,
    // validationSchema: amenitiesSchema(id),
    onSubmit: (values) => {
      const data = {
        ...values,
        // image: previewFile.image,
      };

      if (id) {
        handleUpdateProduct(data);
      } else {
        handleCreateProduct(data);
      }
    },
  });
  const {
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    values,
    touched,
    setValues,
  } = formik;

  const validateInputField = (name) => {
    if (touched[name] && errors[name]) {
      return errors[name];
    }
    return "";
  };

  const handleCreateProduct = async (data) => {
    setLoading(true);

    const res = await createProduct(data);
    if (
      res?.status_code === statusCode.successNumer ||
      res?.status_code === statusCode.createdSuccess
    ) {
      toast.success("Tạo sản phẩm mới thành công");
      navigate(-1);
    } else {
      toast.error(res?.message);
    }
    setLoading(false);
  };

  const handleUpdateProduct = async (data) => {
    setLoading(true);
    const res = await editProduct(data, id);
    if (res?.status_code === statusCode.successNumer) {
      toast.success("Chỉnh sửa sản phẩm thành công");
      navigate(-1);
    } else {
      toast.error(res?.message);
    }
    setLoading(false);
  };

  const handleGetDetailProduct = useCallback(async () => {
    const { data, status_code, message } = await getDetailProduct(id);

    if (status_code === statusCode.successNumer) {
      setValues(data);
      setPreviewFile((prev) => ({ ...prev, image: data?.image }));
    } else {
      toast.error(message);
    }
  }, [id, setValues]);

  useEffect(() => {
    if (id) handleGetDetailProduct();
  }, [handleGetDetailProduct, id]);

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

  const renderTitleProduct = () => {
    const { title } = values;

    return (
      <Box mt={2}>
        <FormInput
          isRequired
          id="title"
          name="title"
          value={title}
          label="Tên sản phẩm"
          placeholder="Nhập tên sản phẩm"
          onChange={handleChange}
          onBlur={handleBlur}
          error={validateInputField("title")}
          type="text"
          maxLength={100}
        />
      </Box>
    );
  };

  const renderDescProduct = () => {
    const { description } = values;

    return (
      <Box mt={2}>
        <FormInput
          isRequired
          isMultipleLine
          id="description"
          name="description"
          value={description}
          label="Mô Tả sản phẩm"
          placeholder="Nhập mô tả sản phẩm"
          onChange={handleChange}
          onBlur={handleBlur}
          error={validateInputField("description")}
          type="text"
          rows={2}
          styleInput={{
            padding: 0,
          }}
          maxLength={1024}
        />
      </Box>
    );
  };

  // Hàm xử lý chọn ảnh từ local tái sử dụng nhiều chỗ trong file này
  const onChangeOneImage = (e) => {
    const { files, name } = e.target;

    const file = files[0];
    if (file) {
      let errorImage = "";

      if (file.size > IMG_SIZE_UPLOAD(5)) {
        errorImage = textErrorSizeImageCustom(5);
      }

      setErrorFile((prevErrorFile) => {
        return {
          ...prevErrorFile,
          [name]: errorImage,
        };
      });

      if (errorImage) return;

      const url = URL.createObjectURL(file);
      setFieldValue(name, url);
      setPreviewFile((previewFile) => {
        return {
          ...previewFile,
          [name]: url,
        };
      });
    }
  };

  const renderImageProduct = () => {
    return (
      <InputFile
        label="Ảnh sản phẩm"
        id="image"
        name="image"
        previewImage={previewFile.image}
        onChange={onChangeOneImage}
        textError={errorFile.image}
      />
    );
  };

  const renderPriceProduct = () => {
    const { price } = values;

    return (
      <Box mt={2}>
        <FormInput
          isRequired
          id="price"
          name="price"
          value={price}
          label="Giá sản phẩm"
          placeholder="Nhập giá sản phẩm"
          onChange={handleChange}
          onBlur={handleBlur}
          error={validateInputField("price")}
          type="number"
        />
      </Box>
    );
  };

  const renderQuantityProduct = () => {
    const { quantity } = values;

    return (
      <Box mt={2}>
        <FormInput
          isRequired
          id="quantity"
          name="quantity"
          value={quantity}
          label="Số lượng sản phẩm"
          placeholder="Nhập số lượng sản phẩm"
          onChange={handleChange}
          onBlur={handleBlur}
          error={validateInputField("quantity")}
          type="number"
        />
      </Box>
    );
  };

  const renderStatusProduct = () => {
    const { status } = values;

    return (
      <Box mt={2}>
        <FormSelect
          options={optionsStatusProduct}
          onBlur={handleBlur}
          onChange={(_e, newValue) => setFieldValue("status", newValue)}
          value={status}
          placeholder="Lựa chọn trạng thái sản phẩm"
          label="Trạng thái sản phẩm"
          name="status"
          error={validateInputField("status")}
        />
      </Box>
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
    return (
      <Container>
        {renderTitleProduct()}
        {renderDescProduct()}
        {renderImageProduct()}
        {renderPriceProduct()}
        {renderQuantityProduct()}
        {renderStatusProduct()}
        {renderBtnSubmit()}
      </Container>
    );
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
