"use client";
import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "@/src/context/ShopContext";
import { useParams } from "next/navigation";
import { ShoppingCart, MessageCircle, Truck, Globe, Ban, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

const ProductPage = () => {
  const { productId } = useParams();
  const { products, currency, addtocart, goToPage, deliveryFee } = useContext(ShopContext);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const productData = React.useMemo(
    () => products.find((item) => item._id === productId),
    [productId, products]
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addtocart(productData._id, selectedSize);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addtocart(productData._id, selectedSize);
    }
    goToPage("/cart");
  };

  const handleWhatsAppOrder = () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    const message = `Hi! I want to order:
    
Product: ${productData.name}
Size: ${selectedSize}
Quantity: ${quantity}
Price: ${currency} ${productData.price * quantity}

Please confirm availability.`;

    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 sm:p-8">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={productData.image[selectedImage]}
                  alt={productData.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {productData.image.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {productData.image.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? "border-black" : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${productData.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{productData.name}</h1>
                <p className="text-3xl font-bold text-gray-900 mt-4">
                  {currency} {productData.price}
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed">{productData.description}</p>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">SELECT SIZE</h3>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 border-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">QUANTITY</h3>
                <div className="flex items-center border rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-2 font-medium min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  BUY NOW
                </button>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-white text-black border-2 border-black py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  ADD TO CART
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  ORDER ON WHATSAPP
                </button>
              </div>

              {/* Shipping Info */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold text-gray-900">SHIPPING INFORMATION</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Delivery Time</p>
                      <p className="text-sm text-gray-600">3-7 business days</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">International Shipping</p>
                      <p className="text-sm text-gray-600">Available worldwide</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Shipping Charges</p>
                      <p className="text-sm text-gray-600">{currency} {deliveryFee} (Domestic)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Ban className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Returns & Refunds</p>
                      <p className="text-sm text-gray-600">Not available for hygiene reasons</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;