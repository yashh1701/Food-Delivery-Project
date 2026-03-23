import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddFood from './pages/AddFood/AddFood';
import ListFood from './pages/ListFood/ListFood';
import Orders from './pages/Orders/Orders';
import Sidebar from './components/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import Menubar from './components/Menubar/Menubar';
import './App.css';

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [orders, setOrders] = useState([]);

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <Sidebar sidebarVisible={sidebarVisible} darkMode={darkMode} />

      {/* 🔥 MAIN CONTENT FIX */}
      <div className="main-content">

        <Menubar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          orderCount={orders.length}
        />

        <ToastContainer />

        <div className="page-content">
          <Routes>
            <Route path='/add' element={<AddFood />} />
            <Route path='/list' element={<ListFood />} />
            <Route path='/orders' element={<Orders setOrders={setOrders} />} />
            <Route path='/' element={<ListFood />} />
          </Routes>
        </div>

      </div>
    </div>
  );
};

export default App;