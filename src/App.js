import React, { useState } from "react";
import { Provider } from "react-redux";
import { ReactFlowProvider } from "reactflow";
import store from "./app/store";
import Home from "./components/Home";

function App() {
  return (
    <Provider store={store}>
      <ReactFlowProvider>
        <Home />
      </ReactFlowProvider>
    </Provider>
  );
}

export default App;
