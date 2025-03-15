import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./userpages/Home";
import Menu from "./userpages/Menu";
import AdminDashboard from "./admin/AdminDashboard";
import Orders from "./userpages/Orders";
import UserProfile from "./userpages/Profile";
import AdminMenu from "./admin/AdminMenu";
import AdminOrders from "./admin/AdminOrders";
import AdminLogin from "./admin/AdminLogin";
import AdminRegister from "./admin/AdminRegister";
import UserLogin from "./userpages/UserLogin";
import UserRegister from "./userpages/UserRegister";
import AdminHome from "./admin/AdminHome";
import SalesReport from "./admin/SalesReport";
import UserChat from "./userpages/UserChat";
import SuperAdminDashboard from "./superadmin/SuperAdminDashboard"; // ✅ Import Super Admin Page
import CreateAdmin from "./superadmin/CreateAdmin";

const App = () => {
  const location = useLocation();

  // ❌ Hide Navbar & Footer for these paths
  const hiddenPaths = [
    "/admin/login",
    "/admin/register",
    "/user/login",
    "/user/register",
    "/admin/home",
    "/admin/orders",
    "/admin/menu",
    "/admin/dashboard",
    "/admin/sales-report",
    "/super-admin/dashboard", // ✅ Hiding Navbar/Footer on Super Admin Page
    "/super-admin/create-admin", // ✅ Hiding Navbar/Footer on Create Admin Page
  ];
  const hideNavbarFooter = hiddenPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbarFooter && <Navbar />} {/* ✅ Show Navbar only if not in hidden paths */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />

          {/* ✅ Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/orders" element={<AdminOrders />} />

          {/* ✅ Super Admin Route */}
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/create-admin" element={<CreateAdmin />} />

          {/* ✅ Admin & User Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/sales-report" element={<SalesReport />} />
          <Route path="/user/chat" element={<UserChat />} />
        </Routes>
      </div>
      {!hideNavbarFooter && <Footer />} {/* ✅ Show Footer only if not in hidden paths */}
    </div>
  );
};

export default App;
