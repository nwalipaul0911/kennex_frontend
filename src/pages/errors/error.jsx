import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import error404 from "../../assets/images/error-404.jpg";
import "./errors.css";

const ErrorPage = () => {
  let error = useRouteError();
  return (
    <>
      <div className="container-fluid error-container">
        <div className=" col-md-8">
          <div className="error-image">
            <img src={error404} alt="" className="img-fluid" />
          </div>
          <div className="error-redirect">
            <Link to="/" className="btn btn-danger">
              Return home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
