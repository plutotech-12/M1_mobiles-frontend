"use client";

import {
  ShoppingCart,
  Menu,
  X,
  Search,
  User,
  LogOut,
} from "lucide-react";

import { useState } from "react";
import Link from "next/link";

import { useAuth } from "../context/AuthContext";

export default function Header({ cartCount = 0, onCartClick, onSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md border-b">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center h-16">

          {/* BRAND */}
          <div className="flex items-center gap-3">
            <img
              src="/m1m.jpg"
              alt="M1 Mobiles Logo"
              className="h-10 w-10 object-contain rounded-md"
            />

            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              M1 Mobiles
            </span>
          </div>

          {/* DESKTOP ICONS */}
          <div className="hidden md:flex items-center gap-4">

            {/* CART */}
            <button
              onClick={onCartClick}
              id = "cart-icon"
              className="relative p-2 text-gray-700 hover:text-orange-600"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* USER MENU */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-orange-50"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm">{user.email}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-orange-50 text-gray-700 flex items-center gap-2"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-gray-700 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* MOBILE ICONS */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-orange-600"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* SEARCH BAR */}
        <div className="pb-4">
          <div className="flex items-center bg-white rounded-lg shadow border overflow-hidden">
            <input
              type="text"
              placeholder="Search phones, accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  onSearch(searchQuery);
                }
              }}
              className="flex-1 text-gray-700 px-4 py-2 text-sm sm:text-base outline-none"
            />

            <button
              onClick={() => searchQuery.trim() && onSearch(searchQuery)}
              className="bg-orange-600 text-white px-4 sm:px-8 py-2 flex items-center gap-2 text-sm sm:text-base"
            >
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 pb-4">
          <Link href="/" className="text-gray-700 hover:text-orange-600 text-sm">Home</Link>
          <Link href="/#phones" className="text-gray-700 hover:text-orange-600 text-sm">Phones</Link>
          <Link href="/#accessories" className="text-gray-700 hover:text-orange-600 text-sm">Accessories</Link>
          <Link href="/#buyback" className="text-gray-700 hover:text-orange-600 text-sm">Sell Your Device</Link>
        </nav>

        {/* MOBILE NAV */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t pt-4 space-y-3 text-gray-700">
            <Link href="/" className="block">Home</Link>
            <Link href="/#phones" className="block">Phones</Link>
            <Link href="/#accessories" className="block">Accessories</Link>
            <Link href="/#buyback" className="block">Sell Your Device</Link>

            <div className="border-t pt-3">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="block flex items-center gap-2 py-2"
                  >
                    <User className="h-4 w-4" /> Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left flex gap-2 items-center py-2"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block text-center bg-orange-600 text-white py-2 rounded-lg"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        )}

      </div>
    </header>
  );
}
