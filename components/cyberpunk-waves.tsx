"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import type * as THREE from "three"
import { SprayParticles } from "./SprayParticles" // Declare SprayParticles import

/*--------------------------------------------------------------
  Vertex & Fragment shaders for foreground layer (sharp)
----------------------------------------------------------------*/

const foregroundVertexShader = /* glsl */ `
  uniform float uTime;
  varying float vElevation;
  varying float vDistance;
  varying vec2 vUv;

  // Simplex noise -------------------------------------------------
  vec3 permute(vec3 x){ return mod((x*34.0+1.0)*x,289.0); }
  vec4 permute(vec4 x){ return mod((x*34.0 + 1.0)*x, 289.0); }
  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy , y.xy );
    vec4 b1 = vec4( x.zw , y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy , h.x);
    vec3 p1 = vec3(a0.zw , h.y);
    vec3 p2 = vec3(a1.xy , h.z);
    vec3 p3 = vec3(a1.zw , h.w);

    vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec3 pos = position;
    vUv = uv;

    // SURFACE LAYER (z = 2.0) - Fast, chaotic, wind-driven
    float surfaceDepth = 2.0; // This layer represents surface water
    float depthFactor = 1.0; // Surface has maximum flow intensity

    // DRAMATIC WAVES - much larger amplitude with more turbulence
    float time = uTime * 0.25;

    // Large rolling waves with more chaos
    float primaryWave = snoise(vec3(pos.x * 0.2 + pos.y * 0.1, pos.y * 0.3, time)) * 1.2;
    float secondaryWave = snoise(vec3(pos.x * 0.5 - pos.y * 0.2, pos.y * 0.6, time * 1.3)) * 0.8;

    // Cross waves for complexity
    float crossWave = snoise(vec3(pos.x * 0.3 + pos.y * 0.4, pos.y * 0.4, time * 0.8)) * 0.6;

    // Fine detail waves with more turbulence
    float detailWaves = snoise(vec3(pos.x * 1.5, pos.y * 1.5, time * 2.0)) * 0.3;
    float ripples = snoise(vec3(pos.x * 3.0, pos.y * 3.0, time * 3.0)) * 0.15;

    // Add chaotic turbulence for dynamic feel
    float turbulence1 = snoise(vec3(pos.x * 4.0, pos.y * 2.0, time * 2.5)) * 0.2;
    float turbulence2 = snoise(vec3(pos.x * 2.0, pos.y * 4.0, time * 1.8)) * 0.15;

    // Add variation across the surface to break uniformity
    float variation = snoise(vec3(pos.x * 0.1, pos.y * 0.1, time * 0.1)) * 0.4;

    // SURFACE FLOW PATTERNS - Fast, wind-driven, chaotic
    // Primary surface currents (wind-driven)
    float surfaceFlowX = snoise(vec3(pos.x * 0.8 + time * 0.4, pos.y * 0.4, time * 0.6)) * 0.12;
    float surfaceFlowY = snoise(vec3(pos.x * 0.4, pos.y * 0.8 + time * 0.5, time * 0.7)) * 0.12;

    // Surface wind shear patterns
    float windShearX = snoise(vec3(pos.x * 1.2 - time * 0.3, pos.y * 0.6 + time * 0.4, time * 0.9)) * 0.1;
    float windShearY = snoise(vec3(pos.x * 0.6 + time * 0.35, pos.y * 1.2 - time * 0.25, time * 0.85)) * 0.1;

    // Surface vortices (small, fast-spinning)
    float angle = atan(pos.y, pos.x) + time * 0.15;
    float radius = length(vec2(pos.x, pos.y));
    float surfaceVortexX = sin(angle + radius * 3.0 + time * 0.4) * 0.08 * smoothstep(0.3, 0.0, radius);
    float surfaceVortexY = cos(angle + radius * 3.0 + time * 0.4) * 0.08 * smoothstep(0.3, 0.0, radius);

    // Surface diagonal flows (choppy, irregular)
    float surfaceDiag1X = snoise(vec3(pos.x * 0.9 + pos.y * 0.4 + time * 0.5, pos.y * 0.6, time * 1.1)) * 0.08;
    float surfaceDiag1Y = snoise(vec3(pos.x * 0.4 + pos.y * 0.9 + time * 0.45, pos.x * 0.6, time * 1.05)) * 0.08;

    // Counter-surface flow (surface tension effects)
    float surfaceDiag2X = snoise(vec3(pos.x * 0.7 - pos.y * 0.5 + time * 0.4, pos.y * 0.9, time * 1.3)) * 0.06;
    float surfaceDiag2Y = snoise(vec3(pos.x * 0.5 + pos.y * 0.7 - time * 0.35, pos.x * 0.9, time * 1.25)) * 0.06;

    // Combine all surface flow patterns
    float totalFlowX = surfaceFlowX + windShearX + surfaceVortexX + surfaceDiag1X + surfaceDiag2X;
    float totalFlowY = surfaceFlowY + windShearY + surfaceVortexY + surfaceDiag1Y + surfaceDiag2Y;

    float elevation = primaryWave + secondaryWave + crossWave + detailWaves + ripples + turbulence1 + turbulence2 + variation;
    pos.z += elevation;

    // Apply surface flow displacement
    pos.x += totalFlowX * depthFactor;
    pos.y += totalFlowY * depthFactor;

    vElevation = elevation;
    
    // Calculate distance from camera for depth-based blur
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vDistance = length(worldPos.xyz - cameraPosition);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    
    // Sharp, small points for foreground detail
    float pointSize = 15.0 / (1.0 + vDistance * 0.1);
    gl_PointSize = pointSize;
    
    #ifdef GL_ES
      gl_PointSize *= ( 1.0 / gl_Position.w );
    #endif
  }
`

