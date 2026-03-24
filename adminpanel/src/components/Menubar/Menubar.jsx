import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Menubar.css";

const Menubar = ({ darkMode, setDarkMode, orderCount, setSidebarVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const titles = {
    "/add": "Add Food",
    "/list": "Food Items",
    "/orders": "Orders",
    "/dashboaord": "Dashboaord",
    "/analytics": "Analytics",
    "/settings": "Settings"
  };

  const title = titles[location.pathname];

  return (
    <header className={`menubar ${darkMode ? "dark" : ""}`}>

      {/* LEFT */}
      <div className="menubar-left">
        <button 
          className="menu-toggle"
          onClick={() => setSidebarVisible(prev => !prev)}
        >
          <i className="bi bi-list"></i>
        </button>

        <h2>{title}</h2>
      </div>

      {/* CENTER */}
      <div className="center">
        <div className="search">
          <i className="bi bi-search"></i>
          <input placeholder="Search food, orders..." />
        </div>
      </div>

      {/* RIGHT */}
      <div className="right">

        {/* THEME */}
        <button
          className="icon-btn"
          onClick={() => setDarkMode(prev => !prev)}
        >
          <i className={`bi ${darkMode ? "bi-moon-fill" : "bi-sun-fill"}`} />
        </button>

        {/* NOTIFICATION */}
        <div className="notification" onClick={() => navigate("/orders")}>
          <span className="bell-icon">
            <i className="bi bi-bell"></i>
          </span>

          {orderCount > 0 && (
            <span className="badge">
              {orderCount > 9 ? "9+" : orderCount}
            </span>
          )}
        </div>

        {/* PROFILE */}
        <div className="avatar">FH</div>

      </div>
    </header>
  );
};

export default Menubar;