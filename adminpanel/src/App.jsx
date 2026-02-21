import React, { use, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddFood from './pages/AddFood/AddFood';
import ListFood from './pages/ListFood/ListFood';
import Orders from './pages/Orders/Orders';
import Sidebar from './components/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import Menubar from './components/Menubar/menubar';

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }
  return (
    <div className="d-flex" id="wrapper" style={{ minHeight: "100vh" }} >
            
      <Sidebar sidebarVisible={sidebarVisible}/>
            
      <div id="page-content-wrapper" className="flex-grow-1">
                
        <Menubar toggleSidebar={toggleSidebar} />
        <ToastContainer/>
                
        <div className="container-fluid p-4">
          <Routes>
            <Route path='/add' element={<AddFood />} />
            <Route path='/list' element={<ListFood />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/' element={<ListFood />} />
            </Routes>
          </div>
        </div>
    </div>
  )
}

export default App;