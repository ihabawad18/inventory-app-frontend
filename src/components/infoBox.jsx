import React from "react";
import "./infoBox.css";
const InfoBox = ({ bgColor, title, icon, count }) => {
  return (
    <div className={`flex ${bgColor} info-box`}>
      <span className="text-white">{icon}</span>
      <span className="ml-6">
        <p className="text-5xl">{title}</p>
        <h3>{count}</h3>
      </span>
    </div>
  );
};

export default InfoBox;
