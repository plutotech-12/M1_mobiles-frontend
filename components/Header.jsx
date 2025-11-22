"use client";

import {
  ShoppingCart,
  Smartphone,
  Menu,
  X,
  Search,
  User,
  LogOut,
} from "lucide-react";

import { useState } from "react";
import Link from "next/link";

import { useAuth } from "../context/AuthContext"; // ✅ ADD THIS

export default function Header({ cartCount = 0, onCartClick, onSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ⭐ REAL USER FROM CONTEXT (NOT placeholder)
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    setUserMenuOpen(false);
  };


  return (
    <header className="bg-gradient-to-b from-orange-50 to-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16">
          
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <img
              src="/m1m.jpg"
              alt="M1 Mobiles Logo"
              className="h-15 w-15 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              M1 Mobiles
            </span>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-orange-50 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user.email}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 transition-colors flex items-center space-x-2"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium text-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="pb-4">
          <div className="flex items-center bg-white rounded-lg shadow-lg p-2 border-2 border-orange-200">
            <input
              type="text"
              placeholder="Search for phones, accessories, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  onSearch(searchQuery);
                }
              }}
              className="flex-1 outline-none text-gray-700 placeholder-gray-500 px-4 py-3 text-lg"
            />

            <button
              onClick={() => searchQuery.trim() && onSearch(searchQuery)}
              className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-r-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-semibold"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 pb-4">
          <a href="/" className="text-gray-700 hover:text-orange-600 font-medium text-sm">
            Home
          </a>
          <a href="/#phones" className="text-gray-700 hover:text-orange-600 transition-colors font-medium text-sm">
            Phones
          </a>
          <a href="/#accessories" className="text-gray-700 hover:text-orange-600 transition-colors font-medium text-sm">
            Accessories
          </a>
          <a href="/#buyback" className="text-gray-700 hover:text-orange-600 transition-colors font-medium text-sm">
            Sell Your Device
          </a>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t pt-4">
            <a href="#home" className="block py-2 text-gray-700 hover:text-orange-600 transition-colors">
              Home
            </a>
            <a href="#phones" className="block py-2 text-gray-700 hover:text-orange-600 transition-colors">
              Phones
            </a>
            <a href="#accessories" className="block py-2 text-gray-700 hover:text-orange-600 transition-colors">
              Accessories
            </a>
            <a href="#buyback" className="block py-2 text-gray-700 hover:text-orange-600 transition-colors">
              Sell Your Device
            </a>

            <div className="border-t mt-4 pt-4">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="block py-2 text-gray-700 hover:text-orange-600 transition-colors flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left py-2 text-gray-700 hover:text-red-600 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block py-2 px-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg text-center font-medium"
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

