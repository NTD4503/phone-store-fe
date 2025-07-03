import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import userReducer from "./user/userSlice";
import productReducer from "./product/productSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// //Lỗi Unexpected keys "counter", "test", "post" found in previous state received by the reducer.
// Expected to find one of the known reducer keys instead: "cart", "user", "product".
// Unexpected keys will be ignored.
// fix: Sử dụng version và migrate trong redux-persist

//Danh sách các key reducer được chấp nhận
const allowedReducerKeys = ["cart", "user", "product"];

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  product: productReducer,
});

const persistConfig = {
  key: "root",
  version: 2, //Tăng version khi thay đổi rootReducer
  storage,
  migrate: (persistedState) => {
    // Tùy chọn: lọc bỏ những key không còn dùng
    if (persistedState) {
      const migratedState = {};
      for (const key of allowedReducerKeys) {
        if (key in persistedState) {
          migratedState[key] = persistedState[key];
        }
      }
      console.log("Redux state đã migrate:", migratedState);
      return Promise.resolve(migratedState);
    }
    return Promise.resolve(persistedState);
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
