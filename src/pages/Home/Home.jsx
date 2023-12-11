import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.css";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogIn, ShowOnLogOut } from '../../components/protect/HideLinks' ;
const Home = () => {
  return (
    <div className="home">
      <nav className="container flex justify-between ">
        <div className="flex items-center text-white">
          <RiProductHuntLine size={35} />
        </div>

        <ul className="flex items-center p-5">
          <ShowOnLogOut>
            <li>
              <div className="reg">
                <Link to="/register">Register</Link>
              </div>
            </li>
            <li>
              <button className="bg-blue-600 rounded p-3">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogOut>
          <ShowOnLogIn>
            <li>
              <button className="bg-blue-600 rounded p-3">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogIn>
        </ul>
      </nav>
      {/* Hero Section */}
      <div className="container hero">
        <div className="hero-text">
          <h2>
            <span className="mt-3 block">Inventory & Stock</span>
            <span className="mt-3 block">Management</span>
            <span className="mt-3 block">Solution</span>
          </h2>
          <p className="text-gray-200 mt-10 mb-10">
            Inventory system to control and manage products in the warehouse in
            real time and integrated to make it easier to develop your business.
          </p>
          <div className="hero-button">
            <button className="border p-3 rounded font-semibold ">
              <Link to="/dashboard">Free Trial 1 Month</Link>
            </button>

            <div className="flex mt-8">
              <NumberText num="14K" text="Brand Owners" />
              <NumberText num="23K" text="Active Users" />
              <NumberText num="500+" text="Partners" />
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Inventory"></img>
        </div>
      </div>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="mr-4">
      <h2 className="text-3xl">{num}</h2>
      <h3 className="mt-6 text-2xl text-gray-200">{text}</h3>
    </div>
  );
};

export default Home;
