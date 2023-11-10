import { createSlice } from "@reduxjs/toolkit";
import { updateCartPrice } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "PayPal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x._id === item._id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existingItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCartPrice(state);
    },
    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== payload);
      return updateCartPrice(state);
    },
    saveShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload;
      return updateCartPrice(state);
    },
    savePaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
      return updateCartPrice(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      return updateCartPrice(state);
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
} = cartSlice.actions;
