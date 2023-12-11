import React, { useState } from "react";

import Card from "../../components/Card";
import { Link } from "react-router-dom";
import "./auth.css";
import { TiUserAddOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const regsiter = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    const userData = {
      name,
      email,
      password,
    };

    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="custom-container">
      {isLoading && <Loader />}
      <Card>
        <div className="flex justify-center">
          <TiUserAddOutline size={35} color="#999" />
        </div>
        <h2 className="text-5xl w-full  text-orange-500 font-semibold">
          Register
        </h2>
        <form className="text-left" onSubmit={regsiter}>
          <input
            type="text"
            required
            name="name"
            placeholder="Name"
            className="custom-input border-b-2 w-full border p-3 mt-5 text-2xl rounded shadow-md"
            onChange={handleInputChange}
            value={name}
          />
          <input
            type="email"
            required
            name="email"
            placeholder="Email"
            className="custom-input border-b-2 w-full border p-3 mt-5 text-2xl rounded shadow-md "
            onChange={handleInputChange}
            value={email}
          />
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            className="custom-input border-b-2 w-full border p-3 mt-5 text-2xl rounded shadow-md "
            onChange={handleInputChange}
            value={password}
          />
          <input
            type="password"
            required
            name="password2"
            placeholder="Confirm Password"
            className="custom-input border-b-2 w-full border p-3 mt-5 text-2xl rounded shadow-md "
            onChange={handleInputChange}
            value={password2}
          />
          <button
            type="submit"
            className="login-button bg-blue-500 w-full p-4 rounded text-white mt-5 mb-3 text-2xl shadow-md"
          >
            Register
          </button>
          <Link
            to="/forgot"
            className="custom-hover-scale text-xl font-medium text-orange-700 "
          >
            Forgot Password
          </Link>
          <div className=" mt-5 flex justify-around">
            <Link
              to="/"
              className="custom-hover-scale text-xl font-medium text-orange-700 "
            >
              Home
            </Link>
            <div>
              <span className="ml-3 text-lg text-gray-600 font-medium">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="custom-hover-scale ml-2 text-xl font-medium text-orange-700 "
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;
