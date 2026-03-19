"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import { cn } from "../../lib/utils";

const getDeviceInfo = () => ({
    screenWidth: () => Math.max(0, window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0),
    screenHeight: () => Math.max(0, window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0),
    screenRatio() { return this.screenWidth() / this.screenHeight(); },
    screenCenterX() { return this.screenWidth() / 2; },
    screenCenterY() { return this.screenHeight() / 2; },
});

const addEase = (pos, to, ease) => {
    pos.x += (to.x - pos.x) / ease;
    pos.y += (to.y - pos.y) / ease;
    pos.z += (to.z - pos.z) / ease;
};

const AnimatedWave = ({
                          className,
                          speed = 0.015,
                          amplitude = 30,
                          smoothness = 300,
                          wireframe = true,
                          waveColor,
                          opacity = 1,
                          mouseInteraction = true,
                          quality = "medium",
                          fov = 60,
                          waveOffsetY = -300,
                          waveRotation = 29.8,
                          cameraDistance = -1000,
                          backgroundColor,
                          ease = 12,
                      }) => {
    const containerRef = useRef(null);
    const sceneRef = useRef({
        scene: null,
        camera: null,
        renderer: null,
        groundPlain: null,
        animationFrameId: null,
        mouse: { x: 0, y: 0 },
    });

    const [webGLFailed, setWebGLFailed] = useState(false);

    const getQualitySettings = useCallback((q) => {
        if (q === "low") return { width: 64, height: 32 };
        if (q === "high") return { width: 256, height: 128 };
        return { width: 128, height: 64 };
    }, []);

    const determineWaveColor = useCallback(() => {
        if (waveColor) return new THREE.Color(waveColor);
        return new THREE.Color(0x000000);
    }, [waveColor]);

    const createGroundPlain = useCallback(() => {
        const { width, height } = getQualitySettings(quality);

        return {
            group: null,
            geometry: null,
            material: null,
            plane: null,
            simplex: createNoise2D(),
            factor: smoothness,
            scale: amplitude,
            speed,
            cycle: 0,
            ease,
            move: new THREE.Vector3(0, waveOffsetY, cameraDistance),
            look: new THREE.Vector3((waveRotation * Math.PI) / 180, 0, 0),
            _originalPositions: new Float32Array(),

            create(scene) {
                this.group = new THREE.Object3D();
                this.group.position.copy(this.move);
                this.group.rotation.copy(this.look);

                this.geometry = new THREE.PlaneGeometry(4000, 2000, width, height);
                this._originalPositions = new Float32Array(this.geometry.attributes.position.array);

                this.material = new THREE.MeshLambertMaterial({
                    color: determineWaveColor(),
                    opacity,
                    wireframe,
                    transparent: opacity < 1,
                    depthWrite: opacity >= 1,
                    side: THREE.DoubleSide,
                });

                this.plane = new THREE.Mesh(this.geometry, this.material);
                this.group.add(this.plane);
                scene.add(this.group);
            },

            moveNoise() {
                const pos = this.geometry.attributes.position;
                for (let i = 0; i < pos.count; i++) {
                    const ox = this._originalPositions[i * 3];
                    const oy = this._originalPositions[i * 3 + 1];
                    const z = this.simplex(ox / this.factor, oy / this.factor + this.cycle) * this.scale;
                    pos.setXYZ(i, ox, oy, z);
                }
                pos.needsUpdate = true;
                this.cycle += this.speed;
            },

            update(mouse) {
                this.moveNoise();
                if (mouseInteraction && this.group) {
                    this.move.x = -mouse.x * 0.04;
                    this.move.y = waveOffsetY + mouse.y * 0.04;
                    addEase(this.group.position, this.move, this.ease);
                }
            },

            dispose() {
                this.geometry?.dispose();
                this.material?.dispose();
            },
        };
    }, [quality, smoothness, amplitude, speed, ease, waveOffsetY, cameraDistance, waveRotation, determineWaveColor, opacity, wireframe, mouseInteraction, getQualitySettings]);

    const setupScene = useCallback(() => {
        if (!containerRef.current) return;

        const device = getDeviceInfo();
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(fov, device.screenRatio(), 0.1, 20000);

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(device.screenWidth(), device.screenHeight());
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            containerRef.current.appendChild(renderer.domElement);
        } catch {
            setWebGLFailed(true);
            return;
        }

        const light = new THREE.PointLight(determineWaveColor(), 4, 1000);
        light.position.set(0, 200, -500);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        const ground = createGroundPlain();
        ground.create(scene);

        sceneRef.current = { scene, camera, renderer, groundPlain: ground, animationFrameId: null, mouse: { x: 0, y: 0 } };

        const animate = () => {
            ground.update(sceneRef.current.mouse);
            renderer.render(scene, camera);
            sceneRef.current.animationFrameId = requestAnimationFrame(animate);
        };

        // Start the animation
        animate();

        // Return cleanup function
        return () => {
            if (sceneRef.current.animationFrameId) {
                cancelAnimationFrame(sceneRef.current.animationFrameId);
            }
            ground.dispose();
            renderer.dispose();
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, [fov, determineWaveColor, createGroundPlain]);

    useEffect(() => {
        const cleanup = setupScene();
        return () => {
            if (cleanup) cleanup();
        };
    }, [setupScene]);

    return (
        <div className={cn("relative w-full h-full", className)}
             style={{ backgroundColor: backgroundColor || "transparent" }}>
            <div ref={containerRef} className="w-full h-full" style={{ pointerEvents: "none" }}>
                {webGLFailed && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm">
                        WebGL not supported
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimatedWave;