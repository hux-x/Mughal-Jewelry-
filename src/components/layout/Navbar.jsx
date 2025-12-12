"use client";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShopContext } from "@/src/context/ShopContext"; 
import { assets } from "@/src/assets/assets";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const { setshowsearch, getcartcount } = useContext(ShopContext);

  const toggleMenu = () => setVisible(!visible);
  const handleMenuItemClick = () => setVisible(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (visible && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-toggle')) {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [visible]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [visible]);

  const links = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collection" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="relative flex items-center justify-between py-5 px-4 sm:px-6 lg:px-8 font-medium bg-white z-50">
        <Link href="/">
          <Image src={assets.logo} alt="Logo" className="w-8 sm:w-15" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden sm:flex gap-8 text-sm text-gray-700">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <li className="flex flex-col items-center gap-1 group cursor-pointer">
                <p className={`transition-colors ${pathname === link.href ? "text-black font-semibold" : "hover:text-black"}`}>
                  {link.name}
                </p>
                <hr
                  className={`w-2/4 h-[1.5px] border-none bg-gray-700 transition-all ${
                    pathname === link.href ? "block" : "hidden group-hover:block"
                  }`}
                />
              </li>
            </Link>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Image
            onClick={() => setshowsearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer hover:opacity-70 transition-opacity"
            alt="Search"
          />

          {/* Cart */}
          <Link href="/cart" className="relative group">
            <Image 
              className="w-5 min-w-5 group-hover:opacity-70 transition-opacity" 
              src={assets.cart_icon} 
              alt="Cart" 
            />
            {getcartcount() > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1 text-xs text-white bg-black rounded-full">
                {getcartcount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu Icon */}
          <Image
            onClick={toggleMenu}
            src={assets.menu_icon}
            className="w-5 sm:hidden cursor-pointer hover:opacity-70 transition-opacity menu-toggle"
            alt="Menu"
          />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {visible && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 sm:hidden transition-opacity"
          onClick={() => setVisible(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-4 border-b">
            <button
              onClick={() => setVisible(false)}
              className="text-gray-600 hover:text-black transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <ul className="flex flex-col py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleMenuItemClick}
              >
                <li
                  className={`px-6 py-4 text-base border-b border-gray-100 transition-colors ${
                    pathname === link.href
                      ? "text-black font-semibold bg-gray-50"
                      : "text-gray-700 hover:bg-gray-50 hover:text-black"
                  }`}
                >
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;