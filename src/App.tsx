import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Settings, Droplets, Ruler } from "lucide-react";
import TankerModel from "./components/TankerModel";
import ControlPanel from "./components/ControlPanel";

function App() {
  const [dimensions, setDimensions] = useState({
    length: 5,
    radius: 1,
    capHeight: 0.5, // Added cap height parameter
  });

  // Calculate volume with custom cap shape
  const calculateVolume = () => {
    const { length, radius, capHeight } = dimensions;

    // Calculate ball radius based on cap height and radius
    const ballRadius =
      (Math.pow(capHeight, 2) + Math.pow(radius, 2)) / (2 * capHeight);

    // Calculate length of cylinder portion
    const lengthOfCylinder = length - 2 * capHeight;

    // Calculate cylinder volume
    const cylinderVolume = Math.PI * Math.pow(radius, 2) * lengthOfCylinder;

    // Calculate cap volume (partial sphere)
    const capVolume =
      (1 / 3) * Math.PI * Math.pow(capHeight, 2) * (3 * ballRadius - capHeight);

    // Total volume (cylinder + two caps)
    return cylinderVolume + 2 * capVolume;
  };

  const volumeInCubicMeters = calculateVolume();
  const volumeInLiters = volumeInCubicMeters * 1000; // 1 cubic meter = 1000 liters
  const volumeInGallons = volumeInLiters * 0.264172; // 1 liter = 0.264172 gallons

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="p-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-blue-400" />
          <h1 className="text-2xl font-bold">3D Tanker Volume Simulator</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
            <Ruler className="h-5 w-5 text-blue-400" />
            <span className="font-medium">
              {volumeInCubicMeters.toFixed(2)} m³
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
            <Droplets className="h-5 w-5 text-blue-400" />
            <span className="font-medium">
              {volumeInLiters.toFixed(2)} L / {volumeInGallons.toFixed(2)} gal
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row h-[calc(100vh-73px)]">
        <div className="w-full md:w-3/4 h-full">
          <Canvas className="w-full h-full">
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <TankerModel dimensions={dimensions} />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
              minAzimuthAngle={-Math.PI / 4}
              maxAzimuthAngle={Math.PI / 4}
            />
            <gridHelper args={[20, 20, "white", "gray"]} />
            <axesHelper args={[5]} />
          </Canvas>
        </div>

        <div className="w-full md:w-1/4 p-4 bg-gray-800">
          <ControlPanel dimensions={dimensions} setDimensions={setDimensions} />
        </div>
      </div>
    </div>
  );
}

export default App;
