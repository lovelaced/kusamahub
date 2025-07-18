"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

const sprayVertexShader = /* glsl */ `
  uniform float uTime;
  varying float vRandom;

  void main() {
    vec3 pos = position;

    // Add some random movement
    float time = uTime * 0.5;
    pos.x += sin(time + position.z) * 0.01;
    pos.y += cos(time + position.x) * 0.01;

    // Simple random value for each particle
    vRandom = fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453);

    // Move particles upwards
    pos.z += time * 0.05;

    // Reset particle position when it goes too far up
    if (pos.z > 3.0) {
      pos.z = 0.0;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 3.0;
  }
`

const sprayFragmentShader = /* glsl */ `
  precision highp float;

  varying float vRandom;

  void main() {
    // Simple color with some random variation
    vec3 color = vec3(0.3, 0.7, 1.0) + vRandom * 0.2;
    gl_FragColor = vec4(color, 0.3);
  }
`

export function SprayParticles() {
  const pointsRef = useRef<THREE.Points>(null!)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
  })

  const particles = useMemo(() => {
    const particleCount = 500
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5
      positions[i * 3 + 2] = Math.random() * 3
    }

    return positions
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={particles} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={sprayVertexShader}
        fragmentShader={sprayFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  )
}