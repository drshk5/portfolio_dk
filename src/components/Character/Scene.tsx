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
    let activeTouchMoveHandler: ((e: TouchEvent) => void) | null = null;

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

          // Correct bone name in Blender GLTF is spine.006
          headBone =
            loadedCharacter.getObjectByName("spine.006") ||
            loadedCharacter.getObjectByName("spine006") ||
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

    let debounce: number | undefined;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = window.setTimeout(() => {
        if (!element || isCancelled) return;
        const touchMoveHandler = (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }));
        activeTouchMoveHandler = touchMoveHandler;
        element.addEventListener("touchmove", touchMoveHandler as EventListener);
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    const animate = () => {
      if (isCancelled) return;
      animationFrameId = requestAnimationFrame(animate);

      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      renderer.render(scene, camera);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(debounce);
      clearTimeout(loadingFallback);
      progress.cancel();
      scene.clear();
      renderer.dispose();
      window.removeEventListener("resize", resizeForRenderer);

      if (canvasElement && renderer.domElement.parentNode === canvasElement) {
        canvasElement.removeChild(renderer.domElement);
      }

      document.removeEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
        if (activeTouchMoveHandler) {
          landingDiv.removeEventListener("touchmove", activeTouchMoveHandler as EventListener);
        }
      }
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
