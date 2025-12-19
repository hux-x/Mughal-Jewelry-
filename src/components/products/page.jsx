"use client"
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "@/src/context/ShopContext";
import {
  MessageCircle,
  Truck,
  Globe,
  Ban,
  Plus,
  Minus,
  Package,
  Wallet,
} from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import productService from "../../api/services/productService";
import Link from "next/link";



const ProductPage = ({productId}) => {
  
  const { currency, addtocart, goToPage, deliveryFee } =
    useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getProductById(productId);

        if (response.success && response.product) {
          setProductData(response.product);
          console.log(response.product);
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading product…
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  const isOutOfStock = !productData.inStock || productData.stock === 0;
  const totalPrice = productData.price * quantity;

  // Get images array safely
  const images = Array.isArray(productData.images) 
    ? productData.images 
    : [];

  // Get categories - handle both populated and non-populated cases
  const categories = Array.isArray(productData.categories)
    ? productData.categories
    : [];

  // Get first category for the breadcrumb
  const primaryCategory = categories.length > 0
    ? (typeof categories[0] === 'object' ? categories[0] : null)
    : null;

  const addItems = () => {
    for (let i = 0; i < quantity; i++) {
      addtocart(productData._id, "default");
    }
  };

  const handleWhatsAppRequest = () => {
    const message = `Hi! I'm interested in this product:

Product: ${productData.name}
Status: Out of stock

Please notify me when it's available.`;

    window.open(
      `https://wa.me/923096399939?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // New function for in-stock WhatsApp orders
  const handleWhatsAppOrder = () => {
    const message = `Hi! I want to buy this product:

Product: ${productData.name}
Price: ${currency} ${productData.price.toLocaleString()}
Quantity: ${quantity}
Total: ${currency} ${totalPrice.toLocaleString()}

I want to buy this.`;

    window.open(
      `https://wa.me/923096399939?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <main className="bg-white">
      {/* ================= HERO PRODUCT SECTION ================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-10 lg:pt-16">
        {/* Category breadcrumb */}
        {primaryCategory && (
          <Link 
            href={`/shop?category=${primaryCategory.slug}`} 
            className="text-xs tracking-widest uppercase text-gray-500 hover:text-gray-700"
          >
            {primaryCategory.name}
          </Link>
        )}

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* GALLERY */}
          <div>
            <div className="relative aspect-square bg-gray-50 max-w-md mx-auto lg:max-w-none">
              {images.length > 0 ? (
                <Image
                  src={images[selectedImage]}
                  alt={productData.name}
                  fill
                  priority
                  className="object-contain p-4 sm:p-6 lg:p-8"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}

              {isOutOfStock && (
                <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1">
                  Out of stock
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {images.map((img, i) => (
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
          <div className="space-y-6">
            <h1 className="text-2xl lg:text-5xl font-semibold text-gray-900">
              {productData.name}
            </h1>

            <p className="text-l font-medium text-gray-900">
              <b>Price:</b> {currency} {productData?.price?.toLocaleString()}
            </p>

            {/* Display all categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, index) => {
                  const categoryName = typeof cat === 'object' ? cat.name : cat;
                  const categorySlug = typeof cat === 'object' ? cat.slug : cat;
                  
                  return (
                    <Link
                      key={index}
                      href={`/shop?category=${categorySlug}`}
                      className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                    >
                      {categoryName}
                    </Link>
                  );
                })}
              </div>
            )}

            {productData.description && (
              <p className="text-gray-600 leading-relaxed max-w-xl">
                {productData.description}
              </p>
            )}

            {/* Stock indicator */}
            {!isOutOfStock && productData.stock && (
              <p className="text-sm text-gray-500">
                {productData.stock} {productData.stock === 1 ? 'item' : 'items'} in stock
              </p>
            )}

            {/* Quantity */}
            {!isOutOfStock && (
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
                    onClick={() => {
                      // Optional: Add stock limit check
                      if (!productData.stock || quantity < productData.stock) {
                        setQuantity(quantity + 1);
                      } else {
                        toast.warning('Maximum stock reached');
                      }
                    }}
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
            )}

            {/* CTAs */}
            <div className="space-y-3 max-w-md">
              {!isOutOfStock ? (
                <>
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
                    onClick={handleWhatsAppOrder}
                    className="w-full border border-gray-300 py-4 text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Order via WhatsApp
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleWhatsAppRequest}
                    className="w-full bg-green-600 text-white py-4 text-sm font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Request on WhatsApp
                  </button>

                  <p className="text-xs text-gray-500">
                    This item is currently out of stock. Contact us on WhatsApp
                    and we&apos;ll notify you as soon as it&apos;s available again.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= DETAILS ================= */}
      <section className="mt-16 border-t">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-14 grid md:grid-cols-2 gap-10">
          <div className="space-y-3 text-sm text-gray-600">
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
              <Wallet size={18} /> Cash on Delivery available
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