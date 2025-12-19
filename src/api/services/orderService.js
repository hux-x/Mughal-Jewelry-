// src/services/orderService.js
import axiosInstance from "@/src/api/apiClient";

const orderService = {
  /**
   * Create a new order
   * @param {Object} orderData - Order information
   * @param {Array} orderData.products - Array of products [{product: id, quantity: number}]
   * @param {Object} orderData.customer - Customer details {name, email, phone, address, city, postalCode}
   * @param {Object} orderData.payment - Payment info {provider: 'payfast' | 'cod'}
   * @returns {Promise} API response with created order
   */
  createOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post("/orders", orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Verify OTP for COD orders
   * @param {string} mPaymentId - Payment ID
   * @param {string} otp - 6-digit OTP
   * @returns {Promise} API response with verification status
   */
  verifyOrderOTP: async (mPaymentId, otp) => {
    try {
      const response = await axiosInstance.post("/orders/verify-otp", {
        mPaymentId,
        otp,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Resend OTP for COD orders
   * @param {string} mPaymentId - Payment ID
   * @returns {Promise} API response with resend status
   */
  resendOTP: async (mPaymentId) => {
    try {
      const response = await axiosInstance.post("/orders/resend-otp", {
        mPaymentId,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get all orders with filters (Admin)
   * @param {Object} filters - Filter parameters
   * @param {string} filters.status - Order status filter
   * @param {string} filters.paymentStatus - Payment status filter
   * @param {string} filters.paymentProvider - Payment provider filter ('payfast' | 'cod')
   * @param {number} filters.limit - Number of orders per page (default: 50, max: 100)
   * @param {number} filters.page - Page number (default: 1)
   * @returns {Promise} API response with orders and pagination
   */
  // getAllOrders: async (filters = {}) => {
  //   try {
  //     const params = {};

  //     if (filters.status) {
  //       params.status = filters.status;
  //     }
  //     if (filters.paymentStatus) {
  //       params.paymentStatus = filters.paymentStatus;
  //     }
  //     if (filters.paymentProvider) {
  //       params.paymentProvider = filters.paymentProvider;
  //     }
  //     if (filters.limit) {
  //       params.limit = filters.limit;
  //     }
  //     if (filters.page) {
  //       params.page = filters.page;
  //     }

  //     const response = await axiosInstance.get("/orders", { params });
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error.message;
  //   }
  // },

  /**
   * Get single order by ID
   * @param {string} id - Order ID
   * @returns {Promise} API response with order details
   */
  getOrderById: async (id) => {
    try {
      const response = await axiosInstance.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get order by payment ID
   * @param {string} mPaymentId - Payment ID (format: ORD-timestamp-code)
   * @returns {Promise} API response with order details
   */
  getOrderByPaymentId: async (mPaymentId) => {
    try {
      const response = await axiosInstance.get(`/orders/payment/${mPaymentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get orders by customer email
   * @param {string} email - Customer email address
   * @returns {Promise} API response with customer's orders
   */
  getOrdersByCustomerEmail: async (email) => {
    try {
      const response = await axiosInstance.get(`/orders/customer/${email}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // /**
  //  * Update order status (Admin)
  //  * @param {string} id - Order ID
  //  * @param {string} status - New status ('Pending' | 'Paid' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled')
  //  * @returns {Promise} API response with updated order
  //  */
  // updateOrderStatus: async (id, status) => {
  //   try {
  //     const response = await axiosInstance.put(`/orders/${id}/status`, {
  //       status,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error.message;
  //   }
  // },

  /**
  //  * Cancel an order
  //  * @param {string} id - Order ID
  //  * @returns {Promise} API response with cancellation status
  //  */
  // cancelOrder: async (id) => {
  //   try {
  //     const response = await axiosInstance.put(`/orders/${id}/cancel`);
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error.message;
  //   }
  // },

  /**
   * Delete an order (Admin)
   * @param {string} id - Order ID
   * @returns {Promise} API response with deletion status
   */
  // deleteOrder: async (id) => {
  //   try {
  //     const response = await axiosInstance.delete(`/orders/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error.message;
  //   }
  // },

  /**
   * Get order statistics (Admin)
  //  * @returns {Promise} API response with order stats
  //  */
  // getOrderStats: async () => {
  //   try {
  //     const response = await axiosInstance.get("/orders/stats");
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error.message;
  //   }
  // },

  /**
   * Track order status by payment ID (Public)
   * @param {string} mPaymentId - Payment ID
   * @returns {Promise} API response with order tracking info
   */
  trackOrder: async (mPaymentId) => {
    try {
      const response = await axiosInstance.get(`/orders/payment/${mPaymentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Submit PayFast payment form (helper method)
   * @param {Object} payfastData - PayFast form data from createOrder response
   * @param {string} payfastUrl - PayFast URL from createOrder response
   */
  submitPayFastPayment: (payfastData, payfastUrl) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = payfastUrl;

    Object.keys(payfastData).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = payfastData[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  },
};

export default orderService;