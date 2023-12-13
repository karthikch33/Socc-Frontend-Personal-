import React, { useRef, useEffect, useState } from 'react';
import { Canvas, extend, useFrame } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import * as THREE from 'three';

extend({ EffectComposer, RenderPass, UnrealBloomPass });

const CustomShader = ({ time, color1, color0, bloomStrength, bloomRadius, bloomThreshold }) => {
  const materialRef = useRef();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
      materialRef.current.uniforms.color1.value.set(...color1);
      materialRef.current.uniforms.color0.value.set(...color0);
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={{
        time: { value: time },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        color1: { value: new THREE.Vector3(...color1) },
        color0: { value: new THREE.Vector3(...color0) },
      }}
      transparent
      vertexShader={vert}
      fragmentShader={frag}
    />
  );
};

const ThreeScene = () => {
  const [options, setOptions] = useState({
    exposure: 2.8,
    bloomStrength: 1.7,
    bloomThreshold: 0,
    bloomRadius: 0.8,
    color0: [74, 30, 0],
    color1: [201, 158, 72],
  });

  useEffect(() => {
    const gui = new dat.GUI(); // Assuming dat.GUI is available in your project
    const bloom = gui.addFolder('Bloom');
    bloom.add(options, 'bloomStrength', 0.0, 5.0).name('bloomStrength').listen();
    bloom.add(options, 'bloomRadius', 0.1, 2.0).name('bloomRadius').listen();
    bloom.open();
    gui.close();
    const color = gui.addFolder('Colors');
    color.addColor(options, 'color0').name('Border');
    color.addColor(options, 'color1').name('Base');
    color.open();
  }, [options]);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
      onCreated={({ gl }) => (gl.shadowMap.type = THREE.PCFSoftShadowMap)}
    >
      <EffectComposer>
        <RenderPass attachArray="passes" scene={scene} camera={camera} />
        <UnrealBloomPass
          attachArray="passes"
          args={[new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85]}
          threshold={options.bloomThreshold}
          strength={options.bloomStrength}
          radius={options.bloomRadius}
        />
      </EffectComposer>
      <CustomShader {...options} />
    </Canvas>
  );
};

export default ThreeScene;
