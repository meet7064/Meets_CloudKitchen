// src/App.js
import React from 'react';
import { Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
// import AdminDashboard from './pages/AdminDashboard'
import Orders from './pages/Orders';
// import UserProfile from './pages/Profile';
// import AdminMenu from './admin/AdminMenu';
// import AdminOrders from './admin/AdminOrders';

const App = () => {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/menu" element={<Menu />} />
  {/* <Route path="/profile" element={<UserProfile />} /> */}
  {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
  {/* <Route path="/admin/menu" element={<AdminMenu />} /> */}
  {/* <Route path="/admin/orders" element={<AdminOrders />} /> */}
  <Route path="/orders" element={<Orders />} />
</Routes>

  );
};

export default App;
