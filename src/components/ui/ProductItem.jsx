"use client";
import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShopContext } from "@/src/context/ShopContext";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react"; // install lucide-react if not installed

const Productitem = ({ name, id, price, image }) => {
  const { currency, addtocart } = useContext(ShopContext);

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent navigation when clicking icon
    addtocart(id, "default");
    toast.success(`${name} added to cart!`);
  };

  return (
    <Link href={`/product/${id}`} className="group relative block bg-white rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative w-full h-52 sm:h-56 md:h-60 lg:h-64">
        <Image
          src={image[0]}
          alt={name}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {/* Add to Cart Icon */}
        <button
          onClick={handleAddToCart}
          className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
        >
          <ShoppingCart size={20} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-5 flex flex-col gap-1">
        <p className="text-sm md:text-base font-medium truncate">{name}</p>
        <p className="text-sm md:text-base font-semibold">{currency}{price}</p>
      </div>
    </Link>
  );
};

export default Productitem;
