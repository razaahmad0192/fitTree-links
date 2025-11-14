// app/generate/page.js
import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import GenerateForm from "./GenerateForm"; // The new client component

export default function Page() {
  return (
    <section className="bg-[#E9C0E9]">
     

      {/* Wrap the client form in Suspense */}
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <GenerateForm/>
      </Suspense>
    </section>
  );
}