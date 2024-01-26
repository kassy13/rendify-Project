import React from "react";
import "../../custom css/Updates.css";
import { UpdatesData } from "../../Data/Data";
const Updates = () => {
  return (
    <div className="Updates">
      {UpdatesData.map((update) => {
        return (
          <div className="update" key={update.name}>
            <img src={update.img} alt="" />
            {/* <div className="noti">
              <div style={{ marginBottom: "0.5rem" }}></div>
            </div> */}
            <div className="note">
              <span>
                <span>{update.name}</span>
                <span> {update.noti}</span>
              </span>

              <span> {update.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Updates;
