import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

function FocusRating({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setRating(0); // Reset rating when the component becomes invisible
      setHoverRating(0);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    setRating(index);
    onClose();
  };

  return (
    <div className="card flex justify-center">
      <h3 className="card-heading">Rate Focus</h3>
      <div className="flex space-x-1" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: 10 }, (_, index) => (
          <button
            key={index}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onClick={() => handleClick(index + 1)}
            className="hover:cursor-pointer"
          >
            {(hoverRating || rating) > index ? (
              <StarIcon className="w-6 h-6 text-yellow-500" />
            ) : (
              <StarIcon className="w-6 h-6 text-gray-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FocusRating;
