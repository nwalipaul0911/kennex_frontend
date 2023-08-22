import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Confetti from "react-confetti";
const Success = () => {
  const slug = useParams().slug;
  return (
    <>
      <Confetti tweenDuration={2} opacity={0.7} numberOfPieces={200} recycle={false} />
      <div className="container py-5 my-5">
        <div className="col-6 mx-auto bg-light rounded shadow text-center p-4">
          <i className="fa-solid fa-clipboard-check fs-1 mb-3 text-success"></i>

          <h5 className="text-dark">Thank You For Your Purchase</h5>

          <small>Check your email inbox for the receipt</small>
          <p className="pt-3">
            Any question? please email{" "}
            <a href="" className="text-danger">
              Orders@example.com
            </a>
          </p>

          <div style={{ width: "fit-content" }} className="mx-auto my-4">
            <Link to="/" className="btn btn-dark btn-sm px-4">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
