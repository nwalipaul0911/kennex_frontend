import "./footer.css";
import brand_logo from "../assets/images/kenex_beauty-removebg-preview.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-dark pt-5">
        <div className="row">
          <div className="col-12 col-md-3 text-secondary">
            <div className="col-8 ms-md-auto mt-4 mt-lg-0">
                <h5 className="text-danger mb-3">Navigations</h5>
                <Link to="/" className="nav-link pb-3">
                  Home
                </Link>
                <Link to="/shop" className="nav-link pb-3">
                  Shop
                </Link>
                <Link to="/contact" className="nav-link pb-3">
                  Contact Us
                </Link>

                <Link to="/terms-&-conditions" className="nav-link pb-3">
                  Terms & Conditions
                </Link>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="col-8 ms-lg-auto text-muted mt-4 mt-lg-0">
              <h5 className="text-danger mb-3">Our Store</h5>

              <p>
                Address: Lzp023 lozinko plaza beside rivers gate tradefair
                complex
              </p>
              <p>Mon-Fri: 8am-7pm</p>
              <p>Sat-Sun: 8am-5pm</p>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="col-8 mx-lg-auto text-muted mt-4 mt-lg-0">
              <h5 className="text-danger mb-3">Customer Service</h5>
              <p>Tel: 08123853008</p>
              <p>Email: Kenexbeauty@gmail.com</p>
            </div>
          </div>
          <div className="col-md-3 text-secondary">
            <h5 className="text-danger mb-3">Socials</h5>
            <div className="">
              <motion.a
                whileHover={{ x: 5 }}
                href="https://www.facebook.com/krishbeauty"
                target="_blank"
                className="social-links"
              >
                <i className="fa-brands fa-facebook text-secondary"></i>
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="https://www.tiktok.com/@krish_beauti"
                target="_blank"
                className="social-links"
              >
                <i className="fa-brands fa-tiktok text-secondary"></i>
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="https://www.instagram.com/krish_beauty/"
                target="_blank"
                className="social-links"
              >
                <i className="fa-brands fa-instagram text-secondary"></i>
              </motion.a>
              <motion.a
                whileHover={{ x: 5 }}
                href="https://wa.me/2349037399585"
                target="_blank"
                className="social-links"
              >
                <i className="fa-brands fa-whatsapp text-secondary"></i>
              </motion.a>
            </div>
          </div>
        </div>
        <div className="ms-auto col-6 col-md-4">
          <motion.img
            animate={{ scale: [0.5, 0.7, 0.5] }}
            initial={{ scale: 0.5 }}
            
            src={brand_logo}
            alt=""
            className="img-fluid footer-img mx-auto"
          />
        </div>
        <hr className="text-danger"/>
        <p className="text-muted text-center bg-dark mb-0">
          All rights reserved. &copy; {new Date().getFullYear()}
        </p>
      </div>
    </>
  );
};

export default Footer;
