"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { collections } from "../../assets/assets";

const ShopByCollection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Shop by Collection</h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
            Explore our exclusive jewelry collections and find your perfect piece.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-8 lg:gap-10">
          {collections.map((collection, index) => (
            <Link
              key={collection.slug}
              href={`/shop?category=${collection.slug}`}
              className="group flex flex-col items-center animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, (max-width: 1024px) 144px, 160px"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Text Overlay */}
                <div className="absolute inset-0 flex items-end justify-center pb-4">
                  <span className="text-white font-semibold text-sm sm:text-base text-center px-2 drop-shadow-lg">
                    {collection.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* Browse More Circle */}
          <Link
            href="/collections"
            className="group flex flex-col items-center animate-fadeIn"
            style={{ animationDelay: `${collections.length * 0.1}s` }}
          >
            <div className="flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full bg-gray-100 hover:bg-gray-900 border-2 border-gray-200 hover:border-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="text-center">
                <div className="text-gray-700 group-hover:text-white font-semibold text-sm sm:text-base transition-colors duration-300">
                  Browse
                  <br />
                  More
                </div>
                <svg
                  className="w-5 h-5 mx-auto mt-2 text-gray-700 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Add animation to your global CSS or tailwind.config.js */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ShopByCollection;