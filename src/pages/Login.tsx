import { Link, useNavigate } from 'react-router';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import React, { useState } from 'react';
import type { LoginData } from '../types';
import { loginService } from '../services/authServices';
import { useToast } from '../contexts/ToastContext';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();
  const [loginForm, setLoginForm] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await loginService(loginForm);

      if (response.status === 200) {
        addToast(response.data.message, 'success');
        const token = response.data.data.token;
        const user = response.data.data.user;
        login(token, user);
        setLoginForm({ email: '', password: '' });
        navigate('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        addToast(error.response?.data.message, 'error');
      } else {
        console.log('ERROR: ', error);
      }
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="custom-card p-4" style={{ width: '400px' }}>
        <span
          onClick={() => navigate('/')}
          style={{ color: 'var(--color-accent)', fontSize: '30px' }}
        >
          <IoArrowBackCircleSharp />
        </span>
        <h2>Hotel Booking System</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>

            <input
              type="email"
              className="custom-input"
              id="exampleInputEmail1"
              name="email"
              value={loginForm.email}
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
              value={loginForm.password}
              onChange={handleChange}
            />
          </div>

          <a href="#">Forgot password?</a>

          <button type="submit" className="btn-accent btn w-100 mt-3">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account? <Link to={'/register'}>Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
