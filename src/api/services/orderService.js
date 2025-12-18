// src/services/orderService.js
import axiosInstance from "@/src/api/apiClient";

const orderService = {
  /**
   * Create a new order
   * @param {Object} orderData - Order information
   * @param {Array} orderData.products - Array of products [{product: "id", quantity: number}]
   * @param {Object} orderData.customer - Customer information
   * @param {string} orderData.customer.name - Customer name
   * @param {string} orderData.customer.email - Customer email
   * @param {string} orderData.customer.phone - Customer phone
   * @param {string} orderData.customer.address - Customer address
   * @param {string} orderData.customer.city - Customer city
   * @param {number} orderData.customer.postalCode - Postal code
   * @param {Object} orderData.payment - Payment information
   * @param {string} orderData.payment.provider - Payment provider ("payfast" or "cod")
   * @returns {Promise} API response with order details and PayFast data if applicable
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
   * Get all orders with optional filters
   * @param {Object} filters - Filter parameters
   * @param {string} filters.status - Order status filter
   * @param {string} filters.paymentStatus - Payment status filter
   * @param {string} filters.paymentProvider - Payment provider filter ("payfast" or "cod")
   * @param {number} filters.limit - Number of orders per page (default: 50)
   * @param {number} filters.page - Page number (default: 1)
   * @returns {Promise} API response with orders and pagination
   */
  getAllOrders: async (filters = {}) => {
    try {
      const params = {};

      if (filters.status) {
        params.status = filters.status;
      }

      if (filters.paymentStatus) {
        params.paymentStatus = filters.paymentStatus;
      }

      if (filters.paymentProvider) {
        params.paymentProvider = filters.paymentProvider;
      }

      if (filters.limit) {
        params.limit = filters.limit;
      }

      if (filters.page) {
        params.page = filters.page;
      }

      const response = await axiosInstance.get("/orders", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

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
   * Get order by payment ID (for tracking)
   * @param {string} mPaymentId - Merchant payment ID
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

  /**
   * Update order status (Admin only)
   * @param {string} id - Order ID
   * @param {string} status - New status ("Pending", "Paid", "Processing", "Shipped", "Delivered", "Cancelled")
   * @returns {Promise} API response with updated order
   */
  updateOrderStatus: async (id, status) => {
    try {
      const response = await axiosInstance.put(`/orders/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Cancel an order
   * @param {string} id - Order ID
   * @returns {Promise} API response with cancelled order
   */
  cancelOrder: async (id) => {
    try {
      const response = await axiosInstance.put(`/orders/${id}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Delete an order (Admin only)
   * @param {string} id - Order ID
   * @returns {Promise} API response
   */
  deleteOrder: async (id) => {
    try {
      const response = await axiosInstance.delete(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get order statistics (Admin only)
   * @returns {Promise} API response with order stats
   */
  getOrderStats: async () => {
    try {
      const response = await axiosInstance.get("/orders/stats");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Create PayFast order and redirect to payment gateway
   * @param {Object} orderData - Order information
   * @returns {Promise} Redirects to PayFast payment page
   */
  createPayFastOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post("/orders", {
        ...orderData,
        payment: { provider: "payfast" },
      });

      if (response.data.success && response.data.payfast) {
        // Create form and submit to PayFast
        const form = document.createElement("form");
        form.method = "POST";
        form.action = response.data.payfast.url;

        Object.keys(response.data.payfast.data).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = response.data.payfast.data[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Create Cash on Delivery order
   * @param {Object} orderData - Order information
   * @returns {Promise} API response with order details
   */
  createCODOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post("/orders", {
        ...orderData,
        payment: { provider: "cod" },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Track order status by payment ID
   * @param {string} mPaymentId - Merchant payment ID
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
   * Get orders by status
   * @param {string} status - Order status to filter
   * @param {number} page - Page number
   * @returns {Promise} API response with filtered orders
   */
  getOrdersByStatus: async (status, page = 1) => {
    try {
      const response = await axiosInstance.get("/orders", {
        params: { status, page },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get orders by payment status
   * @param {string} paymentStatus - Payment status to filter ("pending", "complete", "failed", "cancelled")
   * @param {number} page - Page number
   * @returns {Promise} API response with filtered orders
   */
  getOrdersByPaymentStatus: async (paymentStatus, page = 1) => {
    try {
      const response = await axiosInstance.get("/orders", {
        params: { paymentStatus, page },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get orders by payment provider
   * @param {string} provider - Payment provider ("payfast" or "cod")
   * @param {number} page - Page number
   * @returns {Promise} API response with filtered orders
   */
  getOrdersByPaymentProvider: async (provider, page = 1) => {
    try {
      const response = await axiosInstance.get("/orders", {
        params: { paymentProvider: provider, page },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default orderService;