const foregroundFragmentShader = /* glsl */ `
  precision highp float;

  varying float vElevation;
  varying float vDistance;
  varying vec2 vUv;

  // Sharp, high contrast colors for foreground
  vec3 deepWater = vec3(0.0, 0.1, 0.2);
  vec3 midWater  = vec3(0.0, 0.6, 0.9);
  vec3 surface   = vec3(0.3, 1.0, 1.0);
  vec3 crest     = vec3(0.7, 1.0, 1.0);

  void main() {
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r2 = dot(cxy, cxy);
  if (r2 > 1.0) discard;

  vec3 color = deepWater;
  color = mix(color, midWater, smoothstep(-0.5, 0.2, vElevation));
  color = mix(color, surface, smoothstep(0.3, 0.8, vElevation));
  color = mix(color, crest, smoothstep(0.8, 1.5, vElevation));

  // Add dramatic glow for high waves
  color += crest * smoothstep(1.0, 2.0, vElevation) * 0.8;
  
  // Create streaky, line-like patterns instead of uniform circles
  float flowInfluence = sin(vUv.x * 8.0 + vUv.y * 3.0) * cos(vUv.y * 6.0 + vUv.x * 2.0);
  float streakX = abs(cxy.x + flowInfluence * 0.3) * 2.0; // Horizontal streaks with flow
  float streakY = abs(cxy.y + flowInfluence * 0.2) * 3.0; // Vertical variation with flow

  // Add directional streak patterns
  float diagonalStreak1 = abs((cxy.x + cxy.y) * 0.7 + flowInfluence * 0.4) * 2.5;
  float diagonalStreak2 = abs((cxy.x - cxy.y) * 0.7 - flowInfluence * 0.3) * 2.5;
  
  // Uneven darkening based on position and elevation
  float darkness = sin(vUv.x * 15.0 + vElevation * 3.0) * cos(vUv.y * 12.0) * 0.4;
  float randomDark = sin(vUv.x * 23.0) * cos(vUv.y * 19.0) * 0.3;
  
  // Apply uneven darkening
  color *= (0.7 + darkness + randomDark);
  
  // Distance-based blur factor - closer particles are sharper, distant ones softer
  float distanceBlurFactor = smoothstep(2.0, 8.0, vDistance); // 0.0 = sharp, 1.0 = soft
  float blurRadius = mix(1.0, 0.3, distanceBlurFactor); // Sharp edges for close, soft for far

  // Create line-like alpha with distance-based blur
  float lineAlpha = smoothstep(blurRadius, 0.1, streakX) * smoothstep(blurRadius, 0.3, streakY);
  float diagonalAlpha1 = smoothstep(blurRadius, 0.2, diagonalStreak1);
  float diagonalAlpha2 = smoothstep(blurRadius, 0.2, diagonalStreak2);
  float circularAlpha = smoothstep(blurRadius, 0.3, r2);
  
  // Mix all patterns for complex flow-like appearance
  float alpha = mix(
    mix(lineAlpha, diagonalAlpha1, 0.3), 
    mix(diagonalAlpha2, circularAlpha, 0.4), 
    0.6
  ) * 0.9;
  
  // Add random opacity variation
  float opacityVariation = sin(vUv.x * 17.0 + vUv.y * 13.0) * 0.2;
  alpha *= (0.8 + opacityVariation);
  
  // Distance fade
  alpha *= smoothstep(8.0, 2.0, vDistance) * 0.95; // Slightly reduce from full opacity

  gl_FragColor = vec4(color, alpha);
}
`

