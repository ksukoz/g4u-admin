import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store";

import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import uk from "react-intl/locale-data/uk";
import ru from "react-intl/locale-data/ru";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

addLocaleData([...en, ...uk, ...ru]);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
