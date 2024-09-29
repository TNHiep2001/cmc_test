// third-party
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// project import
import reducers from "./reducers";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["infoUser"], // danh sách những slice cần persist
};

const persistedReducer = persistReducer(persistConfig, reducers);

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

const { dispatch, getState } = store;

export { store, dispatch, getState }; // Dùng ở mọi nơi mà không cần dùng hook useSelector hoặc useDispatch
