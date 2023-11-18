export const addDecimals = (num) => {
  return Math.round(num);
};

export const updateCartPrice = (state) => {
  //calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //calculate shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 500 ? 0 : 50);
  //calculate tax price (4%)
  state.taxPrice = addDecimals(Number(0.04 * state.itemsPrice));
  //calculate total price
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.taxPrice) +
      Number(state.shippingPrice)
  );
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
