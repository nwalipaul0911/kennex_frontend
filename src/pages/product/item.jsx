import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { modifyCart } from "../../slices/cart_slice";
import { useLoaderData } from "react-router-dom";

const Item = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const item_id = useParams().id;
  const items = useLoaderData().products;
  const item = items.find((i) => i.id == item_id);
  const similar_items = items.filter((x) => item.id !== x.id).slice(0, 8);
  const more_items = items
    .filter((x) => item.id !== x.id && item.category == x.category)
    .slice(0, 8);
  const [quantity, setQuantity] = useState(1);
  const handleCartIncrement = () => {
    dispatch(modifyCart({ ...item, quantity: quantity }));
  };
  const handleBuyNow = () => {
    dispatch(modifyCart({ ...item, quantity: quantity }));
    navigate("/checkout");
  };
  const handleIncrement = (t) => {
    if (t == "+") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-12 col-md-6">
          <div className="col-10 ms-md-auto rounded shadow card">
            <div className="card-img">
              <img src={item.image} alt="" className="img-fluid" />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="col-10 ms-3">
            <div>
              <p>{item.name}</p>
              <small>N {item.price}</small>
              <form className="py-3">
                <div>
                  <label htmlFor="quantity">Quantity</label>
                </div>

                <div className="my-3">
                  <i
                    className="btn btn-sm btn-outline-dark rounded-0 py-0"
                    onClick={() => handleIncrement("-")}
                  >
                    <i className="fa-solid fa-minus increments"></i>
                  </i>
                  <input
                    type="number"
                    name=""
                    id=""
                    value={quantity}
                    className="bg-transparent border-1 col-2 rounded-0 input"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <i
                    className="btn btn-sm btn-outline-dark rounded-0 py-0"
                    onClick={() => handleIncrement("+")}
                  >
                    <i className="fa-solid fa-plus increments"></i>
                  </i>
                </div>
              </form>
            </div>
            <div className="mt-3">
              <button
                className="btn btn-dark rounded-0"
                onClick={handleCartIncrement}
              >
                Add to cart
              </button>
              <button
                className="btn btn-danger ms-1 rounded-0"
                onClick={handleBuyNow}
              >
                Buy now
              </button>
            </div>
            <div className="mt-4 col-12">
              <h5>Description</h5>
              <p>
                {item.description.slice(0, 1).toUpperCase() +
                  item.description.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h5>Similar products:</h5>
        {similar_items.map((i, index) => (
          <div key={index} className="col-md-2 col-sm-6">
            <div className="card col-10 mx-auto product-card">
              <div className="card-img">
                <img src={i.image} alt="" className="img-fluid" />
              </div>
              <div className="card-body">
                <small>{i.name}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row my-3">
        <h5>You may also like:</h5>
        {more_items.map((i, index) => (
          <div key={index} className="col-md-2 col-sm-6">
            <div className="card col-10 mx-auto product-card">
              <div className="card-img">
                <img src={i.image} alt="" className="img-fluid" />
              </div>
              <div className="card-body">
                <small>{i.name}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Item;
