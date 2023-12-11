import React from "react";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

const activeSublink = ({ isActive }) => {
  return isActive ? "active" : "link";
};
const activeLink = ({ isActive }) => {
  return isActive ? "active" : "link";
};
const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setexpandMenu] = useState(false);
  if (item.childrens) {
    return (
      <div
        className={
          expandMenu ? "s-parent sidebar-item open" : "s-parent sidebar-item"
        }
      >
        <div className="sidebar-title flex justify-between">
          <span className="flex items-center">
            {item.icon && (
              <div className="icons" style={{ fontSize: "23px" }}>
                {item.icon}
              </div>
            )}
            {isOpen && <div className="text-2xl ml-4">{item.title}</div>}
          </span>
          <MdKeyboardArrowRight
            size={25}
            className="arrow-icon cursor-pointer"
            onClick={() => setexpandMenu(!expandMenu)}
          />
        </div>

        <div className="sidebar-content">
          {item.childrens.map((child, index) => {
            return (
              <div key={index} className="s-child">
                <NavLink to={child.path} className={activeSublink}>
                  <div className="sidebar-item">
                    <div className="sidebar-title">
                      {child.icon && <div className="icon">{child.icon}</div>}
                      {isOpen && <div>{child.title}</div>}
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <div className="sidebar-item s-parent">
          <div className="sidebar-title flex items-center">
            {item.icon && (
              <div className="icons" style={{ fontSize: "23px" }}>
                {item.icon}
              </div>
            )}
            {isOpen && <div className="text-2xl ml-4">{item.title}</div>}
          </div>
        </div>
      </NavLink>
    );
  }
};

export default SidebarItem;
