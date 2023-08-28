import { useState, useEffect } from "react";
import "./about.css";
import remover from "../../assets/images/remover.jpg";
import tweezers from "../../assets/images/tweezers.jpg";
import bonder from "../../assets/images/kenex_image1.jpg";
import { motion } from "framer-motion";
const About = () => {
  const [abouts, setAbouts] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    getAbout();
  }, []);
  const getAbout = async () => {
    let res = await fetch(`${url}/about`);
    if (res.status == 200) {
      const data = await res.json();
      setAbouts(data);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{delay: 2, duration:0.5}}
      className="container-fluid about-section text-center bg-dark py-5 shadow"
    >
      <div className="row">
        <div className="col-md-6 px-4">
          <h1 className="text-danger">About Us</h1>
          {abouts.map((about, index) => (
            <div key={index}>
              <p className="fs-4 text-light">
                {about.about.slice(0, 1).toUpperCase() + about.about.slice(1)}
              </p>
              <div style={{ width: "fit-content" }} className="ms-auto"></div>
            </div>
          ))}
        </div>
        <div className="row col-md-6 position-relative">
          <div className=" about-img-container">
            <div className="col-8 col-md-6">
              <img src={tweezers} alt="" className="gallery img-1" />
            </div>
            <div className="col-10 col-md-8 ms-auto ">
              <img src={bonder} alt="" className="gallery img-2" />
            </div>
            <div className="col-8 col-md-6">
              <img src={remover} alt="" className="gallery img-3" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
