import { Canvas } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import AntPlayer from "./AntPlayer.jsx";
import CameraFollow from "./CameraFollow.jsx";
import FoodCollectible from "./FoodCollectible.jsx";
import GrassField from "./GrassField.jsx";
import SpiderEnemy from "./SpiderEnemy.jsx";

const foodPositions = [
  [-2.2, 0.08, -2.8],
  [1.8, 0.08, -3.5],
  [3.8, 0.08, 0.4],
  [-3.4, 0.08, 2.3],
  [0.4, 0.08, 3.4],
  [4.5, 0.08, -2.2],
  [-4.6, 0.08, -0.9],
];

function YardDetails() {
  const stones = useMemo(
    () =>
      [
        [-5, 0.08, -4, 0.7],
        [-1.2, 0.08, 4.5, 0.45],
        [4.8, 0.08, 3.2, 0.6],
        [2.7, 0.08, -4.8, 0.35],
      ],
    []
  );

  return (
    <group>
      {stones.map(([x, y, z, scale], index) => (
        <mesh key={index} position={[x, y, z]} scale={[scale, scale * 0.35, scale * 0.8]} castShadow receiveShadow>
          <dodecahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#6f6e68" roughness={0.92} metalness={0.02} />
        </mesh>
      ))}

      <mesh position={[-3.2, 0.04, -1.2]} rotation={[0.05, -0.6, 0.04]} castShadow receiveShadow>
        <boxGeometry args={[2.7, 0.12, 0.18]} />
        <meshStandardMaterial color="#5f3d24" roughness={0.9} />
      </mesh>

      <mesh position={[2.1, 0.06, 2.6]} rotation={[-0.12, 0.8, 0.05]} castShadow receiveShadow>
        <sphereGeometry args={[0.85, 20, 10]} />
        <meshStandardMaterial color="#8b5f2d" roughness={0.78} />
      </mesh>

      <mesh position={[5.2, 0.025, -0.6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[0.55, 0.96, 36]} />
        <meshStandardMaterial color="#15120e" roughness={1} />
      </mesh>
    </group>
  );
}

export default function GameScene({ game, onGameChange }) {
  const antRef = useRef();
  const [collected, setCollected] = useState(() => new Set());

  const handleCollect = (index) => {
    setCollected((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      onGameChange((state) => ({ ...state, food: state.food + 1 }));
      return next;
    });
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.1, 3.2], fov: 58, near: 0.05, far: 90 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#bcd7ef"]} />
      <fog attach="fog" args={["#bcd7ef", 12, 30]} />

      <ambientLight intensity={0.5} />
      <directionalLight
        position={[6, 8, 4]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <hemisphereLight args={["#e9f7ff", "#315122", 1.1]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[34, 34]} />
        <meshStandardMaterial color="#3f5f2d" roughness={0.96} />
      </mesh>

      <GrassField />
      <YardDetails />

      <AntPlayer ref={antRef} enabled={game.status === "playing"} />
      <SpiderEnemy antRef={antRef} enabled={game.status === "playing"} onDamage={onGameChange} />

      {foodPositions.map((position, index) => (
        <FoodCollectible
          key={index}
          index={index}
          position={position}
          antRef={antRef}
          collected={collected.has(index)}
          enabled={game.status === "playing"}
          onCollect={handleCollect}
        />
      ))}

      <mesh position={[0, 0.04, 5.6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.9, 40]} />
        <meshStandardMaterial color="#21150d" roughness={1} side={THREE.DoubleSide} />
      </mesh>
      <CameraFollow targetRef={antRef} enabled={game.status !== "start"} />
    </Canvas>
  );
}
