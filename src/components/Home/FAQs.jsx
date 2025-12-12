"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "What is the return policy?",
    answer:
      "You can not return an item after you've received it",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Shipping charges and delivery times vary depending on the destination.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email to monitor your delivery.",
  },
  {
    question: "Are your products authentic?",
    answer:
      "All our jewelry pieces are made from genuine materials and crafted with high quality standards.",
  },
  {
    question: "Can I customize a jewelry piece?",
    answer:
      "Yes, we offer customization options for select items. Please contact our support team for details.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-16 px-4 md:px-12 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-gray-600 mt-2">
          Here are some common questions our customers ask.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center font-medium text-gray-800 hover:bg-gray-50 transition"
            >
              <span>{faq.question}</span>
              <span className="ml-4 text-gray-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 text-gray-600 border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
