"use client";

import React from "react";
import {
  Phone,
  MessageCircle,
  Instagram,
  Mail,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="h-[90vh] bg-white flex items-center justify-center px-4">
      <section className="max-w-xl w-full text-center space-y-10">
        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold text-gray-900">
            Contact Us
          </h1>
          <p className="text-gray-600">
            We’d love to hear from you. Reach out using any of the options below.
          </p>
        </div>

        {/* Contact Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {/* Phone */}
          <a
            href="tel:+923001234567"
            className="group flex flex-col items-center justify-center border border-gray-200 rounded-xl p-6 hover:border-black transition"
          >
            <Phone className="w-7 h-7 text-gray-700 group-hover:text-black transition" />
            <span className="mt-3 text-sm text-gray-600 group-hover:text-black">
              Call
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center border border-gray-200 rounded-xl p-6 hover:border-green-600 transition"
          >
            <MessageCircle className="w-7 h-7 text-green-600" />
            <span className="mt-3 text-sm text-gray-600">
              WhatsApp
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/yourbrand"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center border border-gray-200 rounded-xl p-6 hover:border-pink-600 transition"
          >
            <Instagram className="w-7 h-7 text-pink-600" />
            <span className="mt-3 text-sm text-gray-600">
              Instagram
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:hello@yourbrand.com"
            className="group flex flex-col items-center justify-center border border-gray-200 rounded-xl p-6 hover:border-black transition"
          >
            <Mail className="w-7 h-7 text-gray-700 group-hover:text-black transition" />
            <span className="mt-3 text-sm text-gray-600 group-hover:text-black">
              Email
            </span>
          </a>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500">
          We usually respond within 24 hours.
        </p>
      </section>
    </main>
  );
}
