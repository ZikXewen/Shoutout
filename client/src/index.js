import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import checkTimeout from "./middlewares/checkTimeout";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

import { reducers } from "./reducers";
import App from "./App";
import "./index.css";

const store = createStore(
  reducers,
  compose(applyMiddleware(checkTimeout, thunk))
);
const theme = createMuiTheme({
  typography: {
    fontFamily: `"Montserrat", "Kanit"`, // Thai Font?
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
