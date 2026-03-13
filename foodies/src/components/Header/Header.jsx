import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">

      <div className="header-overlay"></div>

      <div className="header-content">

        <h1>
          Order your favorite food here
        </h1>

        <p>
          Discover the best food and drinks in Bengaluru
        </p>

        <Link to="/explore" className="explore-btn">
          Explore Menu
        </Link>

      </div>

    </div>
  );
};

export default Header;