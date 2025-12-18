"use client";
import React, { useContext, useMemo } from "react";
import { ShopContext } from "@/src/context/ShopContext";
import Title from "@/src/components/ui/Title";

const Totalcartvalue = ({ cartProducts }) => {
  const { currency, deliveryFee, cartitems } = useContext(ShopContext);

  const { subtotal, total } = useMemo(() => {
    let subtotal = 0;

    cartitems.forEach((item) => {
      const product = cartProducts.find((p) => p._id === item.productId);
      if (product) {
        subtotal += product.price * item.quantity;
      }
    });

    const total = subtotal > 0 ? subtotal + deliveryFee : 0;

    return { subtotal, total };
  }, [cartitems, cartProducts, deliveryFee]);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"AMOUNT"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>SUBTOTAL</p>
          <p>
            {currency}
            {subtotal.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {deliveryFee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>TOTAL</b>
          <p>
            {currency}
            {total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Totalcartvalue;