import React from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

interface TankerModelProps {
  dimensions: {
    length: number;
    radius: number;
    capHeight: number;
  };
}

const TankerModel: React.FC<TankerModelProps> = ({ dimensions }) => {
  // Create a custom tanker geometry (cylinder with custom end caps)
  const { length, radius, capHeight } = dimensions;
  const cylinderLength = length - 2 * capHeight;

  // Calculate parameters for the end caps
  // const ballRadius =
  //   (Math.pow(capHeight, 2) + Math.pow(radius, 2)) / (2 * capHeight);
  // const sphereOffset = ballRadius - capHeight;

  return (
    <group>
      {/* Main cylinder body */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry
          args={[
            radius, // radiusTop
            radius, // radiusBottom
            cylinderLength, // height
            32, // radialSegments
            1, // heightSegments
            false, // openEnded
          ]}
        />
        <meshStandardMaterial
          color="#000000"
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={0.8}
          transparent={true}
          opacity={0.4}
        />
      </mesh>

      {/* Left end cap */}
      <mesh position={[-(cylinderLength / 2 + capHeight), 0, 0]}>
        <sphereGeometry
          args={[
            radius, // Same as cylinder radius
            32, // Width segments
            32, // Height segments
          ]}
        />
        <meshStandardMaterial
          color="#000000"
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={0.8}
          transparent={true}
          opacity={0.4}
        />
      </mesh>

      {/* Custom left cap extension */}
      <mesh
        position={[-cylinderLength / 2 - capHeight / 2, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry
          args={[
            radius, // radiusTop
            radius, // radiusBottom
            capHeight, // height
            32, // radialSegments
            1, // heightSegments
            false, // openEnded
          ]}
        />
        <meshStandardMaterial
          color="#000000"
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={0.8}
          transparent={true}
          opacity={0.4}
        />
      </mesh>

      {/* Right end cap */}
      <mesh position={[cylinderLength / 2 + capHeight, 0, 0]}>
        <sphereGeometry
          args={[
            radius, // Same as cylinder radius
            32, // Width segments
            32, // Height segments
          ]}
        />
        <meshStandardMaterial
          color="#000000"
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={0.8}
          transparent={true}
          opacity={0.4}
        />
      </mesh>

      {/* Custom right cap extension */}
      <mesh
        position={[cylinderLength / 2 + capHeight / 2, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry
          args={[
            radius, // radiusTop
            radius, // radiusBottom
            capHeight, // height
            32, // radialSegments
            1, // heightSegments
            false, // openEnded
          ]}
        />
        <meshStandardMaterial
          color="#000000"
          metalness={0.6}
          roughness={0.2}
          envMapIntensity={0.8}
          transparent={true}
          opacity={0.4}
        />
      </mesh>

      {/* Dimension lines and labels */}
      {/* Length dimension line */}
      <group position={[0, -radius - 0.5, 0]}>
        <line>
          <bufferGeometry attach="geometry">
            <float32BufferAttribute
              attach="attributes-position"
              array={new Float32Array([-length / 2, 0, 0, length / 2, 0, 0])}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color="white" linewidth={2} />
        </line>
        <Text
          position={[0, -0.2, 0]}
          color="white"
          fontSize={0.2}
          anchorX="center"
          anchorY="top"
        >
          {`Length: ${length.toFixed(1)}m`}
        </Text>
      </group>

      {/* Radius dimension line */}
      <group position={[0, 0, 0]}>
        <line>
          <bufferGeometry attach="geometry">
            <float32BufferAttribute
              attach="attributes-position"
              array={new Float32Array([0, 0, 0, 0, radius, 0])}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color="red" linewidth={2} />
        </line>
        <Text
          position={[0.3, radius / 2, 0]}
          color="red"
          fontSize={0.2}
          anchorX="left"
          anchorY="middle"
        >
          {`Radius: ${radius.toFixed(1)}m`}
        </Text>
      </group>

      {/* Cap height dimension line */}
      <group position={[length / 2 + capHeight, radius + 0.4, 0]}>
        {/* Slightly moved left */}

        {/* Vertical line representing cap height */}
        <line>
          <bufferGeometry attach="geometry">
            <float32BufferAttribute
              attach="attributes-position"
              array={new Float32Array([0, 0, 0, capHeight, 0, 0])} // Line height = capHeight
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color="white" linewidth={2} />
        </line>

        {/* Cap height label positioned slightly left */}
        <Text
          position={[capHeight - capHeight / 0.5, capHeight / 2 + 0.5, 0]} // Adjusted X to move left
          color="white"
          fontSize={0.2}
          anchorX="left"
          anchorY="middle"
        >
          {`Cap: ${capHeight.toFixed(1)}m`}
        </Text>
      </group>

      {/* Cylinder length dimension line */}
      <group position={[-cylinderLength / 2, radius + 0.5, 0]}>
        <line>
          <bufferGeometry attach="geometry">
            <float32BufferAttribute
              attach="attributes-position"
              array={new Float32Array([0, 0, 0, cylinderLength, 0, 0])}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color="white" linewidth={2} />
        </line>
        <Text
          position={[cylinderLength / 2, 0.2, 0]}
          color="white"
          fontSize={0.2}
          anchorX="center"
          anchorY="bottom"
        >
          {`Cylinder: ${cylinderLength.toFixed(1)}m`}
        </Text>
      </group>
    </group>
  );
};

export default TankerModel;
