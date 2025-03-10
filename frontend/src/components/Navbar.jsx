import React from 'react'
import Link from 'next/link'
import Image from "next/image"
import { px } from 'framer-motion'

const Navbar = () => {
    const navitems = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "About",
            link: "#about"
        },
        {
            name: "Features",
            link: "#features"
        },
        {
            name: "Contact",
            link: "#contact"
        }
    ]
  return (
    <>
        <div className="h-[9vh] w-[80vw] flex justify-around items-center fixed top-10 rounded-full bg-white border-[1px] border-black z-10">
            <Image
                src = "/logo.png"
                alt='logo'
                width={40}
                height={40}
                />
            <h1 className='bg-gradient-to-r from-[#D28066] via-[#5E3D22] to-[#2B1C0F] text-transparent bg-clip-text font-Antic text-3xl'>Oraculum</h1>
            {navitems.map((item, index) => (
                <a key={index} href={item.link} className="bg-gradient-to-r from-[#D28066] via-[#5E3D22] to-[#2B1C0F] text-transparent bg-clip-text font-Antic text-2xl">{item.name}</a>
            ))}
            <Link href="/signin" className="bg-gradient-to-r from-[#D28066] via-[#5E3D22] to-[#2B1C0F] rounded-full w-[10%] h-[60%] flex justify-center items-center font-Antic text-2xl">Login</Link>
        </div>
    </>
  )
}

export default Navbar