import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const chase = new THREE.Vector3();

function SpiderLeg({ side = 1, index = 0 }) {
  return (
    <mesh position={[side * 0.33, 0.1, -0.28 + index * 0.18]} rotation={[0.35, 0, side * 0.9]} castShadow>
      <capsuleGeometry args={[0.018, 0.52, 4, 8]} />
      <meshStandardMaterial color="#17100f" roughness={0.75} />
    </mesh>
  );
}

export default function SpiderEnemy({ antRef, enabled, onDamage }) {
  const ref = useRef();
  const damageTimer = useRef(0);

  useFrame((_, delta) => {
    const spider = ref.current;
    const ant = antRef.current;
    if (!spider || !ant || !enabled) return;

    // The spider only hunts when the player gets close enough to wake it.
    chase.copy(ant.position).sub(spider.position);
    const distance = chase.length();
    if (distance < 5.8 && distance > 0.18) {
      chase.normalize();
      spider.position.addScaledVector(chase, delta * 0.72);
      spider.rotation.y = Math.atan2(chase.x, chase.z);
    }

    damageTimer.current -= delta;
    if (distance < 0.72 && damageTimer.current <= 0) {
      damageTimer.current = 0.8;
      onDamage((state) => ({ ...state, health: state.health - 18 }));
    }
  });

  return (
    <group ref={ref} position={[4.2, 0.07, -3.8]} scale={0.9}>
      <mesh position={[0, 0.18, 0]} scale={[1, 0.55, 1.25]} castShadow>
        <sphereGeometry args={[0.28, 24, 16]} />
        <meshStandardMaterial color="#221516" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.18, -0.36]} scale={[0.82, 0.62, 0.82]} castShadow>
        <sphereGeometry args={[0.22, 20, 14]} />
        <meshStandardMaterial color="#2d1b1b" roughness={0.72} />
      </mesh>
      {[0, 1, 2, 3].map((index) => (
        <SpiderLeg key={`r-${index}`} side={1} index={index} />
      ))}
      {[0, 1, 2, 3].map((index) => (
        <SpiderLeg key={`l-${index}`} side={-1} index={index} />
      ))}
      <mesh position={[0.08, 0.24, -0.56]} castShadow>
        <sphereGeometry args={[0.035, 10, 8]} />
        <meshStandardMaterial color="#d74632" emissive="#5a0802" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.08, 0.24, -0.56]} castShadow>
        <sphereGeometry args={[0.035, 10, 8]} />
        <meshStandardMaterial color="#d74632" emissive="#5a0802" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
