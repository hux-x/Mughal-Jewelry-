// src/services/productService.js
import axiosInstance from "@/src/api/apiClient";

const productService = {
  /**
   * Get latest products
   * @param {number} limit - Number of products to fetch (default: 12)
   * @returns {Promise} API response with products
   */
  getLatestProducts: async (limit = 12) => {
    try {
      const response = await axiosInstance.get("/products/latest", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get filtered products with pagination
   * @param {Object} filters - Filter parameters
   * @param {string} filters.search - Search query for name/description
   * @param {string|string[]} filters.category - Single category or array of categories
   * @param {number} filters.minPrice - Minimum price
   * @param {number} filters.maxPrice - Maximum price
   * @param {string} filters.sortBy - Sort option: "latest", "high to low", "low to high"
   * @param {number} filters.page - Page number (default: 1)
   * @returns {Promise} API response with filtered products and pagination
   */
  getFilteredProducts: async (filters = {}) => {
    try {
      const params = {};

      // Add search if provided
      if (filters.search) {
        params.search = filters.search;
      }

      // Add category if provided (handle array or string)
      if (filters.category) {
        params.category = Array.isArray(filters.category)
          ? filters.category.join(",")
          : filters.category;
      }

      // Add price range if provided
      if (filters.minPrice !== null && filters.minPrice !== undefined) {
        params.minPrice = filters.minPrice;
      }
      if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
        params.maxPrice = filters.maxPrice;
      }

      // Add sort option if provided
      if (filters.sortBy) {
        params.sortBy = filters.sortBy;
      }

      // Add page number
      if (filters.page) {
        params.page = filters.page;
      }

      const response = await axiosInstance.get("/products/filter", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get single product by ID
   * @param {string} id - Product ID
   * @returns {Promise} API response with product details
   */
  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Add a new product (Admin only)
   * @param {Object} productData - Product information
   * @param {string} productData.name - Product name
   * @param {string} productData.description - Product description
   * @param {number} productData.price - Product price
   * @param {string|string[]} productData.image - Image URL(s)
   * @param {string} productData.category - Product category
   * @param {number} productData.stock - Stock quantity
   * @param {boolean} productData.inStock - Stock availability
   * @returns {Promise} API response with created product
   */
  addProduct: async (productData) => {
    try {
      const response = await axiosInstance.post("/products", productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update a product (Admin only)
   * @param {string} id - Product ID
   * @param {Object} updates - Fields to update
   * @returns {Promise} API response with updated product
   */
  updateProduct: async (id, updates) => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, updates);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Delete a product (Admin only)
   * @param {string} id - Product ID
   * @returns {Promise} API response with deleted product
   */
  deleteProduct: async (id) => {
    try {
      const response = await axiosInstance.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Search products by query
   * @param {string} query - Search query
   * @param {number} page - Page number
   * @returns {Promise} API response with search results
   */
  searchProducts: async (query, page = 1) => {
    try {
      const response = await axiosInstance.get("/products/filter", {
        params: { search: query, page },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get products by category
   * @param {string|string[]} categories - Category or array of categories
   * @param {number} page - Page number
   * @returns {Promise} API response with products
   */
  getProductsByCategory: async (categories, page = 1) => {
    try {
      const category = Array.isArray(categories)
        ? categories.join(",")
        : categories;
      
      const response = await axiosInstance.get("/products/filter", {
        params: { category, page },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Get products within price range
   * @param {number} minPrice - Minimum price
   * @param {number} maxPrice - Maximum price
   * @param {number} page - Page number
   * @returns {Promise} API response with products
   */
  getProductsByPriceRange: async (minPrice, maxPrice, page = 1) => {
    try {
      const response = await axiosInstance.get("/products/filter", {
        params: { minPrice, maxPrice, page },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getCategories:async()=>{
     try {      
      const response = await axiosInstance.get("/category/");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }  
  },
  getAllProducts:async()=>{
    try{
      const response = await axiosInstance.get("/products/all");
      return response.data;
    }catch(error){
      throw error.response?.data || error.message;
    }
  }
};

export default productService;