"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/src/assets/assets";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const images = assets.hero_images;
  const [index, setIndex] = useState(0);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="h-[calc(100vh-100px)] relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center h-full py-8 lg:py-0">
          
          {/* LEFT TEXT SECTION */}
          <motion.div
            className="flex flex-col justify-center space-y-4 lg:space-y-6 order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main heading */}
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Traditional Mughal Jewelry
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Mughal Jewelers is a home-based brand offering handcrafted traditional
              gold and silver-plated jewelry adorned with semi-precious stones. Each
              piece reflects timeless heritage, artistry, and passion.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link href={"/shop"} className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                Shop Now →
              </Link>
              <Link href={"/collections"} className="w-full sm:w-auto px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
                View Collections
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT CAROUSEL SECTION */}
          <motion.div
            className="relative order-1 lg:order-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-md lg:max-w-lg h-[240px] sm:h-[280px] md:h-[400px] lg:h-[500px] xl:h-[550px]">
              {images.map((img, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{
                    opacity: index === i ? 1 : 0,
                    scale: index === i ? 1 : 1.05
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <Image
                    src={img}
                    alt={`Hero ${i}`}
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                    sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 400px, 50vw"
                    priority={i === 0}
                  />
                </motion.div>
              ))}

              {/* Carousel indicators */}
              <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === i ? "w-8 bg-gray-900" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;