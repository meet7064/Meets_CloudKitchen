// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./superadmin/SuperAdminNavbar";
// import Footer from "./components/Footer";
// import SuperAdminDashboard from "./superadmin/SuperAdminDashboard"; // ✅ Import Super Admin Page
// import CreateAdmin from "./superadmin/CreateAdmin";
// import SuperAdminLogin from "./superadmin/SuperAdminLogin";
// import AdminList from "./superadmin/AdminList";

// const SuperAdminApp = () => {
//   const location = useLocation();

//   // ❌ Hide Navbar & Footer for these paths
// //   const hiddenPaths = [
// //     "/admin/login",
// //     "/admin/register",
// //     "/user/login",
// //     "/user/register",
// //     "/admin/home",
// //     "/admin/orders",
// //     "/admin/menu",
// //     "/admin/dashboard",
// //     "/admin/sales-report",
// //     "/super-admin/dashboard", // ✅ Hiding Navbar/Footer on Super Admin Page
// //     "/super-admin/create-admin", // ✅ Hiding Navbar/Footer on Create Admin Page
// //     "/super-admin/login", // ✅ Hiding Navbar/Footer on Super Admin Login Page
// //   ];
// //   const hideNavbarFooter = hiddenPaths.includes(location.pathname);

//   return (
//     <div className="flex flex-col min-h-screen">
//      <Navbar />{/* ✅ Show Navbar only if not in hidden paths */}
//       <div className="flex-grow">
//         <Routes>
//           {/* ✅ Super Admin Route */}
//           <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
//           <Route path="/super-admin/create-admin" element={<CreateAdmin />} />
//           <Route path="/super-admin/login" element={<SuperAdminLogin />} />
//           <Route path="/super-admin/admin-list" element={<AdminList />} />
//         </Routes>
//       </div>
//       <Footer /> {/* ✅ Show Footer only if not in hidden paths */}
//     </div>
//   );
// };

// export default SuperAdminApp;
