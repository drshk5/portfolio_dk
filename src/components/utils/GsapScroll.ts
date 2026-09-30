import * as THREE from "three";
import gsap from "gsap";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  let screenLight: THREE.Mesh | null = null,
    monitor: THREE.Mesh | null = null;
  character?.children.forEach((object: THREE.Object3D) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.transparent = true;
          material.opacity = 0;
          if (material.name === "Material.018") {
            monitor = mesh;
            material.color.set("#FFFFFF");
          }
        }
      });
    }
    if (object.name === "screenlight") {
      if ((object as THREE.Mesh).isMesh) {
        const mesh = object as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.transparent = true;
        material.opacity = 0;
        material.emissive.set("#B0F5EA");
        gsap.timeline({ repeat: -1, repeatRefresh: true }).to(material, {
          emissiveIntensity: () => intensity * 8,
          duration: () => Math.random() * 0.6,
          delay: () => Math.random() * 0.1,
        });
        screenLight = mesh;
      }
    }
  });

  const neckBone =
    character?.getObjectByName("spine.005") ||
    character?.getObjectByName("spine005");

  if (character) {
    const isMobile = window.innerWidth <= 1024;

    tl1
      .fromTo(character.rotation, { y: 0 }, { y: isMobile ? 0.5 : 0.7, duration: 1 }, 0)
      .to(camera.position, { z: isMobile ? 24 : 22 }, 0)
      .fromTo(".character-model", { x: 0 }, { x: isMobile ? "0%" : "-25%", duration: 1 }, 0)
      .to([".landing-container", ".landing-bg-text"], { opacity: 0, duration: 0.4 }, 0)
      .to([".landing-container", ".landing-bg-text"], { y: "40%", duration: 0.8 }, 0)
      .fromTo(".about-me", { y: isMobile ? "-15%" : "-50%" }, { y: "0%" }, 0);

    tl2
      .to(
        camera.position,
        {
          z: isMobile ? 68 : 75,
          y: isMobile ? 8.0 : 8.4,
          duration: 6,
          delay: 2,
          ease: "power3.inOut",
        },
        0
      )
      .to(".about-section", { y: isMobile ? "15%" : "30%", duration: 6 }, 0)
      .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
      .fromTo(
        ".character-model",
        { pointerEvents: "inherit" },
        { pointerEvents: "none", x: isMobile ? "0%" : "-12%", delay: 2, duration: 5 },
        0
      )
      .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0);

    if (neckBone) {
      tl2.to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0);
    }
    if (monitor) {
      const mon = monitor as THREE.Mesh;
      tl2.to(mon.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0);
      tl2.fromTo(
        mon.position,
        { y: -10, z: 2 },
        { y: 0, z: 0, delay: 1.5, duration: 3 },
        0
      );
    }
    if (screenLight) {
      const light = screenLight as THREE.Mesh;
      tl2.to(light.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0);
    }

    tl2
      .fromTo(
        ".what-box-in",
        { opacity: 0.5 },
        { opacity: 1, duration: 0.5, delay: 5 },
        0
      )
      .fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
        0.3
      );

    tl3
      .fromTo(
        ".character-model",
        { y: "0%" },
        { y: "-100%", duration: 4, ease: "none", delay: 1 },
        0
      )
      .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
      .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
  }
}


export function setAllTimeline() {
  const isMobile = window.innerWidth <= 1024;
  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: isMobile ? "top 80%" : "top 30%",
      end: isMobile ? "bottom 85%" : "100% center",
      scrub: isMobile ? 0.6 : true,
      invalidateOnRefresh: true,
    },
  });
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "0%" },
      { maxHeight: "100%", duration: isMobile ? 0.8 : 0.5 },
      0
    )
    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.15 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0, y: isMobile ? 30 : 0 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "power2.out" },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (!isMobile) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  }
}
