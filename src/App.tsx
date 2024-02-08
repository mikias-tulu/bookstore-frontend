import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
function App() {
  return (
    <ShoppingCartProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/home" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </ShoppingCartProvider>
  );
}

export default App;
