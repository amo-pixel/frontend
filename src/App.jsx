import React from "react";
import PixelGrid from "./components/PixelGrid";

export default function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-10">
      <h1 className="text-orange-500 text-3xl font-bold">
        AMO Pixel Website ✅ Tailwind Works
      </h1>
      <PixelGrid />
    </div>
  );
}

