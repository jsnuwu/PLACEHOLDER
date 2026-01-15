import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import Player from "./Player";

const App: React.FC = () => {

  const treePositions: [number, number][] = [];

  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 80 - 40;
    const z = Math.random() * 80 - 40;
    treePositions.push([x, z]);
  }

  return (
    <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [0, 1.5, 5], fov: 75 }}>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />

      {/* Boden */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Haus */}
      <mesh position={[0, 1, -10]} castShadow>
        <boxGeometry args={[4, 2, 4]} />
        <meshStandardMaterial color="brown" />
      </mesh>
      <mesh position={[0, 3, -10]} castShadow>
        <coneGeometry args={[3, 2, 4]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Bäume */}
      {treePositions.map(([x, z], idx) => (
        <group key={idx} position={[x, 0, z]}>
          {/* Stamm */}
          <mesh position={[0, 1, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 2, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Krone */}
          <mesh position={[0, 3, 0]} castShadow>
            <sphereGeometry args={[1.5, 8, 8]} />
            <meshStandardMaterial color="darkgreen" />
          </mesh>
        </group>
      ))}

      <Player />
    </Canvas>
  );
};

export default App;
