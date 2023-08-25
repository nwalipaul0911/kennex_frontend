import "./fallback.css";
import { motion } from "framer-motion";
import brand_logo from "../assets/images/kenex_beauty-removebg-preview.png";
const Fallback = () => {
  return (
    <div className="fallback-grid">
      <div className="col-3">
        <motion.img animate={{scale : [0.8, 1, 0.8]}} transition={{duration: 1.5}} src={brand_logo} alt="" className="img-fluid" />
      </div>
    </div>
  );
};

export default Fallback;
