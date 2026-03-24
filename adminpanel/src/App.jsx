import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Sidebar from "./components/Sidebar/Sidebar";
import Menubar from "./components/Menubar/Menubar";

import AddFood from "./pages/AddFood/AddFood";
import ListFood from "./pages/ListFood/ListFood";
import Orders from "./pages/Orders/Orders";

import "./App.css";

const App = () => {
  // ===== STATE =====
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // ===== HANDLE RESIZE =====
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (!mobile) {
        setSidebarVisible(true); // always open on desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* ===== SIDEBAR ===== */}
      <Sidebar
        sidebarVisible={sidebarVisible}
        darkMode={darkMode}
        setSidebarVisible={setSidebarVisible}
      />

      {/* ===== OVERLAY (MOBILE ONLY) ===== */}
      {sidebarVisible && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarVisible(false)}
        />
      )}

      {/* ===== MAIN CONTENT ===== */}
      <div className="main-content">

        {/* ===== MENUBAR ===== */}
        <Menubar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          orderCount={orders.length}
          setSidebarVisible={setSidebarVisible}
        />

        {/* ===== TOAST ===== */}
        <ToastContainer />

        {/* ===== PAGE CONTENT ===== */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<ListFood />} />
            <Route path="/add" element={<AddFood />} />
            <Route path="/list" element={<ListFood />} />
            <Route path="/orders" element={<Orders setOrders={setOrders} />} />
          </Routes>
        </div>

      </div>
    </div>
  );
};

export default App;