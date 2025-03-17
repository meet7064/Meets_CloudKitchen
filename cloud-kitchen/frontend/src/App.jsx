import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminNavbar from "./admin/AdminNavbar";
import SuperAdminNavbar from "./superadmin/SuperAdminNavbar";
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
import SuperAdminDashboard from "./superadmin/SuperAdminDashboard"; 
import CreateAdmin from "./superadmin/CreateAdmin";
import SuperAdminLogin from "./superadmin/SuperAdminLogin";
import AdminList from "./superadmin/AdminList";

const App = () => {
  const location = useLocation();

  // ❌ Paths where Navbar & Footer should be hidden but logo should be shown
  const hiddenPaths = [
    "/admin/login",
    "/admin/register",
    "/user/login",
    "/user/register",
    "/super-admin/login",
  ];

  // ✅ Paths where Super Admin Navbar should be used
  const superAdminPaths = [
    "/super-admin/dashboard",
    "/super-admin/create-admin",
    "/super-admin/admin-list",
  ];

  // ✅ Paths where Admin Navbar should be used
  const adminPaths = [
    "/admin/dashboard",
    "/admin/menu",
    "/admin/orders",
    "/admin/sales-report",
    "/admin/home",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Show Navbar Based on User Role */}
      {superAdminPaths.includes(location.pathname) ? (
        <SuperAdminNavbar />
      ) : adminPaths.includes(location.pathname) ? (
        <AdminNavbar />
      ) : !hiddenPaths.includes(location.pathname) ? (
        <Navbar />
      ) : (
        <div className="bg-gray-900 text-white py-4 px-6 shadow-md text-center">
          {/* ✅ Show Logo Only on Hidden Pages */}
          {location.pathname.startsWith("/admin") ? (
            <h1 className="text-2xl font-bold">🔧 Cloud Kitchen - Admin</h1>
          ) : location.pathname.startsWith("/super-admin") ? (
            <h1 className="text-2xl font-bold">👑 Cloud Kitchen - Super Admin</h1>
          ) : (
            <h1 className="text-2xl font-bold">🍽️ Cloud Kitchen</h1>
          )}
        </div>
      )}

      <div className="flex-grow">
        <Routes>
          {/* ✅ User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />

          {/* ✅ Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/sales-report" element={<SalesReport />} />

          {/* ✅ Super Admin Routes */}
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/create-admin" element={<CreateAdmin />} />
          <Route path="/super-admin/login" element={<SuperAdminLogin />} />
          <Route path="/super-admin/admin-list" element={<AdminList />} />

          {/* ✅ Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/user/chat" element={<UserChat />} />
        </Routes>
      </div>

      {!hiddenPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
