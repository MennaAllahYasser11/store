import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartItems from './components/CartItems';
import Home from './pages/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
