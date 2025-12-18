"use client";
import React, { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";

const ProductFilters = ({
  filters,
  onFiltersChange,
  isOpen,
  onClose,
  categories = [],
  categoriesLoading = false,
}) => {
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || "",
    max: filters.maxPrice || ""
  });

  const handleCategoryToggle = (categorySlug) => {
    const currentCategories = filters.category || [];
    const newCategories = currentCategories.includes(categorySlug)
      ? currentCategories.filter((c) => c !== categorySlug)
      : [...currentCategories, categorySlug];
    
    onFiltersChange({ ...filters, category: newCategories });
  };

  const handleSortChange = (sort) => {
    onFiltersChange({ ...filters, sortBy: sort });
  };

  const handlePriceChange = (field, value) => {
    setPriceRange(prev => ({ ...prev, [field]: value }));
  };

  const applyPriceFilter = () => {
    onFiltersChange({
      ...filters,
      minPrice: priceRange.min ? parseFloat(priceRange.min) : null,
      maxPrice: priceRange.max ? parseFloat(priceRange.max) : null
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: [],
      sortBy: "latest",
      minPrice: null,
      maxPrice: null
    });
    setPriceRange({ min: "", max: "" });
  };

  const hasActiveFilters = 
    (filters.category && filters.category.length > 0) ||
    filters.minPrice !== null ||
    filters.maxPrice !== null;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Filters Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto
          w-[280px] lg:w-auto lg:min-w-[240px]
          bg-white z-50 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          overflow-y-auto lg:overflow-visible
          border-r lg:border lg:rounded-lg
          shadow-xl lg:shadow-none
        `}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close filters"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Categories Section */}
          <div className="mb-6">
            <h4 className="font-medium text-sm text-gray-900 mb-3 uppercase tracking-wide">
              Categories
            </h4>
            
            {categoriesLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : categories.length > 0 ? (
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat._id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.category?.includes(cat.slug) || false}
                      onChange={() => handleCategoryToggle(cat.slug)}
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No categories available</p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t my-6" />

          {/* Price Range Section */}
          <div className="mb-6">
            <h4 className="font-medium text-sm text-gray-900 mb-3 uppercase tracking-wide">
              Price Range
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Min Price</label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange("min", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  min="0"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Max Price</label>
                <input
                  type="number"
                  placeholder="10000"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange("max", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  min="0"
                />
              </div>
              <button
                onClick={applyPriceFilter}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg transition-colors"
              >
                Apply Price Filter
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t my-6" />

          {/* Sort Section */}
          <div>
            <h4 className="font-medium text-sm text-gray-900 mb-3 uppercase tracking-wide">
              Sort By
            </h4>
            <select
              value={filters.sortBy || "latest"}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer bg-white hover:border-gray-400 transition-colors"
            >
              <option value="latest">Latest First</option>
              <option value="high to low">Price: High to Low</option>
              <option value="low to high">Price: Low to High</option>
            </select>
          </div>

          {/* Clear All Button */}
          <button
            onClick={clearAllFilters}
            className="w-full mt-6 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;