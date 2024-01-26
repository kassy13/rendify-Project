import React from "react";
import "../../custom css/RightSide.css";
import Updates from "./Updates";
import Customer from "./Customer";
const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
        <h3>Updates</h3>
        <Updates />
      </div>
      <div>
        <h3>Customer Review</h3>
        <Customer />
      </div>
    </div>
  );
};

export default RightSide;
