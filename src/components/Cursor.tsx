import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let hover = false;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const mousePos = { x: -100, y: -100 };
    const cursorPos = { x: -100, y: -100 };
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = "1";
      }
    };
    document.addEventListener("mousemove", onMouseMove);

    let rafId: number;
    const loop = () => {
      if (!hover) {
        const delay = 5;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const elements = Array.from(document.querySelectorAll("[data-cursor]")) as HTMLElement[];
    const handlers: Array<{ over: (e: Event) => void; out: (e?: Event) => void }> = [];
    elements.forEach((element) => {
      const over = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          cursor.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      const out = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };
      handlers.push({ over, out });
      element.addEventListener("mouseover", over as EventListener);
      element.addEventListener("mouseout", out as EventListener);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      elements.forEach((el, i) => {
        el.removeEventListener("mouseover", handlers[i].over as EventListener);
        el.removeEventListener("mouseout", handlers[i].out as EventListener);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
