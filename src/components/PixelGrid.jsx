import React, { useState } from "react";

export default function PixelGrid() {
  const [hoveredPixel, setHoveredPixel] = useState(null);

  const gridSize = 10; // Example 10x10 grid

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 20px)`,
          gridTemplateRows: `repeat(${gridSize}, 20px)`,
          gap: "2px",
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => (
          <div
            key={index}
            className="w-5 h-5 bg-gray-700 hover:bg-orange-500 cursor-pointer"
            onMouseEnter={() => setHoveredPixel(index + 1)}
          ></div>
        ))}
      </div>

      <p className="text-orange-500 text-lg font-bold">
        {hoveredPixel ? `Pixel Number: ${hoveredPixel}` : "Hover on a pixel"}
      </p>
    </div>
  );
}

