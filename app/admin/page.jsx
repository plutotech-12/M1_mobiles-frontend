"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";

import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  BarChart3,
  TrendingUp,
  LogOut,
  IndianRupee,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    recentOrders: []   // ⭐ IMPORTANT
  });

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (!hydrated) return;

    if (!user) return router.push("/login");

    if (user.role !== "admin" && !user.isAdmin) return router.push("/");

    loadStats();
  }, [user, hydrated]);

  const loadStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Admin stats load failed", err);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (!hydrated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">

      {/* ==============================
          SIDEBAR
      =============================== */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col py-6">
        <h1 className="text-xl font-bold px-6 mb-6 flex items-center gap-2">
          <LayoutDashboard className="text-orange-600" />
          Admin Panel
        </h1>

        <SidebarLink
          title="Dashboard"
          icon={<LayoutDashboard />}
          onClick={() => router.push("/admin")}
        />

        <SidebarLink
          title="Products"
          icon={<Package />}
          onClick={() => router.push("/admin/products")}
        />

        <SidebarLink
          title="Orders"
          icon={<ShoppingBag />}
          onClick={() => router.push("/admin/orders")}
        />

        <SidebarLink
          title="Users"
          icon={<Users />}
          onClick={() => router.push("/admin/users")}
        />

        <div className="mt-auto px-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 font-medium py-2"
          >
            <LogOut /> Logout
          </button>
        </div>
      </aside>

      {/* ==============================
          MAIN CONTENT
      =============================== */}
      <main className="flex-1 p-6 md:p-10">

        {/* TOP HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 text-transparent bg-clip-text">
            Dashboard Overview
          </h2>
        </div>

        {/* ======= ANALYTICS CARDS ======= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <StatCard
            title="Total Products"
            value={stats.products}
            icon={<Package className="text-blue-600" />}
          />

          <StatCard
            title="Total Users"
            value={stats.users}
            icon={<Users className="text-green-600" />}
          />

          <StatCard
            title="Total Orders"
            value={stats.orders}
            icon={<ShoppingBag className="text-orange-600" />}
          />

          <StatCard
            title="Revenue"
            value={
              stats.revenue
                ? "₹" + stats.revenue.toLocaleString("en-IN")
                : "₹0"
            }
            icon={<IndianRupee className="text-purple-600" />}
          />
        </div>

        {/* ======= RECENT ORDERS + SALES CHART ======= */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* RECENT ORDERS TABLE */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>

            {stats.recentOrders && stats.recentOrders.length === 0 ? (
              <p className="text-gray-500">No recent orders found.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-gray-600 text-sm">
                    <th className="py-2">Order ID</th>
                    <th className="py-2">Customer</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders?.map((order) => (
                    <tr key={order._id} className="border-b last:border-none">
                      <td className="py-2">{order._id}</td>
                      <td className="py-2">{order.user?.name}</td>
                      <td className="py-2">
                        ₹{order.total?.toLocaleString("en-IN")}
                      </td>
                      <td className="py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs text-white ${
                            order.status === "Delivered"
                              ? "bg-green-500"
                              : order.status === "Shipped"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* SALES CHART PLACEHOLDER */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center">
            <BarChart3 className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-lg font-semibold">Sales Analytics</h3>
            <p className="text-gray-500 text-sm mt-2">Charts Coming Soon</p>
          </div>
        </div>
      </main>
    </div>
  );
}

/* COMPONENTS */

function SidebarLink({ title, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 transition-all text-left"
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 border">
      <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
