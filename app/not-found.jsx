"use client";

import Image from "next/image";
import Link from "next/link";
import { assets } from "@/src/assets/assets";

export default function NotFound() {
  return (
    <div className="h-[88vh] flex items-center justify-center bg-white px-10">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src={assets.logo}
            alt="Brand Logo"
            width={100}
            height={100}
            priority
          />
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-block px-6 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
