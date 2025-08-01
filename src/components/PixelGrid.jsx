import React, { useState, useEffect } from "react";

export default function PixelGrid() {
  const gridSize = 20; // 20x20 grid
  const totalPixels = gridSize * gridSize;

  const [ownedPixels, setOwnedPixels] = useState([]);

  // Load owned pixels from localStorage on page load
  useEffect(() => {
    const savedPixels = JSON.parse(localStorage.getItem("ownedPixels")) || [];
    setOwnedPixels(savedPixels);
  }, []);

  // Save owned pixels to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ownedPixels", JSON.stringify(ownedPixels));
  }, [ownedPixels]);

  const togglePixel = (index) => {
    setOwnedPixels((prev) => {
      const isOwned = prev.includes(index);
      if (isOwned) {
        return prev.filter((i) => i !== index); // remove pixel
      } else {
        return [...prev, index]; // add pixel
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-orange-500 mb-2 flex items-center gap-2">
        AMO Pixel Website ✅
      </h1>

      {/* Pixel Counter - Top Right */}
      <div className="fixed top-4 right-4 bg-gray-900 text-green-400 px-3 py-1 rounded-lg shadow-lg text-sm">
        You own {ownedPixels.length} pixel{ownedPixels.length !== 1 ? "s" : ""}
      </div>

      {/* Pixel Grid */}
      <div
        className="grid mt-8"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 20px)`,
          gridTemplateRows: `repeat(${gridSize}, 20px)`,
          gap: "1px",
        }}
      >
        {Array.from({ length: totalPixels }).map((_, index) => {
          const isOwned = ownedPixels.includes(index);
          return (
            <div
              key={index}
              onClick={() => togglePixel(index)}
              className={`w-5 h-5 cursor-pointer border border-gray-700 transition-all duration-200 ${
                isOwned ? "bg-green-500" : "bg-gray-900 hover:bg-gray-600"
              }`}
              title={`Pixel #${index + 1}`} // shows pixel number on hover
            />
          );
        })}
      </div>
    </div>
  );
}

