"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";


export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 sm:py-16 md:py-20"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6 sm:space-y-8">

            {/* TAG */}
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs sm:text-sm font-semibold">
                Premium Quality Assured
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Trusted
              <span className="block bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Mobile Partner
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              Discover premium smartphones and accessories. Buy new, save with
              refurbished, or sell your old device for the best value.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

              <a
                href="#phones"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>

              <a
                href="#buyback"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-orange-600 font-semibold rounded-lg border-2 border-orange-600 hover:bg-orange-50 transition-colors"
              >
                Sell Your Device
              </a>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative hidden md:flex justify-center items-center">

            <div className="relative w-full max-w-md">

              {/* Company Logo */}
              <Image
                src="/m1m.png"
                alt="Company Logo"
                width={500}
                height={500}
                className="rounded-2xl shadow-xl"
                priority
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
