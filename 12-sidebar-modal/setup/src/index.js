import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AppProvider } from "./context";
import App from "./App";
ReactDOM.render(
  <React.StrictMode>
    {/* This is where we put in our AppProvider with the children as our <App /> */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
