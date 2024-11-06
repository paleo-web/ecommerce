import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { counterSlice } from "./counter";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { ProductApi } from "./ProductApis";
import ProductListSlice from "./ProductList";
import authSlice from "./onAuth";

const combine = combineReducers({
  // counter: counterSlice.reducer,
  onAuth: authSlice.reducer,
  ProductList: ProductListSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, combine);

export const store = configureStore({
  reducer: {
    persistedReducer,

    [ProductApi.reducerPath]: ProductApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductApi.middleware),
});

export let persistor = persistStore(store);
