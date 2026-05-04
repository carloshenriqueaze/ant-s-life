import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function FoodCollectible({ index, position, antRef, collected, enabled, onCollect }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const crumb = ref.current;
    const ant = antRef.current;
    if (!crumb || collected) return;

    crumb.rotation.y += 0.015;
    crumb.position.y = position[1] + Math.sin(clock.elapsedTime * 2.4 + index) * 0.025;

    if (enabled && ant && crumb.position.distanceTo(ant.position) < 0.45) {
      onCollect(index);
    }
  });

  if (collected) return null;

  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <dodecahedronGeometry args={[0.13, 0]} />
        <meshStandardMaterial color="#d9b45f" roughness={0.82} emissive="#7b4f16" emissiveIntensity={0.08} />
      </mesh>
      <pointLight color="#e4c46f" intensity={0.45} distance={1.6} />
    </group>
  );
}
