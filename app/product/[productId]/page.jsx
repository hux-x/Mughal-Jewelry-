"use client";
import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "@/src/context/ShopContext";
import { useParams } from "next/navigation";
import {
  ShoppingCart,
  MessageCircle,
  Truck,
  Globe,
  Ban,
  Plus,
  Minus,
  Package,
} from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

const ProductPage = () => {
  const { productId } = useParams();
  const { products, currency, addtocart, goToPage, deliveryFee } =
    useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) setProductData(product);
  }, [productId, products]);

  const addItems = () => {
    for (let i = 0; i < quantity; i++) {
      addtocart(productData._id, "default");
    }
  };

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading product…
      </div>
    );
  }

  const totalPrice = productData.price * quantity;

  return (
    <main className="bg-white">
      {/* ================= HERO PRODUCT SECTION ================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-10 lg:pt-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* GALLERY */}
          <div>
            <div className="relative aspect-square bg-gray-50">
              <Image
                src={productData.image[selectedImage]}
                alt={productData.name}
                fill
                priority
                className="object-contain"
              />
            </div>

            {productData.image.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {productData.image.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 bg-gray-50 flex-shrink-0 border ${
                      selectedImage === i
                        ? "border-black"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="space-y-8">
            {productData.category && (
              <p className="text-xs tracking-widest uppercase text-gray-500">
                {productData.category}
              </p>
            )}

            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900">
              {productData.name}
            </h1>

            <p className="text-3xl font-medium text-gray-900">
              {currency} {productData.price.toLocaleString()}
            </p>

            {productData.description && (
              <p className="text-gray-600 leading-relaxed max-w-xl">
                {productData.description}
              </p>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-6">
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100"
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-100"
                >
                  <Plus size={18} />
                </button>
              </div>

              {quantity > 1 && (
                <span className="text-sm text-gray-500">
                  Total: {currency} {totalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3 max-w-md">
              <button
                onClick={() => {
                  addItems();
                  goToPage("/cart");
                }}
                className="w-full bg-black text-white py-4 text-sm font-medium hover:bg-gray-900 transition"
              >
                Buy now
              </button>

              <button
                onClick={() => {
                  addItems();
                  toast.success("Added to cart");
                }}
                className="w-full border border-black py-4 text-sm font-medium hover:bg-black hover:text-white transition"
              >
                Add to cart
              </button>

              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/923001234567`,
                    "_blank"
                  )
                }
                className="w-full border border-gray-300 py-4 text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DETAILS ================= */}
      <section className="mt-20 border-t">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-16 grid md:grid-cols-2 gap-12">
        
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex gap-3">
              <Truck size={18} /> Delivery in 3–7 business days
            </div>
            <div className="flex gap-3">
              <Globe size={18} /> Worldwide shipping
            </div>
            <div className="flex gap-3">
              <Package size={18} /> Shipping fee: {currency} {deliveryFee}
            </div>
            <div className="flex gap-3">
              <Ban size={18} /> No returns
            </div>
          </div>
        </div>
      </section>

    
    </main>
  );
};

export default ProductPage;
