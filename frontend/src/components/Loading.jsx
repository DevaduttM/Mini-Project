import React from 'react'
import Image from 'next/image'

const Loading = ({message}) => {
  return (
    <>
        <div className="absolute top-0 left-0 z-50 h-screen w-screen bg-[#000000c2] flex items-center justify-center">
            <div className="h-[40%] aspect-square bg-white flex items-center justify-center flex-col rounded-xl">
                <Image
                src="/loader.gif"
                alt="loading"
                width={70}
                height={70}
                />
                <h1 className='text-2xl mt-10 font-Antic text-black text-center'>{message}</h1>
            </div>
        </div>
    </>
  )
}

export default Loading