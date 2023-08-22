import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { modifyCart } from "../../slices/cart_slice";
import { useOutletContext } from "react-router-dom";

const Item = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.products.value);
  const item_id = useParams().id;
  const item = items.find((i) => i.id == item_id);
  const [quantity, setQuantity] = useState(1);
  const [ setSidebarState ] = useOutletContext()
  const handleCartIncrement = () => {
    dispatch(modifyCart({ ...item, quantity: quantity }));
  };
  const handleBuyNow= ()=>{
    dispatch(modifyCart({ ...item, quantity: quantity }));
    setSidebarState();
  }
  return (
    <>
      <div className="container">
        <div className="row my-5">
          <div className="col-12 col-md-6">
            <div className="col-10 ms-md-auto rounded shadow card">
              <img src={item.image} alt="" className="img-fluid" />
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

                  <div>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="mt-3">
                <button className="btn btn-dark rounded-0" onClick={handleCartIncrement}>Add to cart</button>
                <button className="btn btn-danger ms-1 rounded-0" onClick={handleBuyNow}>
                  Buy now
                </button>
              </div>
              <div className="mt-4 col-12">
                <h6>Description</h6>
                <p>
                  {item.description.slice(0, 1).toUpperCase() +
                    item.description.slice(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Item;
