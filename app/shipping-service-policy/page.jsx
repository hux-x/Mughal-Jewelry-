"use client";
import React from "react";

const ShippingServicePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Shipping & Service Policy</h1>
        <p className="text-sm text-gray-500 mb-6">Last updated: December 12, 2025</p>

        <p className="mb-4">
          At <strong>Mughal Jewelry</strong>, we strive to deliver your orders safely and on time. Please read our shipping and service policy carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Delivery Charges</h2>
        <p className="mb-4">
          Customers are responsible for paying the delivery charges. The total shipping cost will be calculated and displayed at checkout before you place your order.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Delivery Time</h2>
        <p className="mb-4">
          Shipping within Pakistan typically takes between <strong>3 to 7 business days</strong>. Delivery times may vary depending on the city, local holidays, or unforeseen delays. We appreciate your patience.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Worldwide Shipping</h2>
        <p className="mb-4">
          We also offer worldwide shipping. Delivery times for international orders may vary depending on the destination country and customs processing.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Order Tracking</h2>
        <p className="mb-4">
          Once your order has been shipped, you will receive a tracking number via email or WhatsApp (if provided). You can use this tracking number to check the status of your shipment.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns regarding shipping or delivery, please contact us at 
          <strong> contact@mughaljewelry.store</strong> or call +92 309 6399939.
        </p>
      </div>
    </div>
  );
};

export default ShippingServicePolicy;
