"use client"
import Signup from '@/components/Signup'
import React from 'react'
import { motion } from 'framer-motion'

const page = () => {
  return (
    <>
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-screen h-screen justify-center items-center flex bg-[#F9F7F2]">    
            <Signup />
      </motion.div>
    </>
  )
}

export default page