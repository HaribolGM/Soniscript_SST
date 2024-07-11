import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Fox() {
  const fox = useGLTF("./s_model.glb");
  const foxRef = useRef();

  // Define controls for position, rotation, and scale
  const { positionX, positionY, positionZ, rotationY, scale } = useControls({
    positionX: { value: -2.5, min: 0.3, max: 10, step: 0.1 },
    positionY: { value: -1.8, min: -1.8, max: 10, step: 0.1 },
    positionZ: { value: 2.5, min: 2.5, max: 10, step: 0.1 },
    scale: { value: 0.02, min: 0.01, max: 1, step: 0.01 },
  });

  useFrame((state, delta) => {
    if (foxRef.current) {
      foxRef.current.rotation.y += delta * 0.5; // Continuous rotation on the y-axis
      foxRef.current.rotation.x += delta * 0.1; // Slow rotation on the x-axis
    }
  });

  return (
    <primitive
      ref={foxRef}
      object={fox.scene}
      scale={0.7}
      position={[positionX, positionY, positionZ]}
      rotation-y={rotationY}
      castShadow
      receiveShadow
    />
  );
}
