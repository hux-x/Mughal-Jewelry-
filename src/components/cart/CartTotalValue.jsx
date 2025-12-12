import React, { useContext } from "react";
import { ShopContext } from "@/src/context/ShopContext";
import Title from "@/src/components/ui/Title";

const Totalcartvalue = () => {
  const { getcartammount, currency, deliveryFee } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"AMOUNT"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>SUBTOTAL</p>
          <p>{currency}{getcartammount()}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{deliveryFee}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>TOTAL</b>
          <p>{currency}{getcartammount() === 0 ? 0 : getcartammount() + deliveryFee}</p>
        </div>
      </div>
    </div>
  );
};

export default Totalcartvalue;
