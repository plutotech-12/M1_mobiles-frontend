"use client";

import Link from "next/link";
import { Smartphone, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand + Contact */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/m1m.jpg"
                alt="M1 Mobiles Logo"
                className="h-15 w-15 object-contain"
              />
              <span className="text-2xl font-bold">M1 Mobiles</span>
            </div>

            <p className="text-gray-400 mb-4">
              Your trusted partner for premium smartphones and accessories.
              Quality assured, service guaranteed.
            </p>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <a href="https://maps.app.goo.gl/WWdK1GFpnm4iw3wHA">3rd floor, AKR Corniche Center</a>
              </div>

              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@m1mobiles.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#phones"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Phones
                </a>
              </li>
              <li>
                <a
                  href="#accessories"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Accessories
                </a>
              </li>
              <li>
                <a
                  href="#buyback"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Sell Your Device
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Warranty Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} M1 Mobiles. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
