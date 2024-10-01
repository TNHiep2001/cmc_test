import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./styles/Login.module.scss";
import { Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { initInfoUser } from "../../constants/login";
import FormInput from "../../components/FormControl/FormInput";
import { getListUser } from "../../service/login";
import { statusCode } from "../../constants/status";
import { useDispatch } from "react-redux";
import { saveInfoUser } from "../../store/reducers/infoUser";
import STORAGE_KEYS from "../../constants/storages";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { toast } from "react-toastify";
import { loginSchema } from "../../schema/login";

const cx = classNames.bind(styles);

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorLogin, setErrorLogin] = useState();

  // validate form and submit to server
  /**
   * Bắt validate và handle submit
   */
  const formik = useFormik({
    initialValues: initInfoUser,
    validationSchema: loginSchema(),
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

  const handleLogin = useCallback(
    async (values) => {
      const { data, status_code, message } = await getListUser();

      if (status_code === statusCode.successNumer) {
        //check tài khoản ở dây
        const user = data?.find(
          (user) =>
            user?.email === values?.email && user?.password === values?.password
        );

        if (user) {
          dispatch(
            saveInfoUser({
              user: user,
              token: "123jqk",
            })
          );
          localStorage.setItem(STORAGE_KEYS.INFO_USER, JSON.stringify(user));
          localStorage.setItem(STORAGE_KEYS.TOKEN, "123jqk");
          toast.success("Đăng nhập thành công");
          navigate("/listProduct");
        } else {
          toast.error("Vui lòng kiểm tra lại tài khoản hoặc mật khẩu");
          setErrorLogin("Vui lòng kiểm tra lại tài khoản hoặc mật khẩu");
        }
      } else {
        toast.error(message);
        setErrorLogin("Đăng nhập thất bại");
      }
    },
    [dispatch, navigate]
  );

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
      {renderBtnBack()}
      <div className={cx("inner")}>
        <div className={cx("title")}>Đăng nhập</div>
        {renderInputEmail()}
        {renderInputPassword()}
        {renderBtnSubmit()}
        <Typography className={cx("error_login")}>{errorLogin}</Typography>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
