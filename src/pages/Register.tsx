import {Link,useNavigate} from "react-router";
import React, { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import type { UserRegisterData } from "../types";
import { register } from "../services/authServices";
import { useToast } from "../contexts/ToastContext";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [userForm,setUserForm]=useState<UserRegisterData>({name:"",email:"",password:"",confirmPsd:""});

  const {addToast} =useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setUserForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
): Promise<void> => {
  e.preventDefault();
  console.log(userForm);
  try {
    const response = await register(userForm);
    if(response.status=== 201){
      addToast("Registration successful!","success")
      navigate("/login");
      setUserForm({name:"",email:"",password:"",confirmPsd:""})
    }
  } catch (error) {
  if (axios.isAxiosError(error)) {
    addToast(error ? error.response?.data.message : "Something went wrong","error")
  } else {
    console.log(error);
  }
}
};
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="custom-card px-4 py-2" style={{ width: "400px" }}>
        <span onClick={()=>navigate("/")} style={{color: "var(--color-accent)", fontSize:"30px"}}><IoArrowBackCircleSharp /></span>
        <h2>Hotel Booking System</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="nameInput" className="form-label">
              Name
            </label>

            <input
              type="text"
              className="custom-input"
              id="nameInput"
              name="name"
              value={userForm.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>

            <input
              type="email"
              name="email"
              className="custom-input"
              id="exampleInputEmail1"
              value={userForm.email}
              onChange={handleChange}
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
              name="password"
              value={userForm.password}
              onChange={handleChange}
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
              name="confirmPsd"
              value={userForm.confirmPsd}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-accent btn w-100 mt-3">
            Register
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