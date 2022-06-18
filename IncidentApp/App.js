import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";

import Router from "./src/router/Router";
import store from "./src/redux/Store";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Router />
    </Provider>
  );
}
