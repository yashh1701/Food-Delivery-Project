import React from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = ({ sidebarVisible, darkMode }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Add Food", path: "/add", icon: "bi-plus-circle" },
    { name: "List Food", path: "/list", icon: "bi-grid" },
    { name: "Orders", path: "/orders", icon: "bi-bag" }
  ];

  return (
    <div
      className={`${sidebarVisible ? "" : "d-none"} d-flex flex-column`}
      style={{
        width: "260px",
        minHeight: "100vh",
        background: darkMode ? "#111827" : "#ffffff",
        borderRight: darkMode ? "1px solid #1f2937" : "1px solid #e5e7eb",
        transition: "0.3s"
      }}
    >
     {/* LOGO SECTION */}
      <div className="text-center py-4">
        <img
          src={assets.logo}
          alt="logo"
          height={50}
          width={50}
          style={{
            borderRadius: "12px",
            background: "#fff",
            padding: "6px"
          }}
        />
        <h5 className="mt-3 fw-bold">FoodHub Admin</h5>
        <small style={{ opacity: 0.8 }}>Manage Delicious Moments</small>
      </div>

      {/* MENU */}
      <div className="flex-grow-1 py-4">

        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className="text-decoration-none"
            >
              <div
                className="d-flex align-items-center px-4 py-3 position-relative"
                style={{
                  color: isActive
                    ? "#f97316"
                    : darkMode
                      ? "#d1d5db"
                      : "#374151",
                  background: isActive
                    ? (darkMode ? "#1f2937" : "#f9fafb")
                    : "transparent",
                  transition: "0.2s",
                  fontWeight: isActive ? "600" : "500",
                  cursor: "pointer"
                }}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
                      width: "4px",
                      background: "#f97316",
                      borderTopRightRadius: "4px",
                      borderBottomRightRadius: "4px"
                    }}
                  />
                )}

                <i
                  className={`bi ${item.icon} me-3`}
                  style={{ fontSize: "1.1rem" }}
                ></i>

                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* FOOTER */}
      <div
        className="px-4 py-3"
        style={{
          borderTop: darkMode ? "1px solid #1f2937" : "1px solid #f1f5f9",
          fontSize: "0.85rem",
          color: darkMode ? "#6b7280" : "#9ca3af"
        }}
      >
        © 2026 FoodHub
      </div>
    </div>
  );
};

export default Sidebar;