import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();
  const [/*character*/, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    const canvasElement = canvasDiv.current;
    if (!canvasElement) return;

    let isCancelled = false;
    let animationFrameId = 0;

    // Clear any existing canvas elements to prevent duplicate layers
    while (canvasElement.firstChild) {
      canvasElement.removeChild(canvasElement.firstChild);
    }

    const rect = canvasElement.getBoundingClientRect();
    const container = { width: rect.width || window.innerWidth, height: rect.height || window.innerHeight };
    const aspect = container.width / container.height;
    
    // Fresh scene instance for this mount cycle
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasElement.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.z = 10;
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let neckBone: THREE.Object3D | null = null;
    let screenLight: THREE.Mesh | null = null;
    let mixer: THREE.AnimationMixer | null = null;

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);
    let characterLoadFinished = false;

    const loadingFallback = window.setTimeout(() => {
      if (!characterLoadFinished && !isCancelled) {
        console.warn(
          "3D character is taking longer than expected; showing portfolio content."
        );
        progress.clear();
      }
    }, 12000);

    let loadedCharacter: THREE.Object3D | null = null;

    const resizeForRenderer = () => {
      if (isCancelled || !canvasDiv.current || !loadedCharacter) return;
      handleResize(renderer, camera, canvasDiv, loadedCharacter);
    };

    let hoverCleanup: (() => void) | null = null;

    loadCharacter()
      .then((gltf) => {
        if (isCancelled) return;
        characterLoadFinished = true;
        clearTimeout(loadingFallback);

        if (gltf) {
          // Clear any previous objects from the scene before adding
          while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
          }

          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            const cleanup = animations.hover(gltf, hoverDivRef.current);
            if (cleanup) hoverCleanup = cleanup;
          }
          mixer = animations.mixer;
          loadedCharacter = gltf.scene;
          setChar(loadedCharacter);
          scene.add(loadedCharacter);

          // Correct bone names in Blender GLTF: spine.006 (head), spine.005 (neck)
          headBone =
            loadedCharacter.getObjectByName("spine.006") ||
            loadedCharacter.getObjectByName("spine006") ||
            null;
          neckBone =
            loadedCharacter.getObjectByName("spine.005") ||
            loadedCharacter.getObjectByName("spine005") ||
            null;

          screenLight =
            (loadedCharacter.getObjectByName("screenlight") as THREE.Mesh) || null;

          progress.loaded().then(() => {
            if (isCancelled) return;
            setTimeout(() => {
              if (isCancelled) return;
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });

          window.addEventListener("resize", resizeForRenderer);
        }
      })
      .catch((error) => {
        if (isCancelled) return;
        characterLoadFinished = true;
        clearTimeout(loadingFallback);
        console.error("Unable to load 3D character:", error);
        progress.clear();
      });

    let mouse = { x: 0, y: 0 },
      interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    const onTouch = (event: TouchEvent) => {
      if (event.touches && event.touches.length > 0) {
        handleTouchMove(event, (x, y) => (mouse = { x, y }));
      }
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    const onDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null && event.beta !== null) {
        const tiltX = THREE.MathUtils.clamp(event.gamma / 25, -1, 1);
        const tiltY = THREE.MathUtils.clamp((event.beta - 45) / 25, -1, 1);
        mouse = { x: tiltX, y: tiltY };
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });
    }

    const animate = () => {
      if (isCancelled) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // 1. Update base skeletal animations (typing, blinking, etc.) first
      if (mixer) {
        mixer.update(delta);
      }

      // 2. Apply head & neck procedural cursor tracking AFTER mixer.update
      // This prevents the animation mixer keyframes from overwriting cursor tracking
      if (headBone) {
        handleHeadRotation(
          headBone,
          neckBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp,
          elapsedTime
        );
        light.setPointLight(screenLight);
      }

      // 3. Render frame
      renderer.render(scene, camera);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(loadingFallback);
      progress.cancel();
      scene.clear();
      renderer.dispose();
      window.removeEventListener("resize", resizeForRenderer);

      if (canvasElement && renderer.domElement.parentNode === canvasElement) {
        canvasElement.removeChild(renderer.domElement);
      }

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("deviceorientation", onDeviceOrientation);

      if (hoverCleanup) hoverCleanup();
    };
  }, [setLoading]);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
