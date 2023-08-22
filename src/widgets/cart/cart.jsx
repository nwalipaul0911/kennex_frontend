import "./cart.css";
import CartItem from "../../components/cart_item";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAnimation, motion, spring } from "framer-motion";
const Cart = ({ setSidebarState, cartView }) => {
  const cart_items = useSelector((state) => state.cart.value);
  return (
    <motion.aside
      animate={{ x: !cartView ? "100%" : "0%" }}
      className={`cart bg-light shadow`}
    >
      <div className="container py-4 bg-dark">
        <div className="cart-header row">
          <div className="cart-control-icon-container col-3">
            <motion.i
              animate={{ rotate: cartView ? 0 : 180 }}
              transition={{ delay: 0.2 }}
              className="fa-solid fa-arrow-right text-light"
              onClick={setSidebarState}
              title="Close cart"
            ></motion.i>
          </div>
          <div className="cart-header-text col-9">
            <h4 className="text-light">Your Cart</h4>
          </div>
        </div>
      </div>
      <div className="container-fluid cart-items-list">
        <div className="row">
          {cart_items.length ? (
            cart_items.map((item, index) => (
              <CartItem key={index} item={item} />
            ))
          ) : (
            <div className="mt-5">
              <p className="text-center"> Cart empty</p>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto mt-2 pt-2" style={{ width: "fit-content" }}>
        {cart_items.length ? (
          <Link
            to="/checkout"
            className={`btn btn-dark order-btn rounded-0`}
            onClick={setSidebarState}
          >
            Place Order
          </Link>
        ) : (
          <></>
        )}
      </div>
    </motion.aside>
  );
};

export default Cart;
