import { useState, useEffect } from "react";
import { Users, ShoppingCart, DollarSign } from "lucide-react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [summary, setSummary] = useState({ totalCustomers: 0, totalOrders: 0, totalRevenue: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSalesReport = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setError("Unauthorized: Please log in as an admin.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5001/api/sales", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSalesData(response.data.salesData || []);
        setSummary({
          totalCustomers: response.data.totalCustomers || 0,
          totalOrders: response.data.totalOrders || 0,
          totalRevenue: response.data.totalRevenue || 0,
        });
      } catch (err) {
        setError("Error fetching sales report: " + err.message);
      }
    };

    fetchSalesReport();
  }, []);

  // 📊 Prepare data for the bar chart
  const revenueByDate = salesData.reduce((acc, sale) => {
    const date = sale.date;
    acc[date] = (acc[date] || 0) + sale.totalAmount;
    return acc;
  }, {});

  const chartData = Object.keys(revenueByDate).map((date) => ({
    date,
    revenue: revenueByDate[date],
  }));

  return (
    <section className="bg-white py-10 px-4 md:px-8 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">📊 Sales Report</h2>

      {error && <p className="text-red-500">{error}</p>}

      {/* 📊 Sales Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md flex items-center space-x-4">
          <Users className="text-blue-600" size={32} />
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Total Customers</h3>
            <p className="text-gray-600 text-md font-bold">{summary.totalCustomers}</p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md flex items-center space-x-4">
          <ShoppingCart className="text-green-600" size={32} />
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Total Orders</h3>
            <p className="text-gray-600 text-md font-bold">{summary.totalOrders}</p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md flex items-center space-x-4">
          <DollarSign className="text-purple-600" size={32} />
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Total Revenue</h3>
            <p className="text-gray-600 text-md font-bold">${summary.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* 📈 Sales Bar Chart */}
      <div className="mt-10">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">📊 Revenue Over Time</h3>
        <div className="w-full h-[250px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📅 Sales Table */}
      <div className="overflow-x-auto mt-8">
        <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-900">
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Customer</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Product</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {salesData.length > 0 ? (
              salesData.map((sale, index) => (
                <tr key={index} className="text-gray-800">
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">{sale.user}</td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">{sale.items[0]?.product || "Unknown Product"}</td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">${sale.totalAmount.toFixed(2)}</td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">{sale.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-600">
                  No sales data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SalesReport;
