"use client";
import React, { useState, useEffect } from 'react';
import Title from '@/src/components/ui/Title';
import Productitem from '@/src/components/ui/ProductItem';
import Link from 'next/link';
import productService from '@/src/api/services/productService';

const Latestcollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLatest = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productService.getLatestProducts();
        
        if (response.success) {
          setLatestProducts(response.products);
          console.log(response.products)
        } else {
          setError("Failed to fetch latest products");
        }
      } catch (err) {
        console.error("Error fetching latest products:", err);
        setError("An error occurred while fetching products");
      } finally {
        setLoading(false);
      }
    };

    getLatest();
  }, []);

  return (
    <div className='my-10 px-4 md:px-12 lg:px-20'>
      <div className='text-center py-8 text-3xl'>
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className='w-full md:w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover our newest handcrafted pieces, where traditional artistry meets contemporary elegance.
        </p>
      </div>
      
      {loading ? (
        <div className='text-center py-16'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
          <p className='text-gray-500 mt-4'>Loading latest products...</p>
        </div>
      ) : error ? (
        <div className='text-center py-16'>
          <p className='text-red-500 text-lg mb-2'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors'
          >
            Try Again
          </button>
        </div>
      ) : latestProducts.length > 0 ? (
        <>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6'>
            {latestProducts.map((item) => (
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

          {/* Explore More Button */}
          <div className='text-center mt-8'>
            <Link
              href="/shop"
              className='inline-block bg-gray-900 text-white py-2 px-6 rounded-md text-sm md:text-base font-semibold hover:bg-gray-800 transition-colors'
            >
              Explore More
            </Link>
          </div>
        </>
      ) : (
        <div className='text-center py-16'>
          <p className='text-gray-500 text-lg'>No products available</p>
        </div>
      )}
    </div>
  );
}

export default Latestcollection;