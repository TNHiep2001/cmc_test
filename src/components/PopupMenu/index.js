import React from "react";
import PropTypes from "prop-types";
import { Button, Drawer, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./styles/PopupMenu.module.scss";
import {
  CloseOutlined,
  LogoutOutlined,
  ManageSearch,
  Person2Outlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/reducers/infoUser";

const cx = classNames.bind(styles);

const PopupMenu = ({ isShowPopupMenu, setIsShowPopupMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logOut());
    setIsShowPopupMenu(false);
    navigate("/login");
  };

  const handleNavigateManageProd = () => {
    setIsShowPopupMenu(false);
    navigate("/manageProduct");
  };

  const renderManageProduct = () => {
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
        <div className={cx("inner")}>
          {renderManageProduct()}
          {renderUserProfile()}
          {renderActionLogout()}
        </div>
      </div>
    </Drawer>
  );
};

PopupMenu.propTypes = {
  isShowPopupMenu: PropTypes.bool,
  setIsShowPopupMenu: PropTypes.func,
};

export default PopupMenu;
