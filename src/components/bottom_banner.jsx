import "./banner.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { modifyCart } from "../slices/cart_slice";
import { motion} from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../assets/images/placeholder.webp";

const BottomBanner = ({ store, scrollPosition }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [banners, setBanners] = useState([]);
  const [carouselstate, setCarouselState] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (carouselstate < banners.length - 1) {
        setCarouselState(carouselstate + 1);
      } else {
        setCarouselState(0);
      }
    }, 10000);
  });

  useEffect(() => {
    getBannerdetails();
  }, []);
  const getBannerdetails = async () => {
    let res = await fetch(`${url}/bottom-banner`);
    let data = await res.json();
    setBanners(data.bottombanner);
  };
  const handleBuyNow = (product_id) => {
    const product = store.products.find((product) => product.id == product_id);
    dispatch(modifyCart({ ...product, quantity: 1 }));
    navigate('/checkout')
  };
  return (
    <>
      <div className="container py-5 mb-5 ">
        {banners?.map(
          (banner, index) =>
            index == carouselstate && (
              <div className="row g-0 bottom-banner rounded shadow" key={index}>
                <div className="col-12 col-md-6">
                  <motion.div
                    className="mx-auto col-7 py-3 banner-img-container"
                    initial={{ scale: 1.6 }}
                  >
                    <LazyLoadImage
                      src={banner?.image}
                      alt="..."
                      scrollPosition={scrollPosition}
                      className="banner-image img-fluid"
                      effect="blur"
                      placeholderSrc={placeholder}
                    />
                  </motion.div>
                </div>
                <div className="col-md-6 col-12 py-5">
                  <div className="text-center text-light">
                    <span className="footer-banner-small-text">
                      {banner.small_text}
                    </span>
                    <h1 className="footer-banner-large-text">
                      {banner.large_text}
                    </h1>
                    <p className="footer-banner-description">{banner.title}</p>
                  </div>
                  <div
                    className="pt-3 mx-auto"
                    style={{ width: "fit-content" }}
                  >
                    <motion.button
                      className="btn btn-danger rounded-pill px-5 shadow"
                      animate={{ y: "0%", opacity: 1 }}
                      initial={{ y: "100%", opacity: 0 }}
                      transition={{
                        duration: 1,
                        type: "spring",
                        stiffness: 500,
                      }}
                      whileHover={{ scale: [1.05, 1, 1.05, 1] }}
                      onClick={() => handleBuyNow(banner.product)}
                    >
                      {banner.button_text}
                    </motion.button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default BottomBanner;
