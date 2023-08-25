import "../shop/shop.css";
import Product from "../shop/product";
import About from "../about/about";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { setProducts } from "../../slices/products_slice";
import { useDispatch } from "react-redux";
import TopBanner from "../../components/top_banner";
import BottomBanner from "../../components/bottom_banner";
import { trackWindowScroll } from "react-lazy-load-image-component";
import { AnimatePresence, motion } from "framer-motion";

const Home = ({ scrollPosition }) => {
  const store = useLoaderData();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts(store.products));
  }, [store]);

  const currentItems = store.products.slice(0, 8);

  return (
    <>
      <TopBanner store={store} />
      <About />
      <div className="container-fluid py-5">
        <div className="row col-md-10 mx-auto">
          <h1 className="text-center text-dark my-4">Featured Products</h1>
          {currentItems.map((product, index) => (
            <div className="col-6 col-md-3">
              <Product
                key={index}
                product={product}
                scrollPosition={scrollPosition}
              />
            </div>
          ))}
        </div>
      </div>
      <BottomBanner store={store} />

      <div className="container-fluid p-4 bg-light my-5 border">
        <div className="col-10 mx-auto">
          <div className="row">
            <div className="col-md-4 ">
              <i className="fa-solid fa-star fs-2 my-3 text-danger"></i>

              <h2>Quality Products</h2>

              <div className="text-justify">
                <p>
                  Discover the essence of beauty with our meticulously curated
                  selection of premium products.
                </p>
              </div>
            </div>
            <div className="col-md-4 ">
              <i className="fa-solid fa-credit-card fs-2 my-3 text-danger"></i>

              <h2>Safe & Easy Payment</h2>

              <div className="text-justify">
                <p>
                  Shop with confidence knowing that your payments are secure and
                  protected.
                </p>
              </div>
            </div>
            <div className="col-md-4 ">
              <i className="fa-solid fa-truck-fast fs-2 my-3 text-danger"></i>

              <h2>Fast Delivery</h2>

              <div className="text-justify">
                <p>
                  Experience the thrill of fast delivery, bringing your favorite
                  beauty products to your doorstep in no time!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default trackWindowScroll(Home);
