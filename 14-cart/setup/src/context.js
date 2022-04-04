import React, { useState, useContext, useReducer, useEffect } from "react"; //always remember to import all that you need from react.
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

// the initialState object contains all your states and their default values.
const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); //creating the cart state and using the setCart to alter the value of cart.
  // state , dispatch can be seen as the action in the reducer .
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" }); // this is to indicate the action to type to be performed by the actual function
  };

  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id }); // this is to indicate the action type to be performed by the function
  };
  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id }); // this is to indicate the action type to be performed by the function
  };
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id }); // this is to indicate the action type to be performed by the function
  };
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: "DISPLAY", payload: cart });
  };

  const toggleAmount = (id,type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]); // the useEffect has a dependency array.

  return (
    <AppContext.Provider
      value={{
        ...state, // we are making all the state to be global.
        clearCart, // making the clearCart function to be global.
        remove, // making the remove function to be global.
        increase,
        decrease, //making the decrease function available to all the components.
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use the global contest
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
