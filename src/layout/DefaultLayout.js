import React from "react";
import PropTypes, { func, object } from "prop-types";
import AppHeader from "../components/AppHeader";

const DefaultLayout = ({ component: Component, ...restProps }) => {
  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div className="body flex-grow-1 bg-white mx-3 mb-3 rounded">
        <Component {...restProps} />
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  component: PropTypes.oneOfType([object, func]),
};

export default DefaultLayout;
