"use client";
import React from "react";

const ReturnRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Return & Refund Policy</h1>
        <p className="text-sm text-gray-500 mb-6">Last updated: December 12, 2025</p>

        <p className="mb-4">
          At <strong>Mughal Jewelry</strong>, we take pride in the quality of our products. Please read our return and refund policy carefully before placing an order.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">No Returns After Delivery</h2>
        <p className="mb-4">
          Once the customer has received their order, we do not accept returns. Please ensure that you have reviewed your order details, including size, quantity, and shipping address, before completing your purchase.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Refunds</h2>
        <p className="mb-4">
          Refunds are only applicable in cases where the order could not be delivered due to errors on our side. In such cases, please contact us immediately at <strong>contact@mughaljewelry.store</strong> with your order details.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Cancellations</h2>
        <p className="mb-4">
          Orders can be canceled only before they have been processed for shipping. Once the order has been shipped, it cannot be canceled or returned.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about our return and refund policy, please contact us at 
          <strong> contact@mughaljewelry.store</strong> or call +92 309 6399939.
        </p>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
