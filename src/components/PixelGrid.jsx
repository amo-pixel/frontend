import { useState, useEffect } from "react";

export default function PixelGrid() {
  const gridSize = 50;
  const totalPixels = gridSize * gridSize;

  const [hoveredPixel, setHoveredPixel] = useState(null);
  const [selectedPixel, setSelectedPixel] = useState(null);
  const [ownedPixels, setOwnedPixels] = useState(new Set());

  // Load owned pixels from local storage
  useEffect(() => {
    const savedPixels = JSON.parse(localStorage.getItem("ownedPixels") || "[]");
    setOwnedPixels(new Set(savedPixels));
  }, []);

  // Save to local storage whenever ownedPixels changes
  useEffect(() => {
    localStorage.setItem("ownedPixels", JSON.stringify(Array.from(ownedPixels)));
  }, [ownedPixels]);

  // Handle buying pixel
  const buyPixel = (pixelNumber) => {
    setOwnedPixels((prev) => new Set(prev).add(pixelNumber));
    setSelectedPixel(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 text-white relative min-h-screen pt-10">
      {/* Hover pixel number at the top */}
      {hoveredPixel && (
        <div className="absolute top-5 text-orange-400 text-sm font-bold">
          Pixel #{hoveredPixel}
        </div>
      )}

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 12px)`,
          gridTemplateRows: `repeat(${gridSize}, 12px)`,
          gap: "1px",
        }}
      >
        {Array.from({ length: totalPixels }).map((_, index) => {
          const pixelNumber = index + 1;
          const isOwned = ownedPixels.has(pixelNumber);

          return (
            <div
              key={pixelNumber}
              className={`w-3 h-3 cursor-pointer transition-all duration-150
                ${isOwned ? "bg-green-500" : "bg-gray-700 hover:bg-orange-500"}`}
              onMouseEnter={() => setHoveredPixel(pixelNumber)}
              onMouseLeave={() => setHoveredPixel(null)}
              onClick={() => !isOwned && setSelectedPixel(pixelNumber)}
            />
          );
        })}
      </div>

      {/* Selected pixel modal */}
      {selectedPixel && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-xl text-center w-64">
            <h2 className="text-xl text-orange-400 font-bold mb-4">
              Pixel #{selectedPixel} Selected
            </h2>
            <p className="text-gray-300 mb-4">
              Do you want to claim this pixel? (Demo mode)
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
                onClick={() => buyPixel(selectedPixel)}
              >
                Claim
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
                onClick={() => setSelectedPixel(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