/*--------------------------------------------------------------
  Mid-ground layer shaders (medium blur) - SHALLOW SUBSURFACE
----------------------------------------------------------------*/

const midgroundVertexShader = /* glsl */ `
  uniform float uTime;
  varying float vElevation;
  varying float vDistance;
  varying vec2 vUv;

  // Same noise function
  vec3 permute(vec3 x){ return mod((x*34.0+1.0)*x,289.0); }
  vec4 permute(vec4 x){ return mod((x*34.0 + 1.0)*x, 289.0); }
  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy , y.xy );
    vec4 b1 = vec4( x.zw , y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy , h.x);
    vec3 p1 = vec3(a0.zw , h.y);
    vec3 p2 = vec3(a1.xy , h.z);
    vec3 p3 = vec3(a1.zw , h.w);

    vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec3 pos = position;
    vUv = uv;

    // SHALLOW SUBSURFACE LAYER (z = 2.8) - Medium speed, less chaotic
    float subsurfaceDepth = 2.8;
    float depthFactor = 0.7; // Reduced flow intensity at shallow depth

    // Medium frequency waves for mid-ground
    float time = uTime * 0.18;
    float primaryWave = snoise(vec3(pos.x * 0.25, pos.y * 0.25, time)) * 1.0;
    float secondaryWave = snoise(vec3(pos.x * 0.4, pos.y * 0.4, time * 1.1)) * 0.6;
    float mediumWaves = snoise(vec3(pos.x * 0.6, pos.y * 0.6, time * 1.4)) * 0.4;

    float elevation = primaryWave + secondaryWave + mediumWaves;
    pos.z += elevation;

    // SUBSURFACE FLOW PATTERNS - Smoother, more laminar
    // Primary subsurface currents (less affected by wind)
    float subFlowX = snoise(vec3(pos.x * 0.6 + time * 0.25, pos.y * 0.3, time * 0.4)) * 0.08;
    float subFlowY = snoise(vec3(pos.x * 0.3, pos.y * 0.6 + time * 0.3, time * 0.45)) * 0.08;

    // Subsurface cross currents (more stable)
    float subCrossX = snoise(vec3(pos.x * 0.8 - time * 0.15, pos.y * 0.4 + time * 0.2, time * 0.6)) * 0.06;
    float subCrossY = snoise(vec3(pos.x * 0.4 + time * 0.18, pos.y * 0.8 - time * 0.12, time * 0.55)) * 0.06;

    // Subsurface vortices (larger, slower)
    float angle = atan(pos.y, pos.x) + time * 0.08;
    float radius = length(vec2(pos.x, pos.y));
    float subVortexX = sin(angle + radius * 1.8 + time * 0.25) * 0.05 * smoothstep(0.6, 0.0, radius);
    float subVortexY = cos(angle + radius * 1.8 + time * 0.25) * 0.05 * smoothstep(0.6, 0.0, radius);

    // Subsurface thermal currents (very smooth)
    float thermalX = snoise(vec3(pos.x * 0.4 + time * 0.1, pos.y * 0.2, time * 0.3)) * 0.04;
    float thermalY = snoise(vec3(pos.x * 0.2, pos.y * 0.4 + time * 0.12, time * 0.35)) * 0.04;

    // Apply subsurface flow with reduced intensity
    pos.x += (subFlowX + subCrossX + subVortexX + thermalX) * depthFactor;
    pos.y += (subFlowY + subCrossY + subVortexY + thermalY) * depthFactor;

    vElevation = elevation;
    
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vDistance = length(worldPos.xyz - cameraPosition);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    
    // Medium blur - larger points
    gl_PointSize = 85.0 + elevation * 25.0;
    
    #ifdef GL_ES
      gl_PointSize *= ( 1.0 / gl_Position.w );
    #endif
  }
`

