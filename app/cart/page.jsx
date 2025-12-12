"use client";
import React, { useContext } from "react";
import { ShopContext } from "@/src/context/ShopContext";
import Title from "@/src/components/ui/Title";
import Totalcartvalue from "@/src/components/cart/CartTotalValue";
import { Trash as Bin, Plus, Minus } from "lucide-react";

const Cart = () => {
  const { products, currency, cartitems, updatequantity, goToPage } =
    useContext(ShopContext);

  const cartdata = React.useMemo(() => {
    const tempdata = [];
    for (const productId in cartitems) {
      const sizes = cartitems[productId];
      for (const size in sizes) {
        const quantity = sizes[size];
        if (quantity > 0) {
          tempdata.push({
            _id: productId,
            size: size,
            quantity: quantity,
          });
        }
      }
    }
    return tempdata;
  }, [cartitems]);

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity >= 1) {
      updatequantity(id, size, newQuantity);
    }
  };

  if (cartdata.length === 0) {
    return (
      <div className="border-t pt-8 sm:pt-14 px-4 sm:px-8 lg:px-32 text-center text-gray-500 min-h-[90vh]">
        <Title text1={"YOUR"} text2={"CART"} />
        <p className="mt-8 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-8 sm:pt-14 px-4 sm:px-8 lg:px-32 pb-8">
      <div className="text-2xl mt-3 mb-8">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      
      <div className="space-y-4">
        {cartdata.map((item, index) => {
          const productdata = products.find(
            (product) => product._id === item._id
          );
          if (!productdata) return null;

          const imageSrc =
            typeof productdata.image[0] === "string"
              ? productdata.image[0]
              : productdata.image[0]?.src || "";

          return (
            <div
              key={index}
              className="py-4 px-4 sm:px-0 border rounded-lg sm:rounded-none sm:border-0 sm:border-t sm:border-b text-gray-700 bg-white sm:bg-transparent"
            >
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
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="px-4 py-1 text-sm font-medium min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <Bin
                      onClick={() => updatequantity(item._id, item.size, 0)}
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
                    <p className="text-base font-medium">
                      {productdata.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {currency} {productdata.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                      className="p-1.5 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                      className="p-1.5 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </div>
                  <Bin
                    onClick={() => updatequantity(item._id, item.size, 0)}
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
            <Totalcartvalue />
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