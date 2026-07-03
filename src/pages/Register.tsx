import {Link,useNavigate} from "react-router";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="custom-card px-4 py-2" style={{ width: "400px" }}>
        <span onClick={()=>navigate("/")} style={{color: "var(--color-accent)", fontSize:"30px"}}><IoArrowBackCircleSharp /></span>
        <h2>Hotel Booking System</h2>
        <form>
          <div className="mb-2">
            <label htmlFor="nameInput" className="form-label">
              Name
            </label>

            <input
              type="text"
              className="custom-input"
              id="nameInput"
            />
          </div>
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
        <div className="mb-2">
            <label htmlFor="exampleInputPassword2" className="form-label">
             Confirm Password
            </label>

            <input
              type="password"
              className="custom-input"
              id="exampleInputPassword2"
            />
          </div>
          <button type="submit" className="btn-accent btn w-100 mt-3">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account? <Link to={"/login"}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;