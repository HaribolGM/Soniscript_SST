import { Environment, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { DirectionalLightHelper, Color } from "three";
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import Fox from "./Fox.jsx";

export default function Experience() {
  const directionalLightRef1 = useRef();
  const directionalLightRef2 = useRef();
  const areaLightRef = useRef();
  const { scene } = useThree();

  // Define controls for the first directional light
  const { light1PositionX, light1PositionY, light1PositionZ, light1Intensity } =
    useControls("Directional Light 1", {
      light1PositionX: { value: 1, min: 10, max: 10, step: 0.1 },
      light1PositionY: { value: 2, min: 4.7, max: 10, step: 0.1 },
      light1PositionZ: { value: 3, min: 1.9, max: 10, step: 0.1 },
      light1Intensity: { value: 4.5, min: 4.9, max: 10, step: 0.1 },
    });

  // Define controls for the second directional light
  const { light2PositionX, light2PositionY, light2PositionZ, light2Intensity } =
    useControls("Directional Light 2", {
      light2PositionX: { value: -1, min: 0, max: 10, step: 0.1 },
      light2PositionY: { value: 2, min: 1.7, max: 10, step: 0.1 },
      light2PositionZ: { value: -3, min: 0, max: 10, step: 0.1 },
      light2Intensity: { value: 4.5, min: 4.8, max: 10, step: 0.1 },
    });

  // Define controls for the area light
  const {
    areaLightWidth,
    areaLightHeight,
    areaLightIntensity,
    areaLightColor,
  } = useControls("Area Light", {
    areaLightWidth: { value: 10, min: 1, max: 20, step: 0.1 },
    areaLightHeight: { value: 10, min: 1, max: 20, step: 0.1 },
    areaLightIntensity: { value: 1, min: 0, max: 10, step: 0.1 },
    areaLightColor: { value: "#ffffff" },
  });

  useEffect(() => {
    if (directionalLightRef1.current) {
      const helper1 = new DirectionalLightHelper(directionalLightRef1.current);
      scene.add(helper1);
      return () => {
        scene.remove(helper1);
      };
    }
  }, [scene]);

  useEffect(() => {
    if (directionalLightRef2.current) {
      const helper2 = new DirectionalLightHelper(directionalLightRef2.current);
      scene.add(helper2);
      return () => {
        scene.remove(helper2);
      };
    }
  }, [scene]);

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight
        ref={directionalLightRef1}
        castShadow
        position={[light1PositionX, light1PositionY, light1PositionZ]}
        intensity={light1Intensity}
        shadow-normalBias={0.04}
      />
      <directionalLight
        ref={directionalLightRef2}
        castShadow
        position={[light2PositionX, light2PositionY, light2PositionZ]}
        intensity={light2Intensity}
        color={new Color("green")}
        shadow-normalBias={0.04}
      />
      <rectAreaLight
        ref={areaLightRef}
        width={areaLightWidth}
        height={areaLightHeight}
        intensity={areaLightIntensity}
        color={areaLightColor}
        position={[0, 5, 0]}
        lookAt={[0, 0, 0]}
        penumbra={1}
        castShadow
      />

      <Fox />
      <Environment preset="city" />
    </>
  );
}
