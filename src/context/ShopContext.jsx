"use client";

import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "PKR";
  const deliveryFee = 250;
  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(false);

  const router = useRouter();

  // Load cart from localStorage - just store cart items array
  const [cartitems, setcartitem] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cartitems");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // Persist cart in localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartitems", JSON.stringify(cartitems));
    }
  }, [cartitems]);

  const goToPage = (path) => {
    router.push(path);
  };

  const addtocart = async (itemid, size) => {
    if (!size) {
      toast.error("Please select a size!");
      return;
    }

    // Check if item with same id and size already exists
    const existingItemIndex = cartitems.findIndex(
      (item) => item.productId === itemid && item.size === size
    );

    let updatedCart;

    if (existingItemIndex !== -1) {
      // Item exists, increment quantity
      updatedCart = [...cartitems];
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      // New item, add to cart
      updatedCart = [
        ...cartitems,
        {
          productId: itemid,
          size: size,
          quantity: 1,
        },
      ];
    }

    setcartitem(updatedCart);
    toast.success("Item added to cart!");
  };

  const updatequantity = async (itemid, size, quantity) => {
    if (quantity === 0) {
      // Remove item from cart
      const updatedCart = cartitems.filter(
        (item) => !(item.productId === itemid && item.size === size)
      );
      setcartitem(updatedCart);
      toast.info("Item removed from cart");
    } else {
      // Update quantity
      const updatedCart = cartitems.map((item) =>
        item.productId === itemid && item.size === size
          ? { ...item, quantity }
          : item
      );
      setcartitem(updatedCart);
    }
  };

  const getcartcount = () => {
    return cartitems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearcart = () => {
    setcartitem([]);
    localStorage.removeItem("cartitems");
    toast.info("Cart cleared");
  };

  const value = {
    currency,
    deliveryFee,
    search,
    setsearch,
    showsearch,
    setshowsearch,
    cartitems,
    addtocart,
    getcartcount,
    updatequantity,
    goToPage,
    clearcart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;