const midgroundFragmentShader = /* glsl */ `
  precision highp float;

  varying float vElevation;
  varying float vDistance;
  varying vec2 vUv;

  // Medium blur colors
  vec3 deepWater = vec3(0.0, 0.05, 0.12);
  vec3 midWater  = vec3(0.0, 0.35, 0.6);
  vec3 surface   = vec3(0.15, 0.7, 0.8);

  void main() {
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r2 = dot(cxy, cxy);
  if (r2 > 1.0) discard;

  vec3 color = deepWater;
  color = mix(color, midWater, smoothstep(-0.6, 0.4, vElevation));
  color = mix(color, surface, smoothstep(0.2, 1.0, vElevation));

  // Add atmospheric haze with more variation
  float haze = sin(vUv.x * 8.0 + vUv.y * 6.0) * 0.05;
  float extraHaze = sin(vUv.x * 12.0) * cos(vUv.y * 10.0) * 0.03;
  color += vec3(0.0, 0.1, 0.2) * (haze + extraHaze);

  // Create streaky patterns for mid-ground
  float streakPattern = abs(sin(cxy.x * 3.0 + vElevation)) * abs(cos(cxy.y * 2.0));
  
  // Uneven brightness
  float brightness = sin(vUv.x * 11.0) * cos(vUv.y * 9.0) * 0.3;
  color *= (0.8 + brightness);

  // Distance-based blur for mid-ground particles
  float distanceBlurFactor = smoothstep(3.0, 10.0, vDistance);
  float blurRadius = mix(0.3, 0.05, distanceBlurFactor); // Medium to very soft blur

  // Enhanced blur alpha with distance-based softness
  float alpha = smoothstep(blurRadius, 0.0, r2) * (0.25 + streakPattern * 0.1);

  gl_FragColor = vec4(color, alpha);
}
`

/*--------------------------------------------------------------
  Background layer shaders (heavy blur) - MID-DEPTH WATER
----------------------------------------------------------------*/

