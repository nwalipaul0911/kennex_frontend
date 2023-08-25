import { useState, useEffect } from "react";
import "./about.css";
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
    <div className="container-fluid about-section text-center bg-dark py-5 shadow">
      <div className="row">
        <div className="col-md-6">
          <h1 className="text-light">About Us</h1>
          {abouts.map((about, index) => (
            <div key={index}>
              <p className="fs-4 text-light">
                {about.about.slice(0, 1).toUpperCase() + about.about.slice(1)}
              </p>
              <div style={{ width: "fit-content" }} className="ms-auto"></div>
            </div>
          ))}
        </div>
        <div className="row col-md-6"></div>
        <div>
          <div className="container mt-4 pt-3 rounded">
            <h2 className="text-center text-light">Our products Include</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="col-10 mx-auto card">
                  <h5>SPMU kits</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="col-10 mx-auto card">
                  <h5>Cosmetics</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="col-10 mx-auto card">
                  <h5>SPMU kits</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
