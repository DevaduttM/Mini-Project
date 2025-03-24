import React from 'react'

const SessionPage = () => {
  return (
    <>
        <div className="h-screen w-screen flex items-start justify-center bg-[#F9F7F2]">
            <div className="h-3/4 w-full flex justify-start items-center flex-col gap-10 mt-[2%]">
                <h1 className="text-4xl font-Convergence text-black">
                    Interview Session Page
                </h1>
                <div className="relative w-[90%] h-[10rem] bg-[#ebecde] rounded-xl flex justify-center items-center">
                    <p className='absolute text-lg font-Convergence text-[#555555dc] text-center top-2 left-5'>
                        Qn 1/10
                    </p>
                    <p className="text-2xl font-Antic text-black text-center">
                        Interview Questions
                    </p>
                </div>
            </div>

        </div>
    </>
  )
}

export default SessionPage