import React, { useState } from "react";
import { MdPassword } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Card";
import { resetPassword } from "../../services/authService";
import { toast } from "react-toastify";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const { resetToken } = useParams();

  const [formData, setFormData] = useState(initialState);

  const { password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();
    if (!password) {
      return toast.error("Please provide a password");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="custom-container">
      <Card>
        <div className="flex justify-center">
          <MdPassword size={35} color="#999" />
        </div>
        <h2 className="text-5xl w-full  text-orange-500 font-semibold">
          Reset Password
        </h2>
        <form className="text-left" onSubmit={reset}>
          <input
            type="password"
            required
            name="password"
            placeholder="New Password"
            className="custom-input border-b-2 w-full border p-3 mt-5 text-2xl rounded shadow-md "
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            required
            name="password2"
            placeholder="Confirm Password"
            className="custom-input border-b-2 w-full border p-3 mt-5 text-2xl rounded shadow-md "
            value={password2}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="login-button bg-blue-500 w-full p-4 rounded text-white mt-5 mb-3 text-2xl shadow-md"
          >
            Reset Password
          </button>
          <div className="mt-5 flex justify-around">
            <Link
              to="/"
              className="custom-hover-scale text-xl font-medium text-orange-700 "
            >
              - Home
            </Link>
            <Link
              to="/login"
              className="custom-hover-scale ml-2 text-xl font-medium text-orange-700 "
            >
              - Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Reset;
