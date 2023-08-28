import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import brand_logo from "../assets/images/kenex_beauty-removebg-preview.png"
import "./navbar.css";

const Navbar = ({ setSidebarState }) => {
  const cart_items = useSelector((state) => state.cart.value);
  const products = useSelector((state) => state.products.value);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();
  const searchResult = useCallback(
    products.filter(
      (a) => searchParam && a.name.includes(searchParam),
      products
    ),
    [searchParam]
  );
  const search_results_panel =
    searchResult.length > 0 ? "search-panel-open" : "search-panel-close";
  return (
    <nav className="navbar navbar-expand-lg bg-dark py-1 shadow">
      <NavLink to="/" className="navbar-brand mx-auto ms-md-5" href="#">
        <img src={brand_logo} alt="Krishbeauty" className="brand-logo" />
      </NavLink>
      <div className="container-fluid">
        <button
          className="navbar-toggler text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars text-light"></i>
        </button>
        <div className="collapse navbar-collapse pb-4 pb-md-0" id="navbarNav">
          <ul className="navbar-nav mx-md-auto my-3 me-3">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link custom-nav-link text-light"
                aria-current="page"
                href="#"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/shop"
                className="nav-link custom-nav-link text-light"
                href="#"
              >
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-link custom-nav-link text-light"
                href="#"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="position-relative ms-auto me-5">
          <i
            className="fa-solid fa-cart-shopping cart-toggler text-white"
            onClick={setSidebarState}
            title="Open cart"
          ></i>
          <motion.span
            animate={{ scale: [1, 0.5, 1] }}
            initial={{ scale: 0 }}
            transition={{}}
            className="badge bg-danger rounded-pill position-absolute top-0"
          >
            {cart_items.length}
          </motion.span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
