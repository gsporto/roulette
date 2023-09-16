import React, { useState } from "react";
import "./styles.css";
import { flushSync } from "react-dom";

interface WheelProps {
  items: string[];
  onSelectItem?: (selectedItem: number) => void;
}

const Wheel: React.FC<WheelProps> = ({ items, onSelectItem }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [spinning, setSpinning] = useState("");

  const handleSelectItem = () => {

    flushSync(() => {
      setSelectedItem(null);
      setSpinning("");
    });

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * items.length);
      if (onSelectItem) {
        onSelectItem(randomIndex);
      }
      setSelectedItem(randomIndex);

      // Start spinning animation
      setSpinning("spinning");
    }, 500);
  };

  const wheelVars = {
    "--nb-item": items.length,
    "--selected-item": selectedItem,
  };

  return (
    <div className="wheel-container">
      <div
        className={`wheel ${spinning}`}
        style={wheelVars as React.CSSProperties}
        onClick={handleSelectItem}
      >
        {items.map((item, index) => (
          <div
            className="wheel-item"
            key={index}
            style={{ "--item-nb": index } as React.CSSProperties}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wheel;
