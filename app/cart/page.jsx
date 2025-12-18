"use client";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "@/src/context/ShopContext";
import Title from "@/src/components/ui/Title";
import Totalcartvalue from "@/src/components/cart/CartTotalValue";
import { Trash as Bin, Plus, Minus } from "lucide-react";
import productService from "@/src/api/services/productService";

const Cart = () => {
  const { currency, cartitems, updatequantity, goToPage } = useContext(ShopContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details for all cart items
  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cartitems.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get unique product IDs
        const productIds = [...new Set(cartitems.map((item) => item.productId))];

        // Fetch all products (you might want to create a specific endpoint for this)
        // For now, we'll fetch products individually or use a batch fetch if available
        const productPromises = productIds.map((id) =>
          productService.getProductById(id)
        );

        const responses = await Promise.all(productPromises);
        const products = responses
          .filter((res) => res.success)
          .map((res) => res.product);

        setCartProducts(products);
      } catch (err) {
        console.error("Error fetching cart products:", err);
        setError("Failed to load cart products");
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [cartitems]);

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity >= 1) {
      updatequantity(productId, size, newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="border-t pt-8 sm:pt-14 px-4 sm:px-8 lg:px-32 text-center min-h-[90vh]">
        <Title text1={"YOUR"} text2={"CART"} />
        <div className="mt-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-gray-500 mt-4">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t pt-8 sm:pt-14 px-4 sm:px-8 lg:px-32 text-center min-h-[90vh]">
        <Title text1={"YOUR"} text2={"CART"} />
        <div className="mt-16">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (cartitems.length === 0) {
    return (
      <div className="border-t pt-8 sm:pt-14 px-4 sm:px-8 lg:px-32 text-center text-gray-500 min-h-[90vh]">
        <Title text1={"YOUR"} text2={"CART"} />
        <p className="mt-8 text-lg">Your cart is empty.</p>
        <button
          onClick={() => goToPage("/shop")}
          className="mt-6 bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-colors"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="border-t pt-8 sm:pt-14 px-4 sm:px-8 lg:px-32 pb-8">
      <div className="text-2xl mt-3 mb-8">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="space-y-4">
        {cartitems.map((item, index) => {
          const productdata = cartProducts.find(
            (product) => product._id === item.productId
          );

          if (!productdata) {
            return (
              <div
                key={index}
                className="py-4 px-4 border rounded-lg bg-red-50"
              >
                <p className="text-red-600 text-sm">
                  Product no longer available
                </p>
                <button
                  onClick={() => updatequantity(item.productId, item.size, 0)}
                  className="text-red-600 text-xs underline mt-2"
                >
                  Remove from cart
                </button>
              </div>
            );
          }

          const imageSrc = Array.isArray(productdata.images)
            ? typeof productdata.images[0] === "string"
              ? productdata.images[0]
              : productdata.images[0]?.src || ""
            : productdata.images;

          // Check stock availability
          const isOutOfStock =
            !productdata.inStock ||
            (productdata.stock && item.quantity > productdata.stock);

          return (
            <div
              key={index}
              className={`py-4 px-4 sm:px-0 border rounded-lg sm:rounded-none sm:border-0 sm:border-t sm:border-b text-gray-700 bg-white sm:bg-transparent ${
                isOutOfStock ? "opacity-60" : ""
              }`}
            >
              {isOutOfStock && (
                <div className="mb-2 text-red-600 text-xs font-medium">
                  {!productdata.inStock
                    ? "Out of stock"
                    : `Only ${productdata.stock} available`}
                </div>
              )}

              {/* Mobile Layout */}
              <div className="flex gap-4 sm:hidden">
                <img
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  src={imageSrc}
                  alt={productdata.name}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {productdata.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {currency} {productdata.price}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Size: {item.size}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded overflow-hidden">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="px-4 py-1 text-sm font-medium min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                        disabled={
                          productdata.stock && item.quantity >= productdata.stock
                        }
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <Bin
                      onClick={() => updatequantity(item.productId, item.size, 0)}
                      className="w-5 h-5 cursor-pointer text-gray-600 hover:text-red-500 flex-shrink-0 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Desktop/Tablet Layout */}
              <div className="hidden sm:flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <img
                    className="w-16 h-16 rounded-lg object-cover"
                    src={imageSrc}
                    alt={productdata.name}
                  />
                  <div className="flex-1">
                    <p className="text-base font-medium">{productdata.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {currency} {productdata.price} • Size: {item.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded overflow-hidden">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.productId,
                          item.size,
                          item.quantity - 1
                        )
                      }
                      className="p-1.5 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.productId,
                          item.size,
                          item.quantity + 1
                        )
                      }
                      className="p-1.5 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                      disabled={
                        productdata.stock && item.quantity >= productdata.stock
                      }
                    >
                      <Plus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </div>
                  <Bin
                    onClick={() => updatequantity(item.productId, item.size, 0)}
                    className="w-4.5 h-4.5 cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary Section */}
      <div className="mt-8 sm:mt-20">
        <div className="sm:flex sm:justify-end sm:gap-8">
          <div className="w-full sm:w-[450px] mb-6 sm:mb-0">
            <Totalcartvalue cartProducts={cartProducts} />
          </div>
        </div>
        <div className="w-full sm:text-end mt-6 sm:mt-0">
          <button
            onClick={() => goToPage("/placeholder")}
            className="w-full sm:w-auto bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-colors"
          >
            PROCEED TO ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;