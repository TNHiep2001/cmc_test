import React from "react";
import PropTypes from "prop-types";
import { Button, Drawer, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./styles/PopupMenu.module.scss";
import {
  CloseOutlined,
  LoginOutlined,
  LogoutOutlined,
  ManageSearch,
  Person2Outlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/reducers/infoUser";
import { getInfoUserSelector } from "../../store/reducers/infoUser/infoUserSelector";
import { ROLE } from "../../constants/user";

const cx = classNames.bind(styles);

const PopupMenu = ({ isShowPopupMenu, setIsShowPopupMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, user } = useSelector(getInfoUserSelector);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logOut());
    setIsShowPopupMenu(false);
    navigate("/listProduct");
  };

  const handleNavigateManageProd = () => {
    setIsShowPopupMenu(false);
    navigate("/manageProduct");
  };

  const handleNavigateLogin = () => {
    setIsShowPopupMenu(false);
    navigate("/login");
  };

  const renderManageProduct = () => {
    if (user?.role === ROLE.admin)
      return (
        <div className={cx("action_menu")} onClick={handleNavigateManageProd}>
          <Button className={cx("btn_action_menu")}>
            <ManageSearch />
            <Typography className={cx("title")}>Quản lý sản phẩm</Typography>
          </Button>
        </div>
      );
  };

  const renderUserProfile = () => {
    return (
      <div className={cx("action_menu")}>
        <Button className={cx("btn_action_menu")}>
          <Person2Outlined />
          <Typography className={cx("title")}>Thông tin cá nhân</Typography>
        </Button>
      </div>
    );
  };

  const renderActionLogout = () => {
    return (
      <div className={cx("action_logout")} onClick={handleLogout}>
        <Button className={cx("btn_action_logout")}>
          <LogoutOutlined />
          <Typography className={cx("title")}>Đăng xuất</Typography>
        </Button>
      </div>
    );
  };

  const renderActionMenu = () => {
    if (token) {
      return (
        <>
          {renderManageProduct()}
          {renderUserProfile()}
          {renderActionLogout()}
        </>
      );
    }
    return (
      <div className={cx("action_login")} onClick={handleNavigateLogin}>
        <Button className={cx("btn_login")}>
          <LoginOutlined /> Đăng nhập
        </Button>
        ;
      </div>
    );
  };

  return (
    <Drawer
      anchor="left"
      open={isShowPopupMenu}
      onClose={() => setIsShowPopupMenu(false)}
      PaperProps={{ className: cx("dialog") }}
      sx={{ left: "unset" }}
    >
      <div className={cx("wrapper")}>
        <div onClick={() => setIsShowPopupMenu(false)}>
          <CloseOutlined className={cx("icon_close")} />
        </div>
        <div className={cx("inner")}>{renderActionMenu()}</div>
      </div>
    </Drawer>
  );
};

PopupMenu.propTypes = {
  isShowPopupMenu: PropTypes.bool,
  setIsShowPopupMenu: PropTypes.func,
};

export default PopupMenu;
