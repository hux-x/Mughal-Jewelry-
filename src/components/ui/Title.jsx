import React from 'react'
import { motion } from 'framer-motion'

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      {/* Animate the text with a fade-in effect */}
      <motion.p 
        className='text-gray-500' 
        initial={{ opacity: 0, x: -50 }} // Initial state
        animate={{ opacity: 1, x: 0 }}   // Animation state
        transition={{ duration: 0.5 }}    // Animation duration
      >
        {text1} <span className='text-gray-700 font-medium'>{text2}</span>
      </motion.p>
      
      {/* Animate the line with a growing effect */}
      <motion.p 
        className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'
        initial={{ scaleX: 0 }}         // Line starts from 0 width
        animate={{ scaleX: 1 }}         // Line grows to full width
        transition={{ duration: 0.5 }}  // Animation duration
        style={{ transformOrigin: 'left' }}  // Origin for scale
      />
    </div>
  )
}

export default Title
