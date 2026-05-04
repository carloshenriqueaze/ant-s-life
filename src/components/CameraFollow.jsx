import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

export default function CameraFollow({ targetRef, enabled }) {
  const { camera } = useThree();
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const cameraPosition = useMemo(() => new THREE.Vector3(), []);
  const lookAt = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    targetPosition.copy(target.position);
    const direction = new THREE.Vector3(Math.sin(target.rotation.y), 0, Math.cos(target.rotation.y));
    cameraPosition
      .copy(targetPosition)
      .addScaledVector(direction, -1.8)
      .add(new THREE.Vector3(0, 0.9, 0.35));

    camera.position.lerp(cameraPosition, 0.08);
    lookAt.copy(targetPosition).add(new THREE.Vector3(0, 0.26, 0));
    camera.lookAt(lookAt);
  });

  return null;
}
