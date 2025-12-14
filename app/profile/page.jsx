"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, LogOut, ShoppingBag, CheckCircle, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if not logged in → redirect to login
    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(false);
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-12">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {user.fullName || "User"}
                </h1>
                <p className="text-orange-100 flex items-center space-x-1 mt-1">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="px-8 py-8">

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
                <ShoppingBag className="h-8 w-8 text-orange-600 mb-3" />
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                <ShoppingBag className="h-8 w-8 text-blue-600 mb-3" />
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
                <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
            </div>

            {/* Placeholder for Buyback Requests */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                My Buyback Requests
              </h2>

              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No buyback requests yet</p>
                <p className="text-gray-400 mt-2">
                  Once you submit a request, it will appear here.
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-8 pt-8 border-t">
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="w-full md:w-auto bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 font-semibold"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
