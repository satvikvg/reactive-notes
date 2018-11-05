import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import "./index.css";
import "typeface-roboto";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import * as reducers from "./store/reducers";
const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
registerServiceWorker();
