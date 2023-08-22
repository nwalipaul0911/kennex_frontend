import { useState } from "react";
import Navbar from "./components/navbar";
import "./App.css";
import Cart from "./widgets/cart/cart";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";

function App() {
  const sidebarState = localStorage.getItem("sidebar");
  const [cartView, setCartView] = useState(false
  );
  const setSidebarState = () => {
    setCartView(!cartView)
  };

  return (
    <div className="App">
      <Navbar setSidebarState={setSidebarState} />
      <Cart setSidebarState={setSidebarState} cartView={cartView} />
      <Outlet context={[setSidebarState]}/>
      <Footer />
    </div>
  );
}

export default App;
