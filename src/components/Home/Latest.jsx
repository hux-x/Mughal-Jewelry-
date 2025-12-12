"use client";
import React, { useContext } from 'react';
import { ShopContext } from '@/src/context/ShopContext';
import Title from '@/src/components/ui/Title';
import Productitem from '@/src/components/ui/ProductItem';
import Link from 'next/link';

const Latestcollection = () => {
  const { products } = useContext(ShopContext);
  const latestproducts = products && products.length ? products.slice(0, 10) : [];

  return (
    <div className='my-10 px-4 md:px-12 lg:px-20'>
      <div className='text-center py-8 text-3xl'>
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className='w-full md:w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Discover our newest handcrafted pieces, where traditional artistry meets contemporary elegance.
        </p>
      </div>
      
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6'>
        {latestproducts.map((item) => (
          <Productitem 
            key={item._id} 
            id={item._id} 
            name={item.name} 
            price={item.price} 
            image={item.image} 
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
    </div>
  );
}

export default Latestcollection;
