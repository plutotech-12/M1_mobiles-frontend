"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">
                Premium Quality Assured
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Trusted
              <span className="block bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Mobile Partner
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Discover premium smartphones and accessories. Buy new, save with
              refurbished, or sell your old device for the best value.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#phones"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href="#buyback"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg border-2 border-orange-600 hover:bg-orange-50 transition-colors duration-200"
              >
                Sell Your Device
              </a>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-3xl transform rotate-6 opacity-10"></div>

            <img
              src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg"
              alt="Premium Smartphones"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
