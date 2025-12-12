"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/src/assets/assets";
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-16 lg:px-24">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0">
        
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <Image src={assets.logo} alt="Logo" width={140} height={50} className="object-contain" />
          <p className="text-sm md:text-base max-w-xs">
            Discover exquisite jewelry collections crafted to perfection. 
            Add elegance to every moment with Mughal Jewelry.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition"><FaPinterestP /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            <a href="https://wa.me/923096399939" target="_blank" className="hover:text-green-500 transition">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row gap-10">
          {/* Shop */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-white">Shop</h3>
            <a href="/shop/collection/ear-rings" className="hover:text-white transition">Ear Rings</a>
            <a href="/shop/collection/necklaces" className="hover:text-white transition">Necklaces</a>
            <a href="/shop/collection/bridal-sets" className="hover:text-white transition">Bridal Sets</a>
            <a href="/collections" className="hover:text-white transition">All Collections</a>
          </div>

          {/* Policies & Terms */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-white">Policies</h3>
            <a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/return-refund-policy" className="hover:text-white transition">Return/Refund Policy</a>
            <a href="/shipping-service-policy" className="hover:text-white transition">Shipping/Service Policy</a>
            <a href="/terms-and-conditions" className="hover:text-white transition">Terms & Conditions</a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white">Contact</h3>
          <p>Email: contact@mughaljewelry.store</p>
          <p>Phone: +92 309 6399939</p>
          <p>Address: DHA, Karachi, Pakistan</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm md:text-base">
        &copy; {new Date().getFullYear()} Mughal Jewelry. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
