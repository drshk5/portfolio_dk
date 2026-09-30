import * as THREE from "three";

export const handleMouseMove = (
  event: MouseEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchMove = (
  event: TouchEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchEnd = (
  setMousePosition: (
    x: number,
    y: number,
    interpolationX: number,
    interpolationY: number
  ) => void
) => {
  setTimeout(() => {
    setMousePosition(0, 0, 0.03, 0.03);
    setTimeout(() => {
      setMousePosition(0, 0, 0.1, 0.2);
    }, 1000);
  }, 2000);
};

export const handleHeadRotation = (
  headBone: THREE.Object3D,
  neckBone: THREE.Object3D | null,
  mouseX: number,
  mouseY: number,
  _interpolationX: number,
  _interpolationY: number,
  lerp: (x: number, y: number, t: number) => number,
  time?: number
) => {
  if (!headBone) return;

  if (window.scrollY < 300) {
    // Rest angles from Blender GLTF:
    // head (spine.006): x = -0.326 rad (~ -18.7 deg), y = 0, z = 0
    // neck (spine.005): x = +0.454 rad (~ +26.0 deg), y = 0, z = 0
    const baseHeadPitch = -0.326;
    const baseNeckPitch = 0.454;

    const maxYaw = 0.55; // ~31 degrees horizontal range
    const maxPitch = 0.32; // ~18 degrees vertical range

    // Subtle natural breathing / idle sway when cursor is still
    const idleYaw = typeof time === "number" ? Math.sin(time * 1.5) * 0.025 : 0;
    const idlePitch = typeof time === "number" ? Math.cos(time * 2.0) * 0.015 : 0;

    const targetYaw = THREE.MathUtils.clamp(mouseX * maxYaw, -maxYaw, maxYaw) + idleYaw;
    const targetPitch = THREE.MathUtils.clamp(-mouseY * maxPitch, -maxPitch, maxPitch * 0.8) + idlePitch;

    // Head takes 70% of motion
    headBone.rotation.y = lerp(headBone.rotation.y, targetYaw * 0.7, 0.08);
    headBone.rotation.x = lerp(headBone.rotation.x, baseHeadPitch + targetPitch * 0.7, 0.08);

    // Neck takes 30% of motion for lifelike looking motion
    if (neckBone) {
      neckBone.rotation.y = lerp(neckBone.rotation.y, targetYaw * 0.3, 0.08);
      neckBone.rotation.x = lerp(neckBone.rotation.x, baseNeckPitch + targetPitch * 0.3, 0.08);
    }
  } else {
    // Turn head towards computer monitor / workstation as user scrolls into the site
    headBone.rotation.x = lerp(headBone.rotation.x, -0.25, 0.04);
    headBone.rotation.y = lerp(headBone.rotation.y, -0.2, 0.04);
  }
};


