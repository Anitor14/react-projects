const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] }; // using the spread operator to be able to change the value of the state.
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => {
        return cartItem.id !== action.payload; // returns all cartItems that pass this condition.
      }),
    };
  }
  if (action.type === "INCREASE") {
    // we loop through the cart array and accessing the cartItem id that matches the action.payload id and then incrementing the amount , and then returning that plus the ones that did not match.
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === "DECREASE") {
    const tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return {
            ...cartItem,
            amount: cartItem.amount - 1,
          };
        }
        // this is the new
        return cartItem;
      })
      .filter((cartItem) => {
        return cartItem.amount !== 0;
      });
    return { ...state, cart: tempCart };
  }
  if (action.type === "TOGGLE_AMOUNT") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "inc") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.type === "dec") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((item) => item.amount !== 0);
    return { state, cart: tempCart };
  }
  if (action.type === "GET_TOTALS") {
    // destructure to get the object {total, amount} returned when the cart array has been reduced.
    let { total, amount } = state.cart.reduce(
      // this reduce functions carries two arguments which are the function and the default value or object.
      // trying to reduce takes the first argument as it default value and the second value as the current array element being looped through.
      (cartTotal, cartItem) => {
        const { amount, price } = cartItem; //destructuring the amount and price from the cartItem.
        const itemTotal = amount * price; // get the itemTotal for a specific cart item.
        cartTotal.amount += amount; //adding it to the default object amount.
        cartTotal.total += itemTotal; // adding to default item total
        return cartTotal;
        // let us work on the total
      },
      {
        total: 0,
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2)); // making the total value to be a two decimal places.

    return { ...state, total, amount }; //spreading the state altering the total and amount value of the state.
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY") {
    return { ...state, cart: action.payload, loading: false };
    // altering the state cart array with the one on the action.payload.
  }

  throw new Error("no matching action type");
};

export default reducer;
