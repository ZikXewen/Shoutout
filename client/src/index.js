import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import checkTimeout from "./middlewares/checkTimeout";

import { reducers } from "./reducers";
import App from "./App";
import "./index.css";

const store = createStore(reducers, applyMiddleware(checkTimeout, thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
