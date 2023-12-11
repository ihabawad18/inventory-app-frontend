import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./auth.css";
import { forgotPassword, validateEmail } from "../../services/authService";
const Forgot = () => {
  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    console.log(e);
    e.preventDefault();

    if (!email) {
      return toast.error("Please provide an email address");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail("");
  };

  return (
    <div className="custom-container">
      <Card>
        <div className="flex justify-center">
          <AiOutlineMail size={35} color="#999" />
        </div>
        <h2 className="text-5xl w-full  text-orange-500 font-semibold">
          Forgot Password
        </h2>
        <form className="text-left" onSubmit={forgot}>
          <input
            type="email"
            required
            name="email"
            placeholder="Email"
            className="custom-input border-b-2 w-full border p-3 mt-5 text-2xl rounded shadow-md "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="login-button bg-blue-500 w-full p-4 rounded text-white mt-5 mb-3 text-2xl shadow-md"
          >
            Get Reset Email
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

export default Forgot;
