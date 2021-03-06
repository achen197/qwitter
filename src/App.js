import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routes from "./pages/Routes";


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
