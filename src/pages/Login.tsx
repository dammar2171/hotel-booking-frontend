import {Link, useNavigate} from "react-router";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="custom-card p-4" style={{ width: "400px" }}>
        <span onClick={()=>navigate("/")} style={{color: "var(--color-accent)", fontSize:"30px"}}><IoArrowBackCircleSharp /></span>
        <h2>Hotel Booking System</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>

            <input
              type="email"
              className="custom-input"
              id="exampleInputEmail1"
            />

            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>

            <input
              type="password"
              className="custom-input"
              id="exampleInputPassword1"
            />
          </div>

          <a href="#">Forgot password?</a>

          <button type="submit" className="btn-accent btn w-100 mt-3">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account? <Link to={"/register"}>Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;