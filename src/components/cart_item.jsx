import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./cart_item.css";
import { modifyCart } from "../slices/cart_slice";
import { useMemo } from "react";
import { removeFromCart } from "../slices/cart_slice";
const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();
  const subtotal = useMemo(() => {
    let x = item.price * item.quantity;
    return isNaN(x) ? "_" : x;
    return x
  }, [item]);
  useEffect(() => {
    subtotal == 0 ? dispatch(removeFromCart(item)) : null;
    setQuantity(item.quantity)
  }, [subtotal]);
  const handleQuantity = (e) => {
    const value = parseInt(e.target.value);
    dispatch(modifyCart({ ...item, quantity: value }));
  };
  const handleIncrement = (t) => {
    if (t == "+") {
      dispatch(modifyCart({ ...item, quantity: quantity + 1 }));
    } else {
      dispatch(modifyCart({ ...item, quantity: quantity - 1 }));
    }
  };

  return (
    <>
      <div className="cart-item col-10 mx-auto my-3 position-relative pb-3">
        <i
          className="fa-solid fa-x position-absolute top-0 end-0 cart-item-control"
          onClick={() => dispatch(removeFromCart(item))}
          title="Remove from cart"
        ></i>
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <img src={item.image} alt="..." className="img-fluid" />
            </div>
            <div className="col-8">
              <div className="card-item-footer">
                <small className="item-name" style={{ display: "block" }}>
                  {item.name}
                </small>
                <small
                  className="text-dark fw-bold"
                  style={{ display: "block" }}
                >
                  N{subtotal}{" "}
                  <i className="text-secondary ps-3">N{item.price}/unit</i>
                </small>
                <div className="my-3">
                  <button
                    className="btn btn-sm btn-outline-dark rounded-0 py-0"
                    onClick={() => handleIncrement("-")}
                  >
                    <i className="fa-solid fa-minus increments"></i>
                  </button>
                  <input
                    type="number"
                    name=""
                    id=""
                    value={quantity}
                    className="bg-transparent border-1 col-5 rounded-0 input"
                    onChange={handleQuantity}
                  />
                  <button
                    className="btn btn-sm btn-outline-dark rounded-0 py-0"
                    onClick={() => handleIncrement("+")}
                  >
                    <i className="fa-solid fa-plus increments"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
