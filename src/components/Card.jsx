import React from "react";
import './Card.css';


const Card = ({ children,cardClass }) => {
  return <div className={`card bg-white rounded p-7 ${cardClass}`}>{children}</div>;
};

export default Card;
