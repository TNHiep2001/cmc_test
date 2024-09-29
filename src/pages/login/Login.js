import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./styles/Login.module.scss";
import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { initInfoUser } from "../../constants/login";
import FormInput from "../../components/FormControl/FormInput";

const cx = classNames.bind(styles);

const Login = (props) => {
  // validate form and submit to server
  /**
   * Bắt validate và handle submit
   */
  const formik = useFormik({
    initialValues: initInfoUser,
    // validationSchema: amenitiesSchema(id),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  const {
    handleBlur,
    handleSubmit,
    handleChange,
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

  const handleLogin = () => {};

  const renderInputEmail = () => {
    const { email } = values;

    return (
      <Box mt={2}>
        <FormInput
          fullWidthLabel
          fullWidthForm
          id="email"
          name="email"
          value={email}
          label="Tài khoản"
          placeholder="Nhập địa chỉ email của bạn"
          onChange={handleChange}
          onBlur={handleBlur}
          error={validateInputField("email")}
          type="text"
        />
      </Box>
    );
  };

  const renderInputPassword = () => {
    const { password } = values;

    return (
      <Box mt={2}>
        <FormInput
          fullWidthLabel
          fullWidthForm
          id="password"
          name="password"
          value={password}
          label="Mật khẩu"
          placeholder="Nhập mật khẩu của bạn"
          onChange={handleChange}
          onBlur={handleBlur}
          error={validateInputField("password")}
          type="password"
        />
      </Box>
    );
  };

  const renderBtnSubmit = () => {
    return (
      <Button onClick={handleSubmit} className={cx("btn_submit")}>
        Đăng nhập
      </Button>
    );
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("title")}>Đăng nhập</div>
        {renderInputEmail()}
        {renderInputPassword()}
        {renderBtnSubmit()}
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
