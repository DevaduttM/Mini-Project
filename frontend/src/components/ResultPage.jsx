"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Progress from './Progress'
import ProgressBar from './ProgressBar'

const ResultPage = () => {

    const [initial, setInitial] = useState(false);
    const [loading, setLoading] = useState(false);

    const generateResults = async () => {
        try{
            setLoading(true);
            const response = await axios.get('http://localhost:5000/results');
            console.log("Results:", response.data);
            setLoading(false);
            setInitial(false);
        }
        catch(error){
            console.error("Error generating results:", error);
        }
    }

  return (
    <>
        {initial ? (
            <>
                <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[url('/landing_img1_1.jpeg')] bg-cover bg-center">
                    <div className="bg-white w-1/2 h-1/2 rounded-lg flex flex-col items-center justify-center shadow-2xl">
                        {
                            loading ? (
                                <>
                                    <Image
                                        src="/loader.gif"
                                        alt="loader"
                                        width={50}
                                        height={50}
                                    />
                                    <h1 className="text-4xl font-Antic mt-10 text-gray-600">Generating Results...</h1>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-4xl text-black font-bold">Your Interview Results</h1>
                                    <p className="text-lg text-gray-600 font-semibold">You have successfully completed the interview.</p>
                                    <button className="bg-[#b18f6f] text-white px-4 py-2 rounded-lg mt-10" onClick={generateResults}>Generate Results</button>
                                </>
                            )
                        }
                        
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className="h-screen relative w-screen flex flex-col justify-center items-center bg-[#e9ecd5]">
                    <h1 className="absolute top-8 text-5xl text-black font-Antic">Your Interview Results</h1>
                    <div className="h-[45%] w-full flex items-center justify-center gap-10">
                        <div className="h-full w-[45%] bg-[#ffffff] shadow-lg flex-col flex gap-5 justify-center items-center rounded-lg">
                            <h1 className='text-gray-700 text-2xl'>Your Overall Score</h1>
                            <Progress percentage={80} />
                        </div>
                        <div className="h-full w-[45%] bg-[#ffffff] shadow-lg flex flex-col justify-center items-center rounded-lg">
                            <h1 className='text-gray-700 text-2xl'>Your Score Distribution</h1>
                            <div className="w-[90%] flex justify-center mt-6 items-start flex-col">
                                <p className='text-lg text-black'>Overall Expression</p>
                            </div>
                                <ProgressBar percentage={80} />
                            <div className="w-[90%] flex justify-center mt-6 items-start flex-col">
                                <p className='text-lg text-black'>Speech Confidence</p>
                            </div>
                                <ProgressBar percentage={80} />
                            <div className="w-[90%] flex justify-center mt-6 items-start flex-col">
                                <p className='text-lg text-black'>Correctness of Response</p>
                            </div>
                                <ProgressBar percentage={80} />
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
  )
}

export default ResultPage