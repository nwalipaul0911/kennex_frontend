import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Route from "./route/route.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer from "./slices/cart_slice";
import productReducer from "./slices/products_slice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products : productReducer
  },
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Route />
    </Provider>
  </React.StrictMode>
);
