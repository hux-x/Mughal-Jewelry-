// ExploreContent.jsx - The main component with useSearchParams
"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import Productitem from "@/src/components/ui/ProductItem";
import ProductFilters from "@/src/components/explore/filters";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import productService from "../../api/services/productService";

const ExploreContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const isUpdatingFromURL = useRef(false);
  const prevSearchParamsRef = useRef(searchParams.toString());

  const getInitialFilters = () => ({
    category: searchParams.get("category") ? searchParams.get("category").split(",") : [],
    search: searchParams.get("search") || null,
    sortBy: searchParams.get("sortBy") || "latest",
    minPrice: searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")) : null,
    maxPrice: searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")) : null,
  });

  const [filters, setFilters] = useState(getInitialFilters);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    productsPerPage: 12,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCats = async () => {
      try {
        setCategoriesLoading(true);
        const res = await productService.getCategories();
        if (res.success && res.categories) {
          setCategories(res.categories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setCategoriesLoading(false);
      }
    };
    getCats();
  }, []);

  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
      };

      if (filters.search) params.search = filters.search;
      if (filters.category && filters.category.length > 0) {
        params.category = filters.category.join(",");
      }
      if (filters.minPrice !== null) params.minPrice = filters.minPrice;
      if (filters.maxPrice !== null) params.maxPrice = filters.maxPrice;
      if (filters.sortBy) params.sortBy = filters.sortBy;

      const response = await productService.getFilteredProducts(params);
      
      if (response.success) {
        setProducts(response.products);
        setPagination(response.pagination);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [filters, currentPage]);

  useEffect(() => {
    const currentSearchParams = searchParams.toString();
    
    if (currentSearchParams !== prevSearchParamsRef.current) {
      isUpdatingFromURL.current = true;
      
      const newFilters = {
        category: searchParams.get("category") ? searchParams.get("category").split(",") : [],
        search: searchParams.get("search") || null,
        sortBy: searchParams.get("sortBy") || "latest",
        minPrice: searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")) : null,
        maxPrice: searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")) : null,
      };
      
      setTimeout(() => {
        setFilters(newFilters);
        setCurrentPage(parseInt(searchParams.get("page")) || 1);
        prevSearchParamsRef.current = currentSearchParams;
        isUpdatingFromURL.current = false;
      }, 0);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isUpdatingFromURL.current) return;

    const params = new URLSearchParams();

    if (filters.category && filters.category.length > 0) {
      params.set("category", filters.category.join(","));
    }
    if (filters.search) {
      params.set("search", filters.search);
    }
    if (filters.sortBy && filters.sortBy !== "latest") {
      params.set("sortBy", filters.sortBy);
    }
    if (filters.minPrice !== null) {
      params.set("minPrice", filters.minPrice.toString());
    }
    if (filters.maxPrice !== null) {
      params.set("maxPrice", filters.maxPrice.toString());
    }
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    prevSearchParamsRef.current = queryString;
    router.replace(newUrl, { scroll: false });
  }, [filters, currentPage, pathname, router]);

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const getPaginationRange = () => {
    const range = [];
    const maxVisible = 5;
    const totalPages = pagination.totalPages;

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
          <ProductFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            categories={categories}
            categoriesLoading={categoriesLoading}
          />

          <div className="flex-1 min-w-0">
            {filters.search && (
              <div className="mb-4 flex items-center gap-2 text-sm">
                <span className="text-gray-600">Searching for:</span>
                <span className="font-semibold text-black bg-gray-100 px-3 py-1 rounded-full">
                  &quot;{filters.search}&quot;
                </span>
                <button
                  onClick={() => handleFiltersChange({ ...filters, search: null })}
                  className="text-gray-500 hover:text-black transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
              <p className="text-sm text-gray-600">
                {loading ? "Loading..." : `${pagination.totalProducts} Product${pagination.totalProducts !== 1 ? 's' : ''} Found`}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 mb-8">
              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                  <p className="text-gray-500 mt-4">Loading products...</p>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <p className="text-red-500 text-lg mb-2">{error}</p>
                  <button
                    onClick={fetchFilteredProducts}
                    className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {products.map((item) => (
                    <Productitem
                      key={item._id}
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      images={item.images}  
                      inStock={item.inStock}
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

            {!loading && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center">
                <div className="inline-flex items-center gap-1 sm:gap-2 bg-white border rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
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
                    disabled={!pagination.hasNextPage}
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

// Wrapper component with Suspense
const Explore = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
};

export default Explore;