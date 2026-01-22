import { useState, useEffect } from "react";
import { Users, ShoppingBag, TrendingUp, BarChart3, Calendar } from "lucide-react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [summary, setSummary] = useState({ totalCustomers: 0, totalOrders: 0, totalRevenue: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSalesReport = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setError("🔒 Access Denied: Please sign in to your artisan account.");
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
        setError("❌ Could not retrieve market insights.");
      }
    };

    fetchSalesReport();
  }, []);

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
    <section className="bg-[#FDFCF8] min-h-screen py-12 px-6 lg:px-16 text-stone-900">
      <header className="mb-10 text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3">
          <BarChart3 className="text-amber-700" size={36} />
          Market Insights
        </h2>
        <p className="text-stone-500 mt-2 font-medium">Review your growth and community support overview.</p>
      </header>

      {error && <p className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">{error}</p>}

      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="bg-white border border-stone-100 p-6 rounded-2xl shadow-sm flex items-center gap-5">
          <div className="bg-stone-50 p-3 rounded-xl text-stone-700">
            <Users size={28} />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Neighbors</h3>
            <p className="text-2xl font-black text-stone-900">{summary.totalCustomers}</p>
          </div>
        </div>

        <div className="bg-white border border-stone-100 p-6 rounded-2xl shadow-sm flex items-center gap-5">
          <div className="bg-stone-50 p-3 rounded-xl text-stone-700">
            <ShoppingBag size={28} />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Total Finds</h3>
            <p className="text-2xl font-black text-stone-900">{summary.totalOrders}</p>
          </div>
        </div>

        <div className="bg-stone-900 p-6 rounded-2xl shadow-lg flex items-center gap-5">
          <div className="bg-white/10 p-3 rounded-xl text-amber-500">
            <TrendingUp size={28} />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Total Impact</h3>
            <p className="text-2xl font-black text-white">${summary.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* 📈 Chart Section */}
      <div className="mt-12 bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
        <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
          <Calendar className="text-amber-700" size={20} />
          Revenue Growth
        </h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F4" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#78716c', fontSize: 12}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#78716c', fontSize: 12}} 
              />
              <Tooltip 
                cursor={{fill: '#FAFAF9'}} 
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
              />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#78716c' : '#b45309'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📅 Ledger Table */}
      <div className="mt-12 overflow-hidden rounded-3xl border border-stone-100 shadow-sm bg-white">
        <div className="px-8 py-5 border-b border-stone-50">
          <h3 className="font-bold text-stone-800">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50 text-stone-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Artisan Item</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {salesData.length > 0 ? (
                salesData.map((sale, index) => (
                  <tr key={index} className="text-stone-700 hover:bg-stone-50/50 transition-colors">
                    <td className="px-8 py-4 font-medium">{sale.user}</td>
                    <td className="px-8 py-4 text-stone-500 italic">
                      {sale.items[0]?.product || "Artisan Craft"}
                    </td>
                    <td className="px-8 py-4 font-bold text-stone-900">${sale.totalAmount.toFixed(2)}</td>
                    <td className="px-8 py-4 text-sm text-stone-400">{sale.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-stone-400 italic">
                    No transactions recorded in the marketplace yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SalesReport;