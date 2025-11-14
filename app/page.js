"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Watermark from "@/components/Watermark";
export default function Home() {

  const router = useRouter()
  const [text, setText] = useState("")


  const createTree = () => {
    if (text) {

      router.push(`/generate?handle=${text}`)
    }
  }
  return (
    <main className="bg-[#254f1a]">
      <Navbar />

      <section className=" md:container md:mx-auto min-h-screen grid md:grid-cols-2 md:py-40">
        <div className="flex justify-center md:items-start items-center  flex-col px-3 py-10 gap-1 ">
          <p className="text-yellow-300 font-bold text-4xl md:text-7xl text-center md:text-start">Everything you </p>
          <p className="text-yellow-300 font-bold text-4xl md:text-7xl text-center md:text-start">are. In one,</p>
          <p className="text-yellow-300 font-bold text-4xl md:text-7xl text-center md:text-start">simple link in bio.</p>
          <p className="text-yellow-300 text-center md:text-start text-xl my-4">Join 50M+ people using FitTree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} className="px-2 py-2 focus:outline-green-800 text-white border rounded-md" type="text" placeholder="Enter your Handle" />
            <button onClick={() => createTree()} className="bg-pink-300  md:rounded-xl  md:px-4 px-1.5 rounded-lg   md:py-4 font-semibold">Claim FitTree</button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col ">
          <Image width={1900} height={1900} src="/home.png" alt="homepage image" />

        </div>
      </section>
      <section hidden className="bg-red-700 min-h-[100vh]">

      </section>
    <Watermark/>
    </main>
  );
}
