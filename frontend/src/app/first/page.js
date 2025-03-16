"use client";
import First from "@/components/First";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/home"); // Redirect to home if logged in
      } else {
        setLoading(false); // Show page if user is not logged in
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [router]);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#F9F7F2]">
      <First />
    </div>
  );
};

export default Page;
