import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    const navitems = [
        {
            name: "Home",
            link: "#home",
        },
        {
            name: "About",
            link: "#about",
        },
        {
            name: "Features",
            link: "#features",
        },
    ];

  return (
    <>
            <header className="fixed left-1/2 top-4 z-30 w-[94vw] max-w-6xl -translate-x-1/2 md:top-6">
                <div className="flex items-center justify-between rounded-2xl border border-[#d6b69c] bg-[#fffaf4]/90 px-4 py-3 shadow-[0_18px_36px_-25px_rgba(67,37,13,0.68)] backdrop-blur-md md:rounded-full md:px-6 md:py-3">
                    <a href="#home" className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Oraculum logo" width={34} height={34} />
                        <h1 className="bg-gradient-to-r from-[#D28066] via-[#5E3D22] to-[#2B1C0F] bg-clip-text font-Antic text-2xl text-transparent md:text-3xl">
                            Oraculum
                        </h1>
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        {navitems.map((item) => (
                            <a
                                key={item.name}
                                href={item.link}
                                className="bg-gradient-to-r from-[#D28066] via-[#5E3D22] to-[#2B1C0F] bg-clip-text font-Antic text-2xl text-transparent transition duration-200 hover:opacity-80"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    <Link
                        href="/interview-session"
                        className="rounded-full bg-gradient-to-r from-[#D28066] via-[#5E3D22] to-[#2B1C0F] px-4 py-2 font-Antic text-lg text-[#FBF0E7] shadow-[0_14px_28px_-18px_rgba(67,37,13,0.9)] transition duration-200 hover:brightness-110 md:px-5"
                    >
                        Start
                    </Link>
                </div>

                <nav className="mt-2 flex w-full items-center justify-between rounded-xl border border-[#d6b69c] bg-[#fffaf4]/90 px-4 py-2 shadow-[0_14px_30px_-25px_rgba(67,37,13,0.6)] backdrop-blur-md md:hidden">
                    {navitems.map((item) => (
                        <a
                            key={item.name}
                            href={item.link}
                            className="bg-gradient-to-r from-[#D28066] via-[#5E3D22] to-[#2B1C0F] bg-clip-text font-Antic text-lg text-transparent"
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>
            </header>
    </>
    );
};

export default Navbar;