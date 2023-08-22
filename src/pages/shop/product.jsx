import { useDispatch } from "react-redux";
import { modifyCart } from "../../slices/cart_slice";
import "./product.css";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion, useAnimation, useInView } from "framer-motion";

const Product = ({ product, scrollPosition }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  const handleCartIncrement = (e) => {
    e.stopPropagation();
    dispatch(modifyCart({ ...product, quantity: 1 }));
  };
  const handleProductNav = () => {
    navigate(`/products/${product.id}`);
  };
  return (
    <motion.div
      className="card col-10 mx-auto product-card my-4 position-relative"
      onClick={handleProductNav}
      variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
      initial="hidden"
      animate={"visible"}
      whileHover={{ scale: 1.05 }}
    >
      <LazyLoadImage
        src={`${product.image}`}
        alt="..."
        effect="blur"
        className="img-fluid card-img"
        placeholderSrc=""
        scrollPosition={scrollPosition}
      />

      <div className="py-2">
        <div className="">
          <div>
            <small className="py-0 text-secondary">{product.name}</small>
          </div>
          <div>
            <i className="fw-bold">N {product.price}</i>
          </div>
        </div>

        <div className="mx-auto mt-2">
          <button
            className="btn btn-sm btn-dark col-12 product-button rounded-0 shadow"
            onClick={(e) => handleCartIncrement(e)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