const backgroundVertexShader = /* glsl */ `
  uniform float uTime;
  varying float vElevation;
  varying float vDistance;
  varying vec2 vUv;

  // Same noise function
  vec3 permute(vec3 x){ return mod((x*34.0+1.0)*x,289.0); }
  vec4 permute(vec4 x){ return mod((x*34.0 + 1.0)*x, 289.0); }
  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy , y.xy );
    vec4 b1 = vec4( x.zw , y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy , h.x);
    vec3 p1 = vec3(a0.zw , h.y);
    vec3 p2 = vec3(a1.xy , h.z);
    vec3 p3 = vec3(a1.zw , h.w);

    vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec3 pos = position;
    vUv = uv;

    // MID-DEPTH LAYER (z = 6.0) - Slow, steady currents
    float midDepth = 6.0;
    float depthFactor = 0.4; // Much reduced flow intensity at mid-depth

    // Slow, large background waves
    float time = uTime * 0.1;
    float longSwell = snoise(vec3(pos.x * 0.12, pos.y * 0.12, time)) * 1.8;
    float crossSwell = snoise(vec3(pos.x * 0.2, pos.y * 0.2, time * 0.6)) * 1.2;

    float elevation = longSwell + crossSwell;
    pos.z += elevation;

    // MID-DEPTH FLOW PATTERNS - Very slow, steady, laminar
    // Deep ocean currents (very stable, unidirectional)
    float deepCurrentX = snoise(vec3(pos.x * 0.2 + time * 0.05, pos.y * 0.15, time * 0.15)) * 0.04;
    float deepCurrentY = snoise(vec3(pos.x * 0.15, pos.y * 0.2 + time * 0.08, time * 0.18)) * 0.04;

    // Thermohaline circulation (very slow, large scale)
    float thermoX = snoise(vec3(pos.x * 0.1 + time * 0.02, pos.y * 0.08, time * 0.1)) * 0.03;
    float thermoY = snoise(vec3(pos.x * 0.08, pos.y * 0.1 + time * 0.03, time * 0.12)) * 0.03;

    // Deep water mass movement (extremely slow)
    float massFlowX = snoise(vec3(pos.x * 0.15 - time * 0.01, pos.y * 0.1, time * 0.08)) * 0.02;
    float massFlowY = snoise(vec3(pos.x * 0.1, pos.y * 0.15 + time * 0.015, time * 0.09)) * 0.02;

    // Abyssal circulation (barely perceptible)
    float abyssalX = snoise(vec3(pos.x * 0.05, pos.y * 0.03 + time * 0.005, time * 0.05)) * 0.015;
    float abyssalY = snoise(vec3(pos.x * 0.03 + time * 0.008, pos.y * 0.05, time * 0.06)) * 0.015;

    // Apply mid-depth flow with greatly reduced intensity
    pos.x += (deepCurrentX + thermoX + massFlowX + abyssalX) * depthFactor;
    pos.y += (deepCurrentY + thermoY + massFlowY + abyssalY) * depthFactor;

    vElevation = elevation;
    
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vDistance = length(worldPos.xyz - cameraPosition);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    
    // MASSIVE points for heavy atmospheric blur
    gl_PointSize = 180.0 + elevation * 60.0;
    
    #ifdef GL_ES
      gl_PointSize *= ( 1.0 / gl_Position.w );
    #endif
  }
`

const backgroundFragmentShader = /* glsl */ `
  precision highp float;

  varying float vElevation;
  varying float vDistance;
  varying vec2 vUv;

  // Very dim, blurred colors for background
  vec3 deepWater = vec3(0.0, 0.02, 0.06);
  vec3 midWater  = vec3(0.0, 0.15, 0.3);
  vec3 surface   = vec3(0.05, 0.4, 0.5);

  void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r2 = dot(cxy, cxy);
    if (r2 > 1.0) discard;

    vec3 color = deepWater;
    color = mix(color, midWater, smoothstep(-1.0, 0.8, vElevation));
    color = mix(color, surface, smoothstep(0.5, 1.5, vElevation));
  
  // Add more atmospheric variation for depth
  float atmosphericVariation = sin(vUv.x * 4.0) * cos(vUv.y * 3.0) * 0.15;
  color += vec3(0.0, 0.12, 0.2) * atmosphericVariation;

  // Distance-based blur for background particles - much more dramatic variation
  float distanceBlurFactor = smoothstep(4.0, 12.0, vDistance);
  float blurRadius = mix(0.15, 0.02, distanceBlurFactor); // Soft to extremely soft

  // Enhanced atmospheric blur with distance-based extreme softness
  float alpha = smoothstep(blurRadius, 0.0, r2) * 0.08;

  // Add more atmospheric density variation with softer transitions
  alpha *= (0.4 + smoothstep(-1.5, 1.5, vElevation) * 0.3);

    gl_FragColor = vec4(color, alpha);
  }
`

