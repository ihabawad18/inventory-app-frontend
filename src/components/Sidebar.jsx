import React, { useState } from "react";
import "./Sidebar.css";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiProductHuntLine } from "react-icons/ri";

import menu from "../data/sidebar";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const goHome = ()=>{
    navigate("/");
  }

  const toggle = ()=>{
    setIsOpen(!isOpen);
  }

  return (
    <div className="flex">
      <div className="sidebar" style={{width:isOpen?"230px":"60px"}}>
        <div className="top-section">
          <div className="logo" style={{display:isOpen?"block":"none"}}>
            <RiProductHuntLine size={35} onClick={goHome} className="cursor-pointer" />
          </div>
          <div className="bars">
            <HiMenuAlt3 className="cursor-pointer" onClick={toggle} />
          </div>
        </div>
        {
        menu.map((item,index)=>{
            return <SidebarItem key={index} isOpen={isOpen} item={item}/>
        })
      }
      </div>
      
      <main style={{marginLeft:isOpen?"230px":"60px",transition:"all .5s " }}>{children}</main>
    </div>
  );
};

export default Sidebar;
