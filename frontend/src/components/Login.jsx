"use client"
import React from 'react'
import Link from 'next/link'
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Submitted')
    }
  return (
    <>
        <div className="w-screen h-screen flex justify-start items-center bg-[#F9F7F2]">
            <div className="md:flex hidden w-1/2 h-screen bg-[url('/signup_img.jpeg')] bg-cover bg-center"/>
            <div className="h-screen md:w-1/2 w-full flex justify-center items-center md:bg-none bg-[url('/signup_img.jpeg')] bg-cover bg-center">
                <div className="h-3/4 lg:w-[60%] w-[80%] flex justify-end items-center border-2 border-[#5E3D22] rounded-2xl flex-col py-5 md:bg-none bg-[#F9F7F2]">
                    <h1 className='font-Antic text-[#5E3D22] text-4xl'>Log In</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center h-[90%] w-[100%] gap-5'>
                        <button className='w-[80%] h-[10%] text-black border-[1px] border-[#000000] rounded-xl flex items-center justify-center gap-4 mb-5'><FcGoogle className='text-2xl' />Sign In with Google</button>
                        <input className='w-[80%] h-[10%] rounded-2xl px-5 text-black text-sm lg:text-lg bg-[#f7c9bb] focus:border-[#5E3D22]' type="text" placeholder='Username' />
                        <input className='w-[80%] h-[10%] rounded-2xl px-5 text-black text-sm lg:text-lg bg-[#f7c9bb] focus:border-[#5E3D22]' type="password" placeholder='Password' />
                        <h2 className='text-black p-1 text-sm lg:text-[1rem]'>Don't have an account? <Link href = "/signup" className='text-blue-500 cursor-pointer'>Sign Up</Link></h2>
                        <input className='w-[80%] h-[10%] rounded-2xl px-5 text-black text-sm lg:text-lg bg-[#c97a62] focus:border-[#5E3D22] cursor-pointer' type="submit"  />
                    </form>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup