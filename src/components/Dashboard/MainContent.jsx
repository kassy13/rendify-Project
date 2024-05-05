import React, { useEffect, useState } from "react";
import "../../custom css/MainDash.css";
import Cards from "./Cards";
import Table from "./Table";
import RightSide from "./RightSide";
import { useAuth } from "../../utils/AuthContext";
import { Link } from "react-router-dom";
import "../../sass/btn.scss";
// import BigHead from "@bigheads/core";
import { BigHead } from "@bigheads/core";

const MainContent = () => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);

  // const fetchUserAvatar = async () => {
  //   try {
  //     const storedAvatarUrl = localStorage.getItem(`avatar_${user.id}`);

  //     if (!storedAvatarUrl) {
  //       const avatarDetails = BigHead();
  //       const avatarUrl = avatarDetails.src;

  //       setAvatarUrl(avatarUrl);
  //       localStorage.setItem(`avatar_${user.id}`, avatarUrl);
  //     } else {
  //       setAvatarUrl(storedAvatarUrl);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching or storing user avatar", error);
  //   }
  // };

  console.log(user);
  // useEffect(() => {
  //   if (user) {
  //     fetchUserAvatar();
  //   }
  // }, []);
  return (
    <div className="MainContent">
      <h1>dashboard</h1>
      <div className="flex justify-between items-center pb-3 tt">
        <div className="avatar">
          <p>Welcome {user.name}</p>
          <div className="w-8 h-8 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-18 lg:h-18 xl:w-12 xl:h-12 avat">
            <BigHead body="chest" clothing="shirt" clothingColor="black" />
          </div>
        </div>
        <Link to={"/createevent"}>
          <button className="btn"> Create Event</button>
        </Link>
      </div>
      <Cards />
      <Table />
    </div>
  );
};

export default MainContent;
