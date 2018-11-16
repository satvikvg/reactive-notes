import { MuiThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import autoBind from "react-autobind";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import * as reducers from "./store/reducers";

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

// All the following keys are optional.
// We try our best to provide a great default value.
const defaultLightTheme = {
  palette: {
    primary: blue,
    secondary: pink,
    error: red,
    type: "light",
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
};

class AppContainer extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
    this.theme = createMuiTheme(defaultLightTheme);
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <CssBaseline />
        <Provider store={store}>
          <App setTheme={this.handleSetTheme} />
        </Provider>
      </MuiThemeProvider>
    );
  }

  handleSetTheme(themeOptions) {
    this.theme = createMuiTheme(themeOptions);
    this.forceUpdate();
  }
}

export default AppContainer;
