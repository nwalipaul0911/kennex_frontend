import { createSlice } from "@reduxjs/toolkit";

let local_storage = localStorage.getItem("cart_items");
const initialStateValue = {
  value: local_storage ? JSON.parse(local_storage) : [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateValue,
  reducers: {
    // reducer for updating each item
    modifyCart: (state, action) => {
      const modifiedItem = action.payload;
      const index = state.value.findIndex(
        (item) => item.id === modifiedItem.id
      );
      if (index !== -1) {
        state.value[index] = modifiedItem;
      } else {
        state.value = [...state.value, action.payload];
      }

      localStorage.setItem("cart_items", JSON.stringify(state.value));
    },
    // reducer to remove an item from the cart
    removeFromCart: (state, action) => {
      state.value = state.value.filter((item) => item.id != action.payload.id);
      state.value.length > 0
        ? localStorage.setItem("cart_items", JSON.stringify(state.value))
        : localStorage.removeItem("cart_items");
    },
    // reducer to clear the cart
    clearCart: (state) => {
      state.value = [];
      localStorage.removeItem("cart_items");
    },
  },
});
export const { modifyCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
