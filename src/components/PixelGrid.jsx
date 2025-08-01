import { useState, useEffect } from "react";

export default function PixelGrid() {
  const totalPixels = 100; // you can change to 1,000,000 later
  const [ownedPixels, setOwnedPixels] = useState([]);

  // ✅ Load saved pixels when page first loads
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ownedPixels")) || [];
    setOwnedPixels(saved);
  }, []);

  // ✅ Save pixels whenever they change
  useEffect(() => {
    localStorage.setItem("ownedPixels", JSON.stringify(ownedPixels));
  }, [ownedPixels]);

  const togglePixel = (index) => {
    setOwnedPixels((prev) =>
      prev.includes(index)
        ? prev.filter((p) => p !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-white text-sm mb-2">
        Owned Pixels: {ownedPixels.length}
      </div>
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: totalPixels }).map((_, i) => (
          <div
            key={i}
            onClick={() => togglePixel(i)}
            className={`w-6 h-6 border cursor-pointer ${
              ownedPixels.includes(i) ? "bg-green-500" : "bg-gray-700"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

