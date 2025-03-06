import React from 'react'

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
            <h1 className='bg-gradient-to-r from-[#D28066] via-[#5E3D22] to-[#2B1C0F] text-transparent bg-clip-text font-Antic text-3xl'>Oraculum</h1>
            {navitems.map((item, index) => (
                <a key={index} href={item.link} className="bg-gradient-to-r from-[#D28066] via-[#5E3D22] to-[#2B1C0F] text-transparent bg-clip-text font-Antic text-2xl">{item.name}</a>
            ))}
            <a href="" className="bg-gradient-to-r from-[#D28066] via-[#5E3D22] to-[#2B1C0F] rounded-full w-[10%] h-[60%] flex justify-center items-center font-Antic text-2xl">Login</a>
        </div>
    </>
  )
}

export default Navbar