/*--------------------------------------------------------------
  Far background layer shaders (extreme blur) - DEEP WATER
----------------------------------------------------------------*/

const farBackgroundVertexShader = /* glsl */ `
  uniform float uTime;
  varying float vElevation;
  varying float vDistance;

  // Same noise function
  vec3 permute(vec3 x){ return mod((x*34.0+1.0)*x,289.0); }
  vec4 permute(vec4 x){ return mod((x*34.0 + 1.0)*x, 289.0); }
  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy , y.xy );
    vec4 b1 = vec4( x.zw , y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy , h.x);
    vec3 p1 = vec3(a0.zw , h.y);
    vec3 p2 = vec3(a1.xy , h.z);
    vec3 p3 = vec3(a1.zw , h.w);

    vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec3 pos = position;

    // DEEP WATER LAYER (z = 8.0) - Extremely slow, almost static
    float deepDepth = 8.0;
    float depthFactor = 0.1; // Minimal flow at deep depths

    // Very slow, massive background swells
    float time = uTime * 0.05;
    float massiveSwell = snoise(vec3(pos.x * 0.08, pos.y * 0.08, time)) * 2.5;

    float elevation = massiveSwell;
    pos.z += elevation;

    // DEEP WATER FLOW - Extremely slow, geological time scale
    // Deep ocean basin circulation (imperceptibly slow)
    float basinFlowX = snoise(vec3(pos.x * 0.03, pos.y * 0.02, time * 0.1)) * 0.008;
    float basinFlowY = snoise(vec3(pos.x * 0.02, pos.y * 0.03, time * 0.12)) * 0.008;

    // Tectonic-scale water movement (barely detectable)
    float tectonicX = snoise(vec3(pos.x * 0.01, pos.y * 0.015, time * 0.05)) * 0.005;
    float tectonicY = snoise(vec3(pos.x * 0.015, pos.y * 0.01, time * 0.06)) * 0.005;

    // Apply deep flow with minimal intensity
    pos.x += (basinFlowX + tectonicX) * depthFactor;
    pos.y += (basinFlowY + tectonicY) * depthFactor;

    vElevation = elevation;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vDistance = length(worldPos.xyz - cameraPosition);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    
    // ENORMOUS points for extreme atmospheric blur
    gl_PointSize = 280.0 + elevation * 80.0;
    
    #ifdef GL_ES
      gl_PointSize *= ( 1.0 / gl_Position.w );
    #endif
  }
`

const farBackgroundFragmentShader = /* glsl */ `
  precision highp float;

  varying float vElevation;
  varying float vDistance;

  void main() {
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r2 = dot(cxy, cxy);
  if (r2 > 1.0) discard;

  // More pronounced atmospheric color with enhanced variation
  vec3 color = vec3(0.0, 0.08, 0.15);
  color += vec3(0.0, 0.04, 0.08) * sin(vElevation * 2.0);

  // Maximum distance-based blur for far background
  float distanceBlurFactor = smoothstep(6.0, 15.0, vDistance);
  float blurRadius = mix(0.08, 0.01, distanceBlurFactor); // Very soft to ultra-soft

  // Enhanced atmospheric blur with maximum distance-based softness
  float alpha = smoothstep(blurRadius, 0.0, r2) * 0.05;

  gl_FragColor = vec4(color, alpha);
}
`

/*--------------------------------------------------------------
  Foam particle shaders (sharp bubbles in foreground)
----------------------------------------------------------------*/

