import React from "react";
import { Sliders, Ruler, Circle, ChevronDown } from "lucide-react";

interface ControlPanelProps {
  dimensions: {
    length: number;
    radius: number;
    capHeight: number;
  };
  setDimensions: React.Dispatch<
    React.SetStateAction<{
      length: number;
      radius: number;
      capHeight: number;
    }>
  >;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  dimensions,
  setDimensions,
}) => {
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDimensions((prev) => ({ ...prev, length: value }));
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDimensions((prev) => ({ ...prev, radius: value }));
  };

  const handleCapHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    // Ensure cap height doesn't exceed half the total length
    const maxCapHeight = dimensions.length / 2 - 0.1;
    const safeValue = Math.min(value, maxCapHeight);
    setDimensions((prev) => ({ ...prev, capHeight: safeValue }));
  };

  return (
    <div className="space-y-6">
      <div className="text-xl font-bold flex items-center space-x-2">
        <Sliders className="h-5 w-5 text-blue-400" />
        <h2>Control Panel</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Ruler className="h-4 w-4 text-blue-400" />
            <label className="font-medium">Tanker Length (m)</label>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={dimensions.length}
            onChange={handleLengthChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">1m</span>
            <span className="text-sm font-medium">{dimensions.length}m</span>
            <span className="text-xs text-gray-400">10m</span>
          </div>
          <input
            type="number"
            min="1"
            max="10"
            step="0.1"
            value={dimensions.length}
            onChange={handleLengthChange}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Circle className="h-4 w-4 text-blue-400" />
            <label className="font-medium">Tanker Radius (m)</label>
          </div>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={dimensions.radius}
            onChange={handleRadiusChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">0.5m</span>
            <span className="text-sm font-medium">{dimensions.radius}m</span>
            <span className="text-xs text-gray-400">3m</span>
          </div>
          <input
            type="number"
            min="0.5"
            max="3"
            step="0.1"
            value={dimensions.radius}
            onChange={handleRadiusChange}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <ChevronDown className="h-4 w-4 text-blue-400" />
            <label className="font-medium">Cap Height (m)</label>
          </div>
          <input
            type="range"
            min="0.1"
            max={Math.max(0.1, dimensions.length / 2 - 0.1)}
            step="0.1"
            value={dimensions.capHeight}
            onChange={handleCapHeightChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">0.1m</span>
            <span className="text-sm font-medium">{dimensions.capHeight}m</span>
            <span className="text-xs text-gray-400">
              {(dimensions.length / 2 - 0.1).toFixed(1)}m
            </span>
          </div>
          <input
            type="number"
            min="0.1"
            max={dimensions.length / 2 - 0.1}
            step="0.1"
            value={dimensions.capHeight}
            onChange={handleCapHeightChange}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="p-4 bg-gray-700 rounded-lg">
        <h3 className="font-medium mb-2">Tanker Information</h3>
        <div className="space-y-1 text-sm">
          <p>Shape: Cylinder with custom end caps</p>
          <p>Material: Metal (simulated)</p>
          <p>Volume Formula:</p>
          <ul className="list-disc list-inside pl-2">
            <li>Cylinder: πr²h</li>
            <li>End caps: 2 × (1/3)πc²(3r - c)</li>
          </ul>
          <p>Where:</p>
          <ul className="list-disc list-inside pl-2">
            <li>r = radius ({dimensions.radius}m)</li>
            <li>
              h = cylinder length (
              {(dimensions.length - 2 * dimensions.capHeight).toFixed(2)}m)
            </li>
            <li>c = cap height ({dimensions.capHeight}m)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
