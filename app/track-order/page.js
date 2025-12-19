"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, CheckCircle, Clock, Truck, MapPin, CreditCard, Phone, Mail, Search } from 'lucide-react'
import orderService from '../../src/api/services/orderService'

export default function OrderTrackingPage() {
  const [order, setOrder] = useState(null)
  const [orderId, setOrderId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchOrder = async (paymentId) => {
    setLoading(true)
    setError("")
    
    try {
      const res = await orderService.getOrderByPaymentId(paymentId)
      
      if (res.success) {
        setOrder(res.data)
      } else {
        setError("Order not found. Please check your order ID.")
      }
    } catch (err) {
      setError("Failed to fetch order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const orderIdParam = params.get('orderId')
      
      if (orderIdParam) {
        setOrderId(orderIdParam)
        fetchOrder(orderIdParam)
      }
    }
  }, [])

  const handleTrackOrder = (e) => {
    e.preventDefault()
    if (orderId.trim()) {
      fetchOrder(orderId.trim())
    }
  }

  const getStatusSteps = (status) => {
    const steps = [
      { label: 'Order Confirmed', status: 'confirmed', icon: CheckCircle },
      { label: 'Processing', status: 'processing', icon: Package },
      { label: 'Shipped', status: 'shipped', icon: Truck },
      { label: 'Delivered', status: 'delivered', icon: CheckCircle }
    ]

    const statusOrder = ['confirmed', 'processing', 'shipped', 'delivered']
    const currentIndex = statusOrder.indexOf(status)

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-gray-600 text-lg">
            Enter your order ID to view your order details and tracking information
          </p>
        </motion.div>

        {/* Search Box */}
        {!order && (
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div>
                <label htmlFor="orderId" className="block text-sm font-semibold text-gray-700 mb-2">
                  Order ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter your order ID (e.g., ORD-1766147423691-RRQLMXSD8)"
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    disabled={loading}
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading || !orderId.trim()}
                className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Tracking...' : 'Track Order'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Order Details */}
        {order && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Order Status Timeline */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Status</h2>
              
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                
                {getStatusSteps(order.status).map((step, index) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={step.status}
                      className="relative flex items-start mb-8 last:mb-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                        step.completed ? 'bg-gray-900' : 'bg-gray-200'
                      }`}>
                        <Icon className={`w-6 h-6 ${step.completed ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <div className="ml-6 flex-1">
                        <h3 className={`text-lg font-semibold ${
                          step.completed ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </h3>
                        {step.active && (
                          <p className="text-sm text-gray-600 mt-1">
                            Updated {formatDate(order.updatedAt)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Order Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Details</h2>
                  <p className="text-gray-600">Order ID: {order.payment.mPaymentId}</p>
                  <p className="text-sm text-gray-500 mt-1">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              {/* Products */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Ordered</h3>
                <div className="space-y-4">
                  {order.products.map((item) => (
                    <div key={item._id} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">{formatPrice(item.price)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span>{formatPrice(order.totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Delivery & Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-gray-900 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">Delivery Address</h3>
                </div>
                <div className="text-gray-700 space-y-2">
                  <p className="font-semibold">{order.customer.name}</p>
                  <p className="whitespace-pre-line">{order.customer.address}</p>
                  <p>{order.customer.city}, {order.customer.postalCode}</p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-6 h-6 text-gray-900 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">Payment</h3>
                </div>
                <div className="text-gray-700 space-y-2">
                  <p className="flex justify-between">
                    <span>Method:</span>
                    <span className="font-semibold uppercase">{order.payment.provider}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Status:</span>
                    <span className={`font-semibold ${
                      order.payment.status === 'pending' ? 'text-yellow-600' :
                      order.payment.status === 'completed' ? 'text-green-600' :
                      'text-gray-600'
                    }`}>
                      {order.payment.status.charAt(0).toUpperCase() + order.payment.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Track Another Order */}
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  setOrder(null)
                  setOrderId("")
                  setError("")
                }}
                className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
              >
                ← Track Another Order
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}