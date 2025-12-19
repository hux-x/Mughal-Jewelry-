"use client";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "@/src/context/ShopContext";
import Title from "@/src/components/ui/Title";
import { CreditCard, Banknote, Lock, ChevronRight } from "lucide-react";
import productService from "@/src/api/services/productService";
import orderService from "@/src/api/services/orderService";

const Checkout = () => {
  const { currency, cartitems, updatequantity, goToPage } = useContext(ShopContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("payfast"); // 'payfast' or 'cod'
  
  // OTP state for COD
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [mPaymentId, setMPaymentId] = useState("");
  const [resendingOTP, setResendingOTP] = useState(false);

  // Fetch cart products
  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cartitems.length === 0) {
        setLoading(false);
        goToPage("/cart");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const productIds = [...new Set(cartitems.map((item) => item.productId))];
        const productPromises = productIds.map((id) =>
          productService.getProductById(id)
        );

        const responses = await Promise.all(productPromises);
        const products = responses
          .filter((res) => res.success)
          .map((res) => res.product);

        setCartProducts(products);
      } catch (err) {
        console.error("Error fetching cart products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [cartitems, goToPage]);

  // Calculate totals
  const calculateTotals = () => {
    let subtotal = 0;
    cartitems.forEach((item) => {
      const product = cartProducts.find((p) => p._id === item.productId);
      if (product) {
        subtotal += product.price * item.quantity;
      }
    });

    const deliveryFee = subtotal > 0 ? 100 : 0; // Free delivery over certain amount
    const total = subtotal + deliveryFee;

    return { subtotal, deliveryFee, total };
  };

  const { subtotal, deliveryFee, total } = calculateTotals();

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim() || formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[+]?[\d\s-()]+$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!formData.address.trim() || formData.address.length < 10) {
      errors.address = "Address must be at least 10 characters";
    }

    if (!formData.city.trim() || formData.city.length < 2) {
      errors.city = "City must be at least 2 characters";
    }

    if (formData.postalCode && !/^\d{4,10}$/.test(formData.postalCode)) {
      errors.postalCode = "Postal code must be 4-10 digits";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle order submission
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check stock availability
    const outOfStockItems = cartitems.filter((item) => {
      const product = cartProducts.find((p) => p._id === item.productId);
      return (
        product &&
        (!product.inStock || (product.stock && item.quantity > product.stock))
      );
    });

    if (outOfStockItems.length > 0) {
      setError("Some items in your cart are out of stock. Please update your cart.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Prepare order data
      const orderData = {
        products: cartitems.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode || undefined,
        },
        payment: {
          provider: paymentMethod,
        },
      };

      const response = await orderService.createOrder(orderData);

      if (response.success) {
        if (paymentMethod === "cod") {
          // Show OTP modal for COD
          setMPaymentId(response.data.payment.mPaymentId);
          setShowOTPModal(true);
        } else {
          // Redirect to PayFast
          orderService.submitPayFastPayment(
            response.payfast.data,
            response.payfast.url
          );
        }
      }
    } catch (err) {
      console.error("Order creation error:", err);
      setError(err.message || "Failed to create order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setOtpError("");

    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    setSubmitting(true);

    try {
      const response = await orderService.verifyOrderOTP(mPaymentId, otp);

      if (response.success) {
        // Clear cart and redirect to success page
        cartitems.forEach((item) => {
          updatequantity(item.productId, item.size, 0);
        });
        goToPage(`/order-success?orderId=${mPaymentId}`);
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setOtpError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    setResendingOTP(true);
    setOtpError("");

    try {
      const response = await orderService.resendOTP(mPaymentId);
      if (response.success) {
        alert("OTP resent successfully. Please check your email.");
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      setOtpError(err.message || "Failed to resend OTP");
    } finally {
      setResendingOTP(false);
    }
  };

  if (loading) {
    return (
      <div className="border-t pt-8 sm:pt-14 px-4 sm:px-8 lg:px-32 min-h-[90vh]">
        <Title text1={"CHECKOUT"} text2={""} />
        <div className="mt-16 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-gray-500 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (cartitems.length === 0) {
    return (
      <div className="border-t pt-8 sm:pt-14 px-4 sm:px-8 lg:px-32 text-center min-h-[90vh]">
        <Title text1={"CHECKOUT"} text2={""} />
        <p className="mt-8 text-lg text-gray-500">Your cart is empty.</p>
        <button
          onClick={() => goToPage("/shop")}
          className="mt-6 bg-black text-white px-8 py-3 text-sm hover:bg-gray-800"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="border-t pt-8 sm:pt-14 px-4 sm:px-8 lg:px-32 pb-16">
      <div className="text-2xl mb-8">
        <Title text1={"CHECKOUT"} text2={""} />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Customer Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                      formErrors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="+92 300 1234567"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                    formErrors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Street address, apartment, suite, etc."
                />
                {formErrors.address && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                      formErrors.city ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Lahore"
                  />
                  {formErrors.city && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                      formErrors.postalCode ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="54000"
                  />
                  {formErrors.postalCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.postalCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "payfast"
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="payfast"
                  checked={paymentMethod === "payfast"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <CreditCard className="w-5 h-5 mr-3 text-gray-600" />
                <div className="flex-1">
                  <span className="font-medium">PayFast</span>
                  <p className="text-xs text-gray-500">
                    Pay securely with credit/debit card
                  </p>
                </div>
                <Lock className="w-4 h-4 text-gray-400" />
              </label>

              <label
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-black bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <Banknote className="w-5 h-5 mr-3 text-gray-600" />
                <div className="flex-1">
                  <span className="font-medium">Cash on Delivery</span>
                  <p className="text-xs text-gray-500">
                    Pay when you receive your order (requires OTP verification)
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cartitems.map((item, index) => {
                const product = cartProducts.find((p) => p._id === item.productId);
                if (!product) return null;

                const imageSrc = Array.isArray(product.images)
                  ? typeof product.images[0] === "string"
                    ? product.images[0]
                    : product.images[0]?.src || ""
                  : product.images;

                return (
                  <div key={index} className="flex gap-3">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} • Size: {item.size}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        {currency} {(product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {currency} {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">
                  {currency} {deliveryFee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t">
                <span>Total</span>
                <span>
                  {currency} {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>Place Order</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By placing your order, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </form>

      {/* OTP Modal for COD */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Verify Your Order</h3>
            <p className="text-gray-600 text-sm mb-6">
              We&apos;ve sent a 6-digit OTP to your email address. Please enter it below
              to confirm your order.
            </p>

            {otpError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-red-600 text-sm">{otpError}</p>
              </div>
            )}

            <form onSubmit={handleVerifyOTP}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="000000"
                  maxLength="6"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={submitting || otp.length !== 6}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-3"
              >
                {submitting ? "Verifying..." : "Verify & Confirm Order"}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendingOTP}
                className="w-full text-sm text-gray-600 hover:text-black transition-colors disabled:text-gray-400"
              >
                {resendingOTP ? "Resending..." : "Resend OTP"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;