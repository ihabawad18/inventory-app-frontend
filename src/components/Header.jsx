import React from "react";
import { logoutUser } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME,selectName } from "../redux/features/auth/authSlice";

const Header = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    await dispatch(SET_NAME(""));
    navigate("/login");
  };
  return (
    <div className="header">
      <div className="flex justify-between items-center">
        <h3>
          <span className=" text-gray-500 text-4xl">Welcome, </span>
          <span className="text-4xl font-semibold text-orange-500">{name}</span>
        </h3>
        <button className="p-3 text-lg rounded bg-orange-600 text-white hover:transform hover:-translate-y-1 transition-transform duration-300 ease-in-out" onClick={logout}>Logout</button>
      </div>
      <hr className="border-gray-500 my-3" />
    </div>
  );
};

export default Header;
