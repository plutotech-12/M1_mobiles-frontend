"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ================= LEFT CONTENT ================= */}
          <div className="space-y-6 sm:space-y-8">

            {/* TAG */}
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full w-fit">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">
                Premium Quality Assured
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Your Trusted
              <span className="block text-orange-600">
                Mobile Partner
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl">
              Discover premium smartphones and accessories. Buy new, save with
              refurbished, or sell your old device for the best value.
            </p>

            {/* ================= DESKTOP CTA ================= */}
            <div className="hidden sm:flex gap-4 pt-4">
              <a
                href="#phones"
                className="
                  inline-flex items-center gap-3
                  px-8 py-4
                  bg-orange-600 text-white
                  text-lg font-semibold
                  rounded-xl
                  shadow-lg
                  hover:bg-orange-500
                  hover:shadow-xl
                  transition-all
                "
              >
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="#buyback"
                className="
                  inline-flex items-center
                  px-8 py-4
                  border-2 border-orange-600
                  text-orange-600
                  text-lg font-semibold
                  rounded-xl
                  hover:bg-orange-50
                  transition
                "
              >
                Sell Your Device
              </a>
            </div>
          </div>

          {/* ================= RIGHT SIDE (DESKTOP LOGO) ================= */}
          <div className="hidden md:flex justify-center">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <Image
                src="/m1m.png"
                alt="M1 Mobiles"
                width={420}
                height={420}
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>

        {/* ================= MOBILE LOGO + CTA ================= */}
        <div className="md:hidden mt-10 space-y-6">

          {/* LOGO */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <Image
                src="/m1m.png"
                alt="M1 Mobiles"
                width={220}
                height={220}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* CTA CARD */}
          <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3">

            <a
              href="#phones"
              className="
                flex items-center justify-center gap-2
                w-full py-4
                bg-orange-600 text-white
                text-lg font-bold
                rounded-xl
                shadow-md
                active:scale-[0.98]
                transition
              "
            >
              Shop Now
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#buyback"
              className="
                flex items-center justify-center
                w-full py-3.5
                border-2 border-orange-600
                text-orange-600
                text-base font-semibold
                rounded-xl
                hover:bg-orange-50
                transition
              "
            >
              Sell Your Device
            </a>

          </div>
        </div>


      </div>
    </section>
  );
}
