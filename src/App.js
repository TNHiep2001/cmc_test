import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import routes from "./routes";
import STORAGE_KEYS from "./constants/storages";
import "./scss/styles.scss";

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const App = () => {
  const isAuthenticated = localStorage.getItem(STORAGE_KEYS.TOKEN) || "haha"; //fake data token

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
      <Suspense fallback={loading}>
        <Routes>{renderListRouter()}</Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
