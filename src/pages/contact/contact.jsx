import { useEffect } from "react";
import "./contact.css";
import { useState } from "react";
import { useAnimation, motion } from "framer-motion";
const Contact = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  useEffect(() => {
    let timeout = setTimeout(() => {
      setErrorMessage(null);
      setSuccess(false);
    }, 5000);
    () => {
      clearTimeout(timeout);
    };
  }, [formData]);
  const def = {
    name: "",
    email: "",
    message: "",
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    for (let input of Object.keys(formData)) {
      if (!formData[input]) {
        setErrorMessage(`${input} field required`);
        return false;
      }
      if (input == "email" && !/\S+@\S+\.\S+/.test(formData.email)) {
        setErrorMessage(`invalid ${input} format`);
        return false;
      }
    }
    setErrorMessage(``);
    return true;
  };
  const submitMessage = async (e) => {
    e.preventDefault();
    let validated = validateForm();
    if (validated) {
      let res = await fetch(`${url}/contact`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });
      if (res.status == 201) {
        setFormData({ ...def });
        setSuccess(true);
      }
    }
  };
  return (
    <>
      <div className="container-fluid bg-light py-5">
        <div className="row">
          <div className="col-md-6">
            <form
              action=""
              className="mx-auto col-10 pb-5"
              onSubmit={submitMessage}
            >
              <h4 className="mb-1">Leave a message</h4>
              <p className="mb-5 text-secondary">
                Your interests and opinion counts.
              </p>
              {errorMessage && (
                <motion.p
                  animate={{ scale: 1 }}
                  initial={{ scale: 0 }}
                  className="ps-3 error-message rounded text-light"
                >
                  {" "}
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  {errorMessage}
                </motion.p>
              )}
              {success && (
                <p className="ps-3 success-message rounded text-light">
                  {" "}
                  <i className="fa-solid fa-check"></i> Message sent!
                </p>
              )}

              <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control py-3 rounded-0 contact-form"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleFormData}
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control py-3 rounded-0 contact-form"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleFormData}
                  />
              </div>

              <textarea
                name="message"
                id="message"
                cols="30"
                rows="5"
                className="form-control contact-form rounded-0"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleFormData}
              ></textarea>
              <input
                type="submit"
                className="btn btn-dark rounded-0 col-12 mt-4"
                value="Send message"
              />
            </form>
          </div>
          <div className="col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31715.540487556344!2d3.2338371472776295!3d6.465484035658112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b861ebe55efa3%3A0x332668e3ad8c8be2!2sTrade%20Fair%20Complex%2C%20Lagos!5e0!3m2!1sen!2sng!4v1692149635842!5m2!1sen!2sng"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="col-12"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="container my-5 py-5 border bg-light shadow">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <h4 className="text-center">
              <i className="fa-solid fa-phone text-danger"></i> Phone
            </h4>
            <p className="text-center text-secondary">(+234) 903-739-9585</p>
          </div>
          <div className="col-md-3 col-sm-6">
            <h4 className="text-center">
              <i className="fa-solid fa-location-dot text-danger"></i> Address
            </h4>
            <p className="text-center text-secondary">
              Lzp023 lozinko plaza beside rivers gate tradefair complex
            </p>
          </div>
          <div className="col-md-3 col-sm-6">
            <h4 className="text-center">
              <i className="fa-solid fa-clock text-danger"></i> Open hours
            </h4>
            <p className="text-center text-secondary">Mon-Fri: 10.00 - 23.00</p>
            <p className="text-center text-secondary">Sat-Sun: 10.00 - 19.00</p>
          </div>
          <div className="col-md-3 col-sm-6">
            <h4 className="text-center">
              <i className="fa-solid fa-envelope text-danger"></i> E-mail
            </h4>
            <p className="text-center text-secondary">Krishbeauty@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
