"use client";

import React, { createContext, useEffect, useState } from "react";
import { products as initialProducts } from "@/src/assets/assets";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "PKR";
  const deliveryFee = 250;
  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(false);

  const router = useRouter();

  // Load cart from localStorage or initialize empty
  const [cartitems, setcartitem] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cartitems");
      return storedCart ? JSON.parse(storedCart) : {};
    }
    return {};
  });

  // Persist cart in localStorage
  useEffect(() => {
    localStorage.setItem("cartitems", JSON.stringify(cartitems));
  }, [cartitems]);

  const goToPage = (path) => {
    router.push(path);
  };

  const addtocart = async (itemid, size) => {
    if (!size) {
      toast.error("Please select a size!");
      return;
    }

    let cartdata = structuredClone(cartitems);

    if (cartdata[itemid]) {
      if (cartdata[itemid][size]) {
        cartdata[itemid][size] += 1;
      } else {
        cartdata[itemid][size] = 1;
      }
    } else {
      cartdata[itemid] = { [size]: 1 };
    }

    setcartitem(cartdata);
  };

  const updatequantity = async (itemid, size, quantity) => {
    let cartdata = structuredClone(cartitems);
    if (quantity === 0) {
      delete cartdata[itemid][size];
      if (Object.keys(cartdata[itemid]).length === 0) {
        delete cartdata[itemid];
      }
    } else {
      cartdata[itemid][size] = quantity;
    }
    setcartitem(cartdata);
  };

  const getcartcount = () => {
    let totalcount = 0;
    for (const itemid in cartitems) {
      for (const size in cartitems[itemid]) {
        totalcount += cartitems[itemid][size];
      }
    }
    return totalcount;
  };

  const getcartammount = () => {
    let totalamount = 0;
    for (const itemid in cartitems) {
      let iteminfo = initialProducts.find((product) => product._id === itemid);
      if (!iteminfo) continue;
      for (const size in cartitems[itemid]) {
        totalamount += iteminfo.price * cartitems[itemid][size];
      }
    }
    return totalamount;
  };

  const value = {
    products: initialProducts,
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
    getcartammount,
    goToPage,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
