import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import routes from "./routes";
import STORAGE_KEYS from "./constants/storages";
import "./scss/styles.scss";
import { AppProvider } from "./contexts/app-context";
import { useSelector } from "react-redux";
import { getInfoUserSelector } from "./store/reducers/infoUser/infoUserSelector";
import { Box, CircularProgress } from "@mui/material";
import { ROLE } from "./constants/user";
import ToastMessage from "./components/UI/ToastMessage";

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const Login = React.lazy(() => import("./pages/login/Login"));

const loading = (
  <Box
    width="100%"
    height="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <CircularProgress size="2rem" color="success" />
  </Box>
);

const App = () => {
  const isAuthenticated = localStorage.getItem(STORAGE_KEYS.TOKEN);

  const { user } = useSelector(getInfoUserSelector);

  console.log(user);

  // Các routes công khai (không cần xác thực)
  const publicRoutes = ["/listProduct", "/detailProduct/:id"];
  // Các routes yêu cầu vai trò là admin
  const adminRoutes = [
    "/manageProduct",
    "/manageProduct/new",
    "/manageProduct/:id/edit",
  ];

  const renderListRouter = () => {
    return routes.map((route, index) => {
      const isPublicRoute = publicRoutes.includes(route.path);
      const isAdminRoute = adminRoutes.includes(route.path);

      return (
        <Route
          key={index}
          path={route.path}
          element={
            isAuthenticated ? (
              // Nếu là route cần quyền admin thì kiểm tra role
              isAdminRoute && user?.role !== ROLE.admin ? (
                <Navigate to="/listProduct" /> // Điều hướng đến trang list product nếu không có quyền
              ) : (
                <DefaultLayout component={route.component} />
              )
            ) : isPublicRoute ? (
              <DefaultLayout component={route.component} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      );
    });
  };

  return (
    <BrowserRouter>
      <AppProvider>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/listProduct" />} />
            {renderListRouter()}
          </Routes>
        </Suspense>
      </AppProvider>
      <ToastMessage />
    </BrowserRouter>
  );
};

export default App;
