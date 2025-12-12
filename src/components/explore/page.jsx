"use client";
import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "@/src/context/ShopContext";
import Productitem from "@/src/components/ui/ProductItem";
import ProductFilters from "@/src/components/explore/filters";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

const Explore = () => {
  const { products } = useContext(ShopContext);
  const query = useSearchParams();

  // Initialize filters from URL params
  const initialFilters = {
    category: query.get("category") ? query.get("category").split(",") : [],
    search: query.get("search") || null,
    sortBy: query.get("sortBy") || "latest",
    minPrice: query.get("minPrice") ? parseFloat(query.get("minPrice")) : null,
    maxPrice: query.get("maxPrice") ? parseFloat(query.get("maxPrice")) : null,
  };

  const [filters, setFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(parseInt(query.get("page")) || 1);
  const [productsPerPage] = useState(12);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    // This will be used later to fetch products from the server
    // or update URL params
  }, [filters]);

  // Compute filtered and sorted products
  const filteredProducts = React.useMemo(() => {
    if (!products) return [];

    let tempProducts = products.slice();

    // Filter by category
    if (filters.category && filters.category.length > 0) {
      tempProducts = tempProducts.filter((p) =>
        filters.category.includes(p.category)
      );
    }

    // Filter by price range
    if (filters.minPrice !== null) {
      tempProducts = tempProducts.filter((p) => p.price >= filters.minPrice);
    }
    if (filters.maxPrice !== null) {
      tempProducts = tempProducts.filter((p) => p.price <= filters.maxPrice);
    }

    // Sorting
    if (filters.sortBy === "high to low") {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "low to high") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else {
      tempProducts.reverse(); // latest first
    }

    return tempProducts;
  }, [products, filters]);

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const paginatedProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Generate pagination range
  const getPaginationRange = () => {
    const range = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) range.push(i);
        range.push("...");
        range.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        range.push(1);
        range.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) range.push(i);
      } else {
        range.push(1);
        range.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) range.push(i);
        range.push("...");
        range.push(totalPages);
      }
    }

    return range;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Component */}
          <ProductFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button & Results Count */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
              <p className="text-sm text-gray-600">
                {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} Found
              </p>
            </div>

            {/* Products Grid */}
            <div className="bg-white rounded-lg p-4 sm:p-6 mb-8">
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {paginatedProducts.map((item) => (
                    <Productitem
                      key={item._id}
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg mb-2">No products found</p>
                  <p className="text-gray-400 text-sm">
                    Try adjusting your filters
                  </p>
                </div>
              )}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center">
                <div className="inline-flex items-center gap-1 sm:gap-2 bg-white border rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {getPaginationRange().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span className="px-2 text-gray-400">...</span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`
                            min-w-[36px] h-9 px-3 rounded text-sm font-medium transition-colors
                            ${
                              currentPage === page
                                ? "bg-black text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            }
                          `}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;