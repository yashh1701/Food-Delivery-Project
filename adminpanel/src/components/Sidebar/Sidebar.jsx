import React from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Sidebar.css";

const Sidebar = ({ sidebarVisible, darkMode }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Add Food", path: "/add", icon: "bi-plus-circle" },
    { name: "List Food", path: "/list", icon: "bi-grid" },
    { name: "Orders", path: "/orders", icon: "bi-bag" },

    // 🔥 NEW (FILLING MENU)
    { name: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },
    { name: "Analytics", path: "/analytics", icon: "bi-bar-chart" },
    { name: "Settings", path: "/settings", icon: "bi-gear" }
  ];

  return (
    <aside
      className={`sidebar-container ${darkMode ? "dark" : ""} ${
        sidebarVisible ? "show" : ""
      }`}
    >
      {/* ===== HEADER ===== */}
      <div className="sidebar-header">
        <div className="logo-box">
          <img src={assets.logo} alt="logo" />
        </div>

        <h5>FoodHub</h5>
        <span>Admin Panel</span>
      </div>

      {/* ===== MENU ===== */}
      <div className="sidebar-menu">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link key={index} to={item.path} className="text-decoration-none">
              <div className={`menu-item ${isActive ? "active" : ""}`}>
                <i className={`bi ${item.icon}`}></i>
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ===== FOOTER ===== */}
      <div className="sidebar-footer">
        © 2026 FoodHub
      </div>
    </aside>
  );
};

export default Sidebar;