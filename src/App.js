import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import routes from "./routes";
import STORAGE_KEYS from "./constants/storages";
import "./scss/styles.scss";
import { AppProvider } from "./contexts/app-context";

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const Login = React.lazy(() => import("./pages/login/Login"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const App = () => {
  const isAuthenticated = localStorage.getItem(STORAGE_KEYS.TOKEN);

  const renderListRouter = () => {
    return routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        element={
          isAuthenticated ? (
            <DefaultLayout component={route.component} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    ));
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
    </BrowserRouter>
  );
};

export default App;
