'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface TShirtCanvasProps {
  graphicUrl: string;
  shirtColor?: string;
  size?: string;
  isBackView?: boolean;
  onViewChange?: (isBack: boolean) => void;
  className?: string;
  interactive?: boolean;
  autoRotate?: boolean;
  accentGlow?: boolean;
}

export default function TShirtCanvas({
  graphicUrl,
  shirtColor = '#121214',
  size = 'L',
  isBackView = false,
  onViewChange,
  className = 'w-full h-full min-h-[420px]',
  interactive = true,
  autoRotate = false,
  accentGlow = true,
}: TShirtCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const shirtGroupRef = useRef<THREE.Group | null>(null);
  const canvasTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [currentRotationY, setCurrentRotationY] = useState(isBackView ? Math.PI : 0);
  const targetRotationY = useRef(isBackView ? Math.PI : 0);
  const targetRotationX = useRef(0);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // Update target rotation when isBackView prop changes externally
  useEffect(() => {
    targetRotationY.current = isBackView ? Math.PI : 0;
  }, [isBackView]);

  // Generates procedural cotton fabric bump map
  const createFabricBumpMap = () => {
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 512;
    bumpCanvas.height = 512;
    const ctx = bumpCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 512, 512);

      // Micro cotton weave pattern
      ctx.fillStyle = '#888888';
      for (let y = 0; y < 512; y += 4) {
        for (let x = 0; x < 512; x += 4) {
          if ((x / 4 + y / 4) % 2 === 0) {
            ctx.fillRect(x, y, 2, 2);
          }
        }
      }

      // Natural cloth folds
      const foldGrad = ctx.createLinearGradient(0, 0, 512, 512);
      foldGrad.addColorStop(0, 'rgba(0,0,0,0.08)');
      foldGrad.addColorStop(0.3, 'rgba(255,255,255,0.06)');
      foldGrad.addColorStop(0.7, 'rgba(0,0,0,0.05)');
      foldGrad.addColorStop(1, 'rgba(255,255,255,0.04)');
      ctx.fillStyle = foldGrad;
      ctx.fillRect(0, 0, 512, 512);
    }
    const texture = new THREE.CanvasTexture(bumpCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    return texture;
  };

  // Redraws the composite T-shirt texture with current graphic & base color
  const updateShirtTexture = useCallback(async (color: string, url: string) => {
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
      offscreenCanvasRef.current.width = 1024;
      offscreenCanvasRef.current.height = 1024;
    }

    const canvas = offscreenCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Fill base garment color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1024, 1024);

    // 2. Add realistic subtle fabric heather/texture
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    for (let i = 0; i < 4000; i++) {
      const rx = Math.random() * 1024;
      const ry = Math.random() * 1024;
      ctx.fillRect(rx, ry, 1, 1);
    }

    // 3. Draw DTG graphic on chest
    if (url) {
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => {
            // fallback if remote image has cors issue
            resolve(null);
          };
          img.src = url;
        });

        if (img.width > 0) {
          // Chest placement area (512x512 centered on upper chest)
          const targetW = 440;
          const targetH = 440;
          const aspect = img.width / img.height;
          let drawW = targetW;
          let drawH = targetW / aspect;
          if (drawH > targetH) {
            drawH = targetH;
            drawW = targetH * aspect;
          }

          const posX = (1024 - drawW) / 2;
          const posY = 260 + (targetH - drawH) / 2; // Upper chest placement

          // Subtle shadow under graphic decal for DTG tactile feel
          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.3)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetY = 2;

          // Draw graphic
          ctx.drawImage(img, posX, posY, drawW, drawH);
          ctx.restore();

          // Overlay subtle fabric grain over graphic for realistic printed ink absorption
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = 'rgba(230, 230, 230, 0.96)';
          ctx.fillRect(posX, posY, drawW, drawH);
          ctx.globalCompositeOperation = 'source-over';
        }
      } catch (e) {
        console.warn('Error rendering graphic to texture:', e);
      }
    }

    if (canvasTextureRef.current) {
      canvasTextureRef.current.needsUpdate = true;
    }
    setLoading(false);
  }, []);

  // Construct Realistic Heavyweight Streetwear Boxy T-Shirt Mesh
  const buildTShirtMesh = (fabricBump: THREE.Texture) => {
    const shirtGroup = new THREE.Group();

    // Custom Canvas Texture for chest print & garment
    offscreenCanvasRef.current = document.createElement('canvas');
    offscreenCanvasRef.current.width = 1024;
    offscreenCanvasRef.current.height = 1024;
    const canvasTexture = new THREE.CanvasTexture(offscreenCanvasRef.current);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    canvasTextureRef.current = canvasTexture;

    // Garment Material with cotton roughness & specular highlights
    const shirtMaterial = new THREE.MeshStandardMaterial({
      map: canvasTexture,
      bumpMap: fabricBump,
      bumpScale: 0.012,
      roughness: 0.88,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    // 1. Torso Geometry: Boxy streetwear silhouette with subtle drop shoulder
    const torsoShape = new THREE.Shape();
    // Start at bottom hem
    torsoShape.moveTo(-1.3, -1.8);
    torsoShape.lineTo(1.3, -1.8);
    // Right side seam
    torsoShape.lineTo(1.35, 0.7);
    // Right underarm
    torsoShape.lineTo(1.4, 0.9);
    // Right shoulder drop
    torsoShape.lineTo(1.5, 1.45);
    torsoShape.lineTo(0.65, 1.6);
    // Crewneck collar cutout curve
    torsoShape.bezierCurveTo(0.4, 1.35, -0.4, 1.35, -0.65, 1.6);
    // Left shoulder drop
    torsoShape.lineTo(-1.5, 1.45);
    torsoShape.lineTo(-1.4, 0.9);
    // Left side seam
    torsoShape.lineTo(-1.35, 0.7);
    torsoShape.lineTo(-1.3, -1.8);

    const extrudeSettings = {
      depth: 0.45,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.09,
      bevelThickness: 0.09,
    };

    const torsoGeo = new THREE.ExtrudeGeometry(torsoShape, extrudeSettings);
    torsoGeo.center();

    // Map planar UV coordinates for torso so chest print renders centered & crisp
    const posAttr = torsoGeo.attributes.position;
    const uvAttr = torsoGeo.attributes.uv;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);

      // Front facing vertices get standard UV mapping for graphic projection
      if (z > 0.1) {
        const u = (x + 1.6) / 3.2;
        const v = (y + 1.8) / 3.6;
        uvAttr.setXY(i, Math.max(0, Math.min(1, u)), Math.max(0, Math.min(1, v)));
      }
    }
    uvAttr.needsUpdate = true;

    const torsoMesh = new THREE.Mesh(torsoGeo, shirtMaterial);
    torsoMesh.castShadow = true;
    torsoMesh.receiveShadow = true;
    shirtGroup.add(torsoMesh);

    // 2. Ribbed Crewneck Collar Ring
    const collarGeo = new THREE.TorusGeometry(0.55, 0.08, 16, 48);
    collarGeo.rotateX(Math.PI / 2.3);
    const collarMesh = new THREE.Mesh(collarGeo, shirtMaterial);
    collarMesh.position.set(0, 1.48, 0.08);
    shirtGroup.add(collarMesh);

    // 3. Right Drop Sleeve (Oversized Streetwear Cut)
    const rightSleeveGeo = new THREE.CylinderGeometry(0.48, 0.42, 1.1, 24, 1, true);
    rightSleeveGeo.rotateZ(-Math.PI / 3.4);
    const rightSleeveMesh = new THREE.Mesh(rightSleeveGeo, shirtMaterial);
    rightSleeveMesh.position.set(1.95, 0.95, 0);
    rightSleeveMesh.castShadow = true;
    shirtGroup.add(rightSleeveMesh);

    // 4. Left Drop Sleeve
    const leftSleeveGeo = new THREE.CylinderGeometry(0.48, 0.42, 1.1, 24, 1, true);
    leftSleeveGeo.rotateZ(Math.PI / 3.4);
    const leftSleeveMesh = new THREE.Mesh(leftSleeveGeo, shirtMaterial);
    leftSleeveMesh.position.set(-1.95, 0.95, 0);
    leftSleeveMesh.castShadow = true;
    shirtGroup.add(leftSleeveMesh);

    // 5. Bottom Hem Ribbing band
    const hemGeo = new THREE.BoxGeometry(2.72, 0.12, 0.52);
    const hemMesh = new THREE.Mesh(hemGeo, shirtMaterial);
    hemMesh.position.set(0, -1.82, 0);
    shirtGroup.add(hemMesh);

    return shirtGroup;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting Studio
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    // Key Light (top-front-right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(3, 4, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Soft Fill Light (front-left)
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.85);
    fillLight.position.set(-4, 2, 4);
    scene.add(fillLight);

    // Back / Rim Light for garment silhouette edge
    const rimLight = new THREE.DirectionalLight(0xd4ff00, 0.7);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    // Floor Contact Shadow plane
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Build 3D T-shirt
    const fabricBump = createFabricBumpMap();
    const shirtGroup = buildTShirtMesh(fabricBump);
    shirtGroup.position.set(0, 0.1, 0);
    scene.add(shirtGroup);
    shirtGroupRef.current = shirtGroup;

    // Load initial texture
    updateShirtTexture(shirtColor, graphicUrl);

    // Render loop with smooth spring damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (shirtGroupRef.current) {
        // Auto-rotation when idle
        if (autoRotate && !isDragging.current) {
          targetRotationY.current += 0.006;
        }

        // Smooth spring interpolation for Y rotation
        shirtGroupRef.current.rotation.y +=
          (targetRotationY.current - shirtGroupRef.current.rotation.y) * 0.1;

        // Smooth pitch interpolation for X rotation (restricted angle)
        shirtGroupRef.current.rotation.x +=
          (targetRotationX.current - shirtGroupRef.current.rotation.x) * 0.1;

        // Subtle gentle breathing float
        shirtGroupRef.current.position.y = 0.1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update texture when graphicUrl or shirtColor change
  useEffect(() => {
    updateShirtTexture(shirtColor, graphicUrl);

    // Add a satisfying tactile bounce rotation whenever the design changes
    if (shirtGroupRef.current) {
      targetRotationY.current += 0.28;
      setTimeout(() => {
        targetRotationY.current -= 0.28;
      }, 220);
    }
  }, [graphicUrl, shirtColor, updateShirtTexture]);

  // Mouse & Touch Orbit Event Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    targetRotationY.current += deltaX * 0.01;
    targetRotationX.current = Math.max(-0.35, Math.min(0.35, targetRotationX.current + deltaY * 0.006));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!interactive || e.touches.length === 0) return;
    isDragging.current = true;
    previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!interactive || !isDragging.current || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

    targetRotationY.current += deltaX * 0.012;
    targetRotationX.current = Math.max(-0.35, Math.min(0.35, targetRotationX.current + deltaY * 0.008));

    previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Quick Action: Flip Front / Back
  const toggleView = () => {
    const nextIsBack = !isBackView;
    targetRotationY.current = nextIsBack ? Math.PI : 0;
    targetRotationX.current = 0;
    onViewChange?.(nextIsBack);
  };

  const resetCamera = () => {
    targetRotationY.current = 0;
    targetRotationX.current = 0;
    onViewChange?.(false);
  };

  return (
    <div className={`relative flex items-center justify-center select-none overflow-hidden ${className}`}>
      {/* Background radial glow */}
      {accentGlow && (
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(212, 255, 0, 0.18) 0%, transparent 68%)',
          }}
        />
      )}

      {/* 3D Canvas Mount */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`w-full h-full cursor-grab active:cursor-grabbing touch-none ${
          interactive ? '' : 'pointer-events-none'
        }`}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-black/60 backdrop-blur-sm pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-card border border-surface-border text-brand-neon font-mono text-xs uppercase tracking-widest animate-pulse">
            <span className="w-2 h-2 rounded-full bg-brand-neon animate-ping" />
            Generating 3D DTG Decal...
          </div>
        </div>
      )}

      {/* Interactive Controls Overlay */}
      {interactive && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Streetwear Garment Tag */}
          <div className="pointer-events-auto bg-surface-black/85 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[11px] font-mono text-zinc-300 flex items-center gap-2 shadow-tactile-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-neon" />
            <span>240 GSM HEAVYWEIGHT</span>
            <span className="text-zinc-500">•</span>
            <span className="text-white font-bold">{size} FIT</span>
          </div>

          {/* Camera Shortcuts */}
          <div className="pointer-events-auto flex items-center gap-1.5 bg-surface-black/85 backdrop-blur-md border border-white/10 p-1 shadow-tactile-sm">
            <button
              onClick={toggleView}
              className="px-2 py-1 text-[10px] font-mono uppercase font-bold text-white hover:text-brand-neon hover:bg-white/10 transition-colors"
              title="Flip to Front/Back"
            >
              {isBackView ? 'FRONT VIEW' : 'BACK VIEW'}
            </button>
            <span className="text-zinc-600">|</span>
            <button
              onClick={resetCamera}
              className="px-1.5 py-1 text-[10px] font-mono uppercase text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Reset 3D Angle"
            >
              RESET 360°
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
