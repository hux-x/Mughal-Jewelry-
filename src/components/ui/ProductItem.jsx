"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShopContext } from "@/src/context/ShopContext";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";

const Productitem = ({ name, id, price, images, inStock }) => {
  const { currency, addtocart } = useContext(ShopContext);
  const [imageError, setImageError] = useState(false);

  // Safely get the first image or use a fallback
  const primaryImage = Array.isArray(images) && images.length > 0 
    ? images[0] 
    : '/placeholder-product.jpg';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!inStock) {
      toast.info("Currently out of stock");
      return;
    }

    addtocart(id, "default");
    toast.success(`${name} added to cart!`);
  };

  return (
    <Link
      href={`/product/${id}`}
      className="group relative block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative w-full h-52 sm:h-56 md:h-60 lg:h-64 bg-gray-100">
        {!imageError ? (
          <Image
            src={primaryImage}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">Image unavailable</span>
          </div>
        )}

        {/* Out of Stock Badge */}
        {!inStock && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[11px] px-2 py-0.5 rounded-full font-medium z-10">
            Out of stock
          </span>
        )}

        {/* Add to Cart Icon */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          aria-label={inStock ? "Add to cart" : "Out of stock"}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all z-10
            ${
              inStock
                ? "bg-black/70 text-white hover:bg-black/90 hover:scale-110"
                : "bg-black/30 text-white cursor-not-allowed"
            }
          `}
        >
          <ShoppingCart size={20} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-5 flex flex-col gap-1">
        <p className="text-sm md:text-base font-medium text-gray-800 truncate" title={name}>
          {name}
        </p>
        <p className="text-sm md:text-base font-semibold text-gray-900">
          {currency}{price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default Productitem;