import "../App.css";
import React from "react";
import { Profile } from "./Profile";
import { useLocation } from "react-router";

export const Home = () => {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="grid">
      {data.map((item) => {
        return (
          <div className="item" key={item.id}>
            <Profile item={item} />
          </div>
        );
      })}
    </div>
  );
};
