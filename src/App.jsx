import React, { useState } from "react";
import PixelGrid from "./components/PixelGrid";

export default function App() {
  const [pixelCount, setPixelCount] = useState(0);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-10 text-white">
      <h1 className="text-orange-500 text-3xl font-bold">
        AMO Pixel Website ✅
      </h1>

      {/* ✅ Pixel Counter */}
      <p className="text-green-400 text-lg">
        You own {pixelCount} pixel{pixelCount !== 1 ? "s" : ""}
      </p>

      <PixelGrid onOwnedPixelsChange={setPixelCount} />
    </div>
  );
}

