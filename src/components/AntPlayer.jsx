import { forwardRef, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const keys = new Set();
const moveVector = new THREE.Vector3();
const forward = new THREE.Vector3();

function Leg({ side = 1, index = 0, walking }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const phase = index * 0.85 + (side > 0 ? 0 : Math.PI);
    const stride = walking.current ? Math.sin(clock.elapsedTime * 12 + phase) * 0.38 : 0;
    ref.current.rotation.z = side * (0.35 + stride);
  });

  return (
    <group ref={ref} position={[side * 0.13, 0.03, -0.18 + index * 0.18]} rotation={[0.15, 0, side * 0.35]}>
      <mesh position={[side * 0.18, -0.02, 0]} rotation={[0, 0, side * 0.4]} castShadow>
        <capsuleGeometry args={[0.012, 0.28, 4, 8]} />
        <meshStandardMaterial color="#120c08" roughness={0.8} />
      </mesh>
    </group>
  );
}

function AntModel({ walking }) {
  return (
    <group rotation={[0, Math.PI, 0]}>
      <mesh position={[0, 0.13, -0.28]} castShadow>
        <sphereGeometry args={[0.14, 20, 14]} />
        <meshStandardMaterial color="#21120b" roughness={0.62} />
      </mesh>
      <mesh position={[0, 0.15, 0]} scale={[1.05, 0.78, 1.25]} castShadow>
        <sphereGeometry args={[0.18, 24, 16]} />
        <meshStandardMaterial color="#2a1309" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.14, 0.28]} scale={[1.12, 0.8, 1.38]} castShadow>
        <sphereGeometry args={[0.2, 24, 16]} />
        <meshStandardMaterial color="#341709" roughness={0.58} />
      </mesh>

      {[0, 1, 2].map((index) => (
        <Leg key={`r-${index}`} side={1} index={index} walking={walking} />
      ))}
      {[0, 1, 2].map((index) => (
        <Leg key={`l-${index}`} side={-1} index={index} walking={walking} />
      ))}

      <mesh position={[0.08, 0.2, -0.42]} rotation={[0.55, 0.1, -0.18]} castShadow>
        <capsuleGeometry args={[0.006, 0.32, 4, 8]} />
        <meshStandardMaterial color="#0d0805" />
      </mesh>
      <mesh position={[-0.08, 0.2, -0.42]} rotation={[0.55, -0.1, 0.18]} castShadow>
        <capsuleGeometry args={[0.006, 0.32, 4, 8]} />
        <meshStandardMaterial color="#0d0805" />
      </mesh>
    </group>
  );
}

const AntPlayer = forwardRef(function AntPlayer({ enabled }, ref) {
  const groupRef = useRef();
  const walking = useRef(false);
  const velocity = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const down = (event) => keys.add(event.key.toLowerCase());
    const up = (event) => keys.delete(event.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      keys.clear();
    };
  }, []);

  useFrame((_, delta) => {
    const ant = groupRef.current;
    if (!ant) return;
    if (ref) ref.current = ant;

    // Keyboard input is converted into a world-space movement vector.
    moveVector.set(0, 0, 0);
    if (enabled) {
      if (keys.has("w") || keys.has("arrowup")) moveVector.z -= 1;
      if (keys.has("s") || keys.has("arrowdown")) moveVector.z += 1;
      if (keys.has("a") || keys.has("arrowleft")) moveVector.x -= 1;
      if (keys.has("d") || keys.has("arrowright")) moveVector.x += 1;
    }

    walking.current = moveVector.lengthSq() > 0;
    if (walking.current) {
      moveVector.normalize();
      velocity.lerp(moveVector.multiplyScalar(2.2), 0.16);
      forward.copy(velocity).normalize();
      ant.rotation.y = Math.atan2(forward.x, forward.z);
    } else {
      velocity.lerp(new THREE.Vector3(0, 0, 0), 0.13);
    }

    // Clamp the prototype arena so the camera stays inside the dense grass.
    ant.position.addScaledVector(velocity, delta);
    ant.position.x = THREE.MathUtils.clamp(ant.position.x, -6.2, 6.2);
    ant.position.z = THREE.MathUtils.clamp(ant.position.z, -6.2, 6.2);
  });

  return (
    <group ref={groupRef} position={[0, 0.02, 0]} scale={0.72}>
      <AntModel walking={walking} />
    </group>
  );
});

export default AntPlayer;
