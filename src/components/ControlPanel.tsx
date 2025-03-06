import React, { useState } from "react";
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

const unitConversions = {
  meters: 1,
  feet: 3.28084,
  inches: 39.3701,
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  dimensions,
  setDimensions,
}) => {
  const [lengthUnit, setLengthUnit] = useState<"meters" | "feet" | "inches">(
    "meters"
  );
  const [radiusUnit, setRadiusUnit] = useState<"meters" | "feet" | "inches">(
    "meters"
  );
  const [capHeightUnit, setCapHeightUnit] = useState<
    "meters" | "feet" | "inches"
  >("meters");

  const convertToMeters = (value: number, fromUnit: string) => {
    return value / unitConversions[fromUnit as keyof typeof unitConversions];
  };

  const convertFromMeters = (value: number, toUnit: string) => {
    return value * unitConversions[toUnit as keyof typeof unitConversions];
  };

  const handleInputChange =
    (key: "length" | "radius" | "capHeight", unit: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setDimensions((prev) => ({
        ...prev,
        [key]: convertToMeters(value, unit),
      }));
    };

  return (
    <div className="space-y-6 p-4 bg-gray-800 text-white rounded-lg">
      <div className="text-xl font-bold flex items-center space-x-2">
        <Sliders className="h-5 w-5 text-blue-400" />
        <h2>Control Panel</h2>
      </div>

      {/* Input Component */}
      {[
        {
          key: "length",
          label: "Tanker Length",
          icon: <Ruler />,
          unit: lengthUnit,
          setUnit: setLengthUnit,
        },
        {
          key: "radius",
          label: "Tanker Radius",
          icon: <Circle />,
          unit: radiusUnit,
          setUnit: setRadiusUnit,
        },
        {
          key: "capHeight",
          label: "Cap Height",
          icon: <ChevronDown />,
          unit: capHeightUnit,
          setUnit: setCapHeightUnit,
        },
      ].map(({ key, label, icon, unit, setUnit }) => (
        <div key={key} className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="h-4 w-4 text-blue-400">{icon}</span>
            <label className="font-medium">{label}</label>
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              min="0.1"
              step="0.01"
              value={convertFromMeters(
                dimensions[key as keyof typeof dimensions],
                unit
              ).toFixed(2)}
              onChange={handleInputChange(
                key as "length" | "radius" | "capHeight",
                unit
              )}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={unit}
              onChange={(e) =>
                setUnit(e.target.value as "meters" | "feet" | "inches")
              }
              className="px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="meters">m</option>
              <option value="feet">ft</option>
              <option value="inches">in</option>
            </select>
          </div>
        </div>
      ))}

      {/* Tanker Info */}
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
            <li>
              r = {convertFromMeters(dimensions.radius, radiusUnit).toFixed(2)}{" "}
              {radiusUnit}
            </li>
            <li>
              h ={" "}
              {convertFromMeters(
                dimensions.length - 2 * dimensions.capHeight,
                lengthUnit
              ).toFixed(2)}{" "}
              {lengthUnit}
            </li>
            <li>
              c ={" "}
              {convertFromMeters(dimensions.capHeight, capHeightUnit).toFixed(
                2
              )}{" "}
              {capHeightUnit}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
