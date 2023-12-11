import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="cont-dashboard py-10 px-5">
      <Header />
      <div className="dashboard-content-div">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
