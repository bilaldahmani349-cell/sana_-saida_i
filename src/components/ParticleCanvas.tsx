import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: "heart" | "petal" | "star";
  rotation: number;
  rotationSpeed: number;
  color: string;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const count = Math.min(width > 768 ? 40 : 22, 50);

    const colors = [
      "rgba(244, 114, 182, 0.7)",  // pink-400
      "rgba(251, 113, 133, 0.7)",  // rose-400
      "rgba(192, 132, 252, 0.6)",  // purple-400
      "rgba(251, 191, 36, 0.65)",  // amber-400 (gold)
      "rgba(244, 63, 94, 0.65)",   // rose-500
    ];

    for (let i = 0; i < count; i++) {
      const typeChoice = Math.random();
      const type: "heart" | "petal" | "star" =
        typeChoice < 0.45 ? "heart" : typeChoice < 0.8 ? "petal" : "star";

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === "heart" ? 10 + Math.random() * 12 : type === "petal" ? 8 + Math.random() * 8 : 4 + Math.random() * 5,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: type === "heart" ? -0.4 - Math.random() * 0.7 : 0.4 + Math.random() * 0.8,
        opacity: 0.3 + Math.random() * 0.6,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const drawHeart = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size / 15, size / 15);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-5, -6, -12, -2, -12, 6);
      ctx.bezierCurveTo(-12, 14, -2, 18, 0, 23);
      ctx.bezierCurveTo(2, 18, 12, 14, 12, 6);
      ctx.bezierCurveTo(12, -2, 5, -6, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const drawPetal = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.6, size * 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (x: number, y: number, size: number, color: string) => {
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = "#fef08a";
      ctx.shadowBlur = 8;
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around boundaries
        if (p.type === "heart") {
          if (p.y < -30) {
            p.y = height + 30;
            p.x = Math.random() * width;
          }
        } else {
          if (p.y > height + 30) {
            p.y = -30;
            p.x = Math.random() * width;
          }
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        if (p.type === "heart") {
          drawHeart(p.x, p.y, p.size, p.color, p.rotation);
        } else if (p.type === "petal") {
          drawPetal(p.x, p.y, p.size, p.color, p.rotation);
        } else {
          drawStar(p.x, p.y, p.size, p.color);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
