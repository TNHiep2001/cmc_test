// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  token: "",
  user: {},
};

// ==============================|| SLICE - INFO USER ||============================== //

const infoUser = createSlice({
  name: "infoUserSlice",
  initialState,
  reducers: {
    saveInfoUser: (state, action) => ({ ...state, ...action.payload }),
    logOut: () => initialState,
  },
});

export default infoUser.reducer;

export const { saveInfoUser, logOut } = infoUser.actions;
