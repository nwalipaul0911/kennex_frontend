import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/cart_item";
import { useMemo, useState, useRef, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { clearCart } from "../../slices/cart_slice";
import { useNavigate } from "react-router-dom";
import "./checkout.css";
const Checkout = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const cart_items = useSelector((state) => state.cart.value);
  const orderUrl = useRef(null);
  const [shippingRates, setShippingRates] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    recipient: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    town: "",
  });
  
  // form data handling function
  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
      setErrorMessage(null);
  }, [formData]);
  // Get shipping rates from backend
  const getShippingRate = async () => {
    let res = await fetch(`${url}/shipping`);
    if (res.status == 200) {
      let data = await res.json();
      setShippingRates(data);
    }
  };
  useEffect(() => {
    getShippingRate();
  }, []);
  // get town options from state
  const townOptions = shippingRates.filter(
    (rate) => rate.state == formData.state
  );
  // validate form before submission

  const validateForm = () => {
    for (let input of Object.keys(formData)) {
      if (!formData[input]) {
        setErrorMessage(`${input} field required`);
        return false;
      }
      if (input == "email" && !/\S+@\S+\.\S+/.test(formData.email)) {
        setErrorMessage(`invalid format for ${input}`);
        return false;
      }
    }
    setErrorMessage(``);
    return true;
  };
  // get shipping fee
  const shippingFee = useMemo(() => {
    let curr_rate = shippingRates?.find(
      (rate) => rate.state == formData.state && rate.town == formData.town
    );
    if (curr_rate) {
      return curr_rate.rate;
    }
    return 0;
  }, [formData]);

  // get the subTotal amount of the items in the cart
  const subtotal = useMemo(
    () =>
      cart_items.reduce((prev, curr) => prev + curr.quantity * curr.price, 0),
    [cart_items]
  );
  // Ready total for paystack api
  const amount = shippingFee + subtotal;

  // save the order in the backend database
  const saveOrder = async (reference) => {
    const res = await fetch(`${url}/create_order`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        cart_items: cart_items,
        total_amount: amount,
        shipping: shippingFee,
        slug: reference,
      }),
    });
    if (res.status == 201) {
      const data = await res.json();
      orderUrl.current = data.slug;
      dispatch(clearCart());
      navigate(`success/${data.slug}`);
    }
  };

  // paystack component props for PaystackButton
  const onSuccess = ({ reference }) => {
    saveOrder(reference);
  };
  const onClose = () => null;
  const config = {
    email: formData.email,
    amount: amount * 100,
    metadata: {
      recipient: formData.recipient,
      phone: formData.phone,
    },
    publicKey: import.meta.env.VITE_PAYMENT_KEY,
  };
  // initialize paystack payment hook
  const initializePayment = usePaystackPayment(config);
  const handleCheckout = (e) => {
    e.preventDefault();
    let validated = validateForm();
    if (validated) {
      initializePayment(onSuccess, onClose);
    }
  };

  return (
    <>
      <div className="container-fluid  my-5 py-5">
        <div className="row">
          <div className="col-md-4 col-sm-12 order-md-2">
            <div className="col-10 mx-auto">
              <div className="py-2 cart-header">
                <h5 className="text-dark">My Cart</h5>
              </div>
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
          <div className="col-md-8 col-sm-12 ">
            <div className="container-fluid">
              <div className="row">
                <div className="col-10 mx-auto">
                  <div className="py-2 cart-header col-12">
                    <h5 className="text-dark">Checkout form</h5>
                  </div>
                  <form className="col-12 mt-3" onSubmit={handleCheckout}>
                    {errorMessage && (
                      <p className="ps-3 error-message rounded text-light">
                        {" "}
                        <i className="fa-solid fa-circle-exclamation"></i>{" "}
                        {errorMessage}
                      </p>
                    )}
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="recipient">Fullname:</label>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          name="recipient"
                          id="recipient"
                          value={formData.recipient}
                          className="form-control col-10 rounded-0"
                          placeholder="John Doe"
                          onChange={handleFormData}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="email">E-mail:</label>
                      </div>
                      <div className="col">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          className="form-control col-10 rounded-0"
                          placeholder="JohnDoe35@example.com"
                          onChange={handleFormData}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="phone">Phone:</label>
                      </div>
                      <div className="col">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          className="form-control col-10 rounded-0"
                          placeholder="080xxxxxxx1"
                          onChange={handleFormData}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="address">Address:</label>
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={formData.address}
                          className="form-control col-10 rounded-0"
                          placeholder="32, example street, example town"
                          onChange={handleFormData}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="address">State:</label>
                      </div>
                      <div className="col">
                        <select
                          name="state"
                          id="state"
                          defaultValue={formData.state}
                          className="form-control col-10 rounded-0"
                          placeholder="Lagos"
                          onChange={handleFormData}
                        >
                          <option value="">-------------</option>
                          {shippingRates.map((rate, index) => (
                            <option key={index} value={rate.state}>
                              {rate.state}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3 col-md-2">
                        <label htmlFor="address">Town:</label>
                      </div>
                      <div className="col">
                        <select
                          name="town"
                          id="town"
                          value={formData.town}
                          className="form-control col-10 rounded-0"
                          placeholder="Ikeja"
                          onChange={handleFormData}
                        >
                          <option value="">-------------</option>
                          {townOptions?.map((rate, index) => (
                            <option key={index} value={rate.town}>
                              {rate.town}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="bg-light border p-2">
                      <div className="row">
                        <div className="col-sm-3 col-md-2">
                          <label htmlFor="shipping" className="">
                            Shipping:
                          </label>
                        </div>
                        <div className="col-auto">
                          <p name="shipping" className="" id="shipping">
                            N {shippingFee}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3 col-md-2">
                          <label htmlFor="subtotal" className="">
                            Subtotal:
                          </label>
                        </div>
                        <div className="col-auto">
                          <p name="subtotal" className="" id="subtotal">
                            N {subtotal}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3 col-md-2">
                          <label htmlFor="total" className="fs-2">
                            Total:
                          </label>
                        </div>
                        <div className="col-auto">
                          <p name="total" className="fs-2" id="total">
                            N {amount}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3 ">
                      <div className="col">
                        <button
                          type="submit"
                          className={`btn form-control btn-dark rounded-0`}
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
