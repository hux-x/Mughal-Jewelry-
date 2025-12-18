"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import productService from "@/src/api/services/productService";

const CollectionsPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await productService.getCategories();
        if (res && res.categories) {
          setCategories(res.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Loading collections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Collections
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover our curated jewelry collections, each telling its own unique story.
            From timeless classics to contemporary designs, find the perfect piece for every occasion.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((collection, index) => (
            <Link
              key={collection._id}
              href={`/shop?category=${collection.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative h-96 w-full">
                <Image
                  src={`${collection.imageSlug}.webp`}
                  alt={collection.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <h2 className="text-white font-bold text-2xl sm:text-3xl mb-3 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    {collection.name}
                  </h2>
                  
                  {collection.description && (
                    <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
                      {collection.description}
                    </p>
                  )}

                  {/* View Collection Button */}
                  <div className="flex items-center text-white font-semibold text-sm group-hover:text-yellow-300 transition-colors duration-300">
                    <span>View Collection</span>
                    <svg
                      className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No collections available at the moment.</p>
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CollectionsPage;