import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import AppContainer from "./AppContainer";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<AppContainer />, document.getElementById("root"));
registerServiceWorker();
