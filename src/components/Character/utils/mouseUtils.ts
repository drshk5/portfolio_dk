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
  mouseX: number,
  mouseY: number,
  _interpolationX: number,
  _interpolationY: number,
  lerp: (x: number, y: number, t: number) => number
) => {
  if (!headBone) return;
  if (window.scrollY < 200) {
    // Smooth, natural bounds for head tracking (yaw and pitch)
    const maxYaw = 0.42; // ~24 degrees horizontal
    const maxPitch = 0.28; // ~16 degrees vertical

    const targetYaw = THREE.MathUtils.clamp(mouseX * maxYaw, -maxYaw, maxYaw);
    const targetPitch = THREE.MathUtils.clamp(-mouseY * maxPitch, -maxPitch, maxPitch * 0.8);

    headBone.rotation.y = lerp(headBone.rotation.y, targetYaw, 0.08);
    headBone.rotation.x = lerp(headBone.rotation.x, targetPitch, 0.08);
  } else {
    if (window.innerWidth > 1024) {
      headBone.rotation.x = lerp(headBone.rotation.x, -0.25, 0.04);
      headBone.rotation.y = lerp(headBone.rotation.y, -0.2, 0.04);
    }
  }
};
