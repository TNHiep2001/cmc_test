import React, { useState } from "react";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getInfoUserSelector } from "../store/reducers/infoUser/infoUserSelector";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle, LogoutOutlined } from "@mui/icons-material";
import { logOut } from "../store/reducers/infoUser";
import { useAppContext } from "../contexts/app-context";

const AppHeader = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setIsShowPopupMenu } = useAppContext();

  const { token, user } = useSelector(getInfoUserSelector);

  const [showLogout, setShowLogout] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setShowLogout(false);
    setAnchorEl(null);
  };

  const handleOpen = (e) => {
    setShowLogout(true);
    setAnchorEl(e.currentTarget);
  };

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logOut());
    navigate("/login");
    setShowLogout(false);
    setAnchorEl(null);
  };

  const renderStatusUser = () => {
    if (token) {
      return (
        <Box position="relative">
          <div
            onClick={handleOpen}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <AccountCircle />
            <Typography>{user?.name}</Typography>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={showLogout}
            onClose={handleClose}
            sx={{
              transform: "translateX(-20px)",
            }}
            disableScrollLock={true}
            autoFocus={false}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
              onClick={handleLogout}
            >
              <LogoutOutlined /> Đăng xuất
            </MenuItem>
          </Menu>
        </Box>
      );
    }

    return (
      <Button onClick={handleNavigateLogin} color="inherit">
        Login
      </Button>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsShowPopupMenu(true)}
          >
            <MenuIcon />
          </IconButton>
          {renderStatusUser()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

AppHeader.propTypes = {};

export default AppHeader;
