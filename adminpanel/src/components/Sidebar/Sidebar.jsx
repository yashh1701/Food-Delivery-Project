import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";
import "./Sidebar.css";

const Sidebar = ({ sidebarVisible, darkMode }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Add Food", path: "/add", icon: "bi-plus-circle" },
    { name: "List Food", path: "/list", icon: "bi-grid" },
    { name: "Orders", path: "/orders", icon: "bi-bag" }
  ];

  return (
    <>
      {/* OVERLAY (mobile) */}
      <div className={`overlay ${sidebarVisible ? "show" : ""}`} />

      <motion.aside
        initial={{ x: -120 }}
        animate={{ x: sidebarVisible ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className={`sidebar ${darkMode ? "dark" : ""}`}
      >
        {/* LOGO */}
        <div className="logo-section">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="logo-card"
          >
            <img src={assets.logo} alt="logo" />
          </motion.div>

          <h4>FoodHub</h4>
          <span className="subtext">Admin Panel</span>
        </div>

        {/* MENU */}
        <nav className="menu">
          {menuItems.map((item, i) => {
            const isActive = location.pathname === item.path;

            return (
              <Link to={item.path} key={i} className="menu-link">
                <motion.div
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.96 }}
                  className={`menu-item ${isActive ? "active" : ""}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="active-pill"
                    />
                  )}

                  <i className={`bi ${item.icon}`} />
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="footer">
          <span>© 2026 FoodHub</span>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;