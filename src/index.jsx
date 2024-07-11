import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import Experience from "./Experience.jsx";
import React, { useEffect } from "react";

const CameraController = () => {
  const { camera } = useThree();
  const { fov, near, far, position, rotation } = useControls({
    fov: { value: 45, min: 1, max: 100 },
    near: { value: 0.1, min: 0.1, max: 10 },
    far: { value: 200, min: 50, max: 500 },
    position: {
      value: { x: -2.6, y: -1.4, z: 7.8 },
      step: 0.1,
    },
  });

  useEffect(() => {
    camera.fov = fov;
    camera.near = near;
    camera.far = far;
    camera.position.set(position.x, position.y, position.z);
    camera.updateProjectionMatrix();
  }, [fov, near, far, position, rotation, camera]);

  return null;
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <>
    <Leva />
    <Canvas shadows gl={{ alpha: true }}>
      <CameraController />
      <Experience />
    </Canvas>
  </>
);
