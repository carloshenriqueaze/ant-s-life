import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function GrassBlade({ position, height, rotation, color }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 1.7 + position[0] * 2.1) * 0.055;
  });

  return (
    <mesh ref={ref} position={position} rotation={[0, rotation, 0]} castShadow>
      <coneGeometry args={[0.025, height, 4, 1]} />
      <meshStandardMaterial color={color} roughness={0.85} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function GrassField() {
  const blades = useMemo(() => {
    const items = [];
    for (let i = 0; i < 420; i += 1) {
      const x = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 15;
      const height = 0.55 + Math.random() * 0.8;
      items.push({
        position: [x, height / 2, z],
        height,
        rotation: Math.random() * Math.PI,
        color: Math.random() > 0.45 ? "#5f8d35" : "#7ba64c",
      });
    }
    return items;
  }, []);

  return (
    <group>
      {blades.map((blade, index) => (
        <GrassBlade key={index} {...blade} />
      ))}
    </group>
  );
}
