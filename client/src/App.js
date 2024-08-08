import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";
import Home from "./components/Screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Screens/Login";
import Signup from "./components/Screens/Signup.js";
import { CartProvider } from "./components/ContextReducer.js";
import MyOrder from "./components/Screens/MyOrder.js";

function App() {
  return (
    <CartProvider>
      <Router>
        <div><nav class="navbar navbar-expand-lg navbar-light bg-light">
 
</nav>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
