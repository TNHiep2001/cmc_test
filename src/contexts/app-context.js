import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import PopupMenu from "../components/PopupMenu";

const AppContext = createContext({
  isShowPopupMenu: false,
  setIsShowPopupMenu: () => {},
});

const AppProvider = ({ children }) => {
  const [isShowPopupMenu, setIsShowPopupMenu] = useState(false);

  return (
    <AppContext.Provider value={{ isShowPopupMenu, setIsShowPopupMenu }}>
      {children}
      <PopupMenu
        isShowPopupMenu={isShowPopupMenu}
        setIsShowPopupMenu={setIsShowPopupMenu}
      />
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export { AppContext, AppProvider };

export const useAppContext = () => useContext(AppContext);