const foamVertexShader = /* glsl */ `
  uniform float uTime;
  varying float vElevation;
  varying float vFoamIntensity;
  varying float vDistance;
  varying float vRandomness;

  // Same noise function
  vec3 permute(vec3 x){ return mod((x*34.0+1.0)*x,289.0); }
  vec4 permute(vec4 x){ return mod((x*34.0 + 1.0)*x, 289.0); }
  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy , y.xy );
    vec4 b1 = vec4( x.zw , y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy , h.x);
    vec3 p1 = vec3(a0.zw , h.y);
    vec3 p2 = vec3(a1.xy , h.z);
    vec3 p3 = vec3(a1.zw , h.w);

    vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec3 pos = position;

    // Same dramatic wave calculation as foreground
    float time = uTime * 0.25;
    float primaryWave = snoise(vec3(pos.x * 0.2 + pos.y * 0.1, pos.y * 0.3, time)) * 1.2;
    float secondaryWave = snoise(vec3(pos.x * 0.5 - pos.y * 0.2, pos.y * 0.6, time * 1.3)) * 0.8;
    float crossWave = snoise(vec3(pos.x * 0.3 + pos.y * 0.4, pos.y * 0.4, time * 0.8)) * 0.6;
    
    float elevation = primaryWave + secondaryWave + crossWave;
    
    // Add bubble-specific turbulence
    float bubbleTurbulence = snoise(vec3(pos.x * 5.0, pos.y * 5.0, time * 5.0)) * 0.1;
    elevation += bubbleTurbulence;
    
    // Generate randomness for each bubble
    float bubbleId = pos.x * 123.45 + pos.y * 67.89;
    vRandomness = snoise(vec3(bubbleId, bubbleId * 2.0, time * 0.1));
    
    // Show bubbles dramatically on wave crests and troughs
    vFoamIntensity = smoothstep(0.3, 1.2, abs(elevation)) * (0.7 + vRandomness * 0.6);
    
    // Position with variation
    pos.z += elevation - 0.1 + vRandomness * 0.05;
    
    // Add some random horizontal displacement
    pos.x += vRandomness * 0.02;
    pos.y += snoise(vec3(bubbleId * 2.0, bubbleId, time * 0.1)) * 0.02;

    vElevation = elevation;
    
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vDistance = length(worldPos.xyz - cameraPosition);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    
    // Small, sharp bubbles for foreground
    float pointSize = (6.0 + vRandomness * 4.0) / (1.0 + vDistance * 0.15);
    gl_PointSize = pointSize * vFoamIntensity;
    
    #ifdef GL_ES
      gl_PointSize *= ( 1.0 / gl_Position.w );
    #endif
  }
`

const foamFragmentShader = /* glsl */ `
  precision highp float;

  varying float vElevation;
  varying float vFoamIntensity;
  varying float vDistance;
  varying float vRandomness;

  void main() {
  if (vFoamIntensity < 0.1) discard;
  
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r2 = dot(cxy, cxy);
  if (r2 > 1.0) discard;

  // Sharp, bright air bubbles with variation
  vec3 bubbleColor = vec3(1.0, 1.0, 1.0);
  bubbleColor = mix(bubbleColor, vec3(0.7, 1.0, 1.0), 0.4 + vRandomness * 0.3);

  // Create irregular bubble shapes instead of perfect circles
  float irregularity = sin(cxy.x * 8.0 + vRandomness * 10.0) * cos(cxy.y * 6.0 + vRandomness * 8.0) * 0.3;
  float modifiedR2 = r2 + irregularity * 0.2;
  
  // Random darkening for some bubbles
  float darkening = sin(vRandomness * 20.0) * 0.4;
  bubbleColor *= (0.7 + darkening);

  // Distance-based blur for foam particles (subtle effect to maintain sharpness)
  float distanceBlurFactor = smoothstep(2.0, 10.0, vDistance);
  float blurRadius = mix(1.0, 0.6, distanceBlurFactor);

  // Sharp alpha for crisp bubbles with distance-based softening
  float alpha = smoothstep(blurRadius, 0.4, modifiedR2) * vFoamIntensity * (0.8 + vRandomness * 0.2);

  // Enhanced distance fade with depth transparency
  alpha *= smoothstep(12.0, 2.0, vDistance) * 0.9; // Add depth transparency factor

  gl_FragColor = vec4(bubbleColor, alpha);
}
`

