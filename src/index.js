import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/main.css";
import { BrowserRouter as Router } from "react-router-dom";
/* ----- Redux ----- */
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