/*--------------------------------------------------------------
  Animated Camera Component
----------------------------------------------------------------*/
function AnimatedCamera() {
  const { camera } = useThree()

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    // Underwater camera movement
    const x = Math.sin(time * 0.12) * 0.3 + Math.cos(time * 0.08) * 0.1
    const y = Math.sin(time * 0.09) * 0.2 + Math.cos(time * 0.06) * 0.15
    const z = -2.2 + Math.sin(time * 0.07) * 0.3 // Deeper for better depth of field

    camera.position.set(x, y, z)
    camera.rotation.z = Math.sin(time * 0.05) * 0.02 + Math.cos(time * 0.03) * 0.01
    camera.lookAt(0, 0, 2) // Look up towards surface
  })

  return null
}

/*--------------------------------------------------------------
  React component
--------------------------------------------------------------*/

export default function CyberpunkWaves() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, -2.2], fov: 100 }}>
        <AnimatedCamera />
        <FarBackgroundWaves />
        <BackgroundWaves />
        <MidgroundWaves />
        <ForegroundWaves />
        <FoamParticles />
        <SprayParticles />
      </Canvas>
    </div>
  )
}

/*--------------------------------------------------------------
  Far background wave layer (extreme blur)
----------------------------------------------------------------*/
function FarBackgroundWaves() {
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

  return (
    <points
      ref={pointsRef}
      rotation={[-Math.PI / 8, 0, Math.PI / 16]}
      scale={[50, 50, 1]} // Even larger scale
      position={[0, 0, 8]} // Much further back
    >
      <planeGeometry args={[1, 1, 12, 12]} /> {/* Even lower resolution for maximum blur */}
      <shaderMaterial
        vertexShader={farBackgroundVertexShader}
        fragmentShader={farBackgroundFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  )
}

/*--------------------------------------------------------------
  Background wave layer (heavy blur)
----------------------------------------------------------------*/
function BackgroundWaves() {
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

  return (
    <points
      ref={pointsRef}
      rotation={[-Math.PI / 9, 0, Math.PI / 18]}
      scale={[42, 42, 1]} // Larger scale
      position={[0, 0, 6]} // Further back
    >
      <planeGeometry args={[1, 1, 25, 25]} /> {/* Lower resolution for heavy blur */}
      <shaderMaterial
        vertexShader={backgroundVertexShader}
        fragmentShader={backgroundFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  )
}

/*--------------------------------------------------------------
  Mid-ground wave layer (medium blur)
----------------------------------------------------------------*/
function MidgroundWaves() {
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

  return (
    <points
      ref={pointsRef}
      rotation={[-Math.PI / 12, 0, -Math.PI / 24]}
      scale={[28, 28, 1]}
      position={[0, 0, 2.8]} // Middle distance
    >
      <planeGeometry args={[1, 1, 80, 80]} /> {/* Medium resolution */}
      <shaderMaterial
        vertexShader={midgroundVertexShader}
        fragmentShader={midgroundFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  )
}

/*--------------------------------------------------------------
  Foreground wave layer (sharp)
----------------------------------------------------------------*/
function ForegroundWaves() {
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

  return (
    <points
      ref={pointsRef}
      rotation={[-Math.PI / 14, 0, -Math.PI / 28]}
      scale={[22, 22, 1]}
      position={[0, 0, 2]} // Closest to camera
    >
      <planeGeometry args={[1, 1, 320, 320]} /> {/* High resolution for detail */}
      <shaderMaterial
        vertexShader={foregroundVertexShader}
        fragmentShader={foregroundFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  )
}

/*--------------------------------------------------------------
  Foam particles layer (sharp bubbles)
----------------------------------------------------------------*/
function FoamParticles() {
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

  return (
    <points ref={pointsRef} rotation={[-Math.PI / 14, 0, -Math.PI / 28]} scale={[22, 22, 1]} position={[0, 0, 1.7]}>
      <planeGeometry args={[1, 1, 150, 150]} />
      <shaderMaterial
        vertexShader={foamVertexShader}
        fragmentShader={foamFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  )
}