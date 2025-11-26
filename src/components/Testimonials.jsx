/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

/* =========================
   Particle Background Component
   Responsive and dynamic particle drift effect
========================= */
function ParticleDriftBackground() {
  const ref = useRef();
  const BASE_HEIGHT = 400;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Resize canvas function
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = BASE_HEIGHT;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate particles
    let particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1.5 + Math.random() * 3.5,
      dx: -0.15 + Math.random() * 0.3,
      dy: -0.1 + Math.random() * 0.2,
      o: 0.2 + Math.random() * 0.3,
    }));

    let running = true;

    // Draw particles
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(99,102,241,${p.o})`;
        ctx.shadowColor = '#6366f1';
        ctx.shadowBlur = 18;
        ctx.fill();

        // Update particle position
        p.x += p.dx;
        p.y += p.dy;

        // Boundary wrapping
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      if (running) requestAnimationFrame(draw);
    }

    draw();

    return () => {
      running = false;
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      className="particle-drift-bg absolute top-0 left-0 w-full"
      style={{ height: `${BASE_HEIGHT}px`, overflow: 'hidden' }}
    >
      <canvas ref={ref} className="particle-drift-canvas" />
    </div>
  );
}
/* eslint-enable no-unused-vars */

/* =========================
   Testimonials Data
========================= */
const items = [
  {
    name: 'Alice R.',
    title: 'Lead Developer, TechCorp',
    text: 'This product saved us weeks of work! The documentation is superb, and the code quality is top-notch.',
    img: 'https://i.pravatar.cc/80?img=1',
  },
  {
    name: 'Brian K.',
    title: 'CTO, InnovateX',
    text: 'Beautifully designed and extremely easy to customize. It integrated flawlessly into our existing pipeline.',
    img: 'https://i.pravatar.cc/80?img=2',
  },
  {
    name: 'Carmen V.',
    title: 'Product Manager, GlobalTech',
    text: 'Reliable and fast — great DX and performance. Our users noticed the speed increase immediately.',
    img: 'https://i.pravatar.cc/80?img=3',
  },
  {
    name: 'David M.',
    title: 'Senior Engineer, WebFlow',
    text: 'Highly scalable architecture. It allows our team to focus purely on feature development, not boilerplate.',
    img: 'https://i.pravatar.cc/80?img=4',
  },
];

/* =========================
   Testimonials Component
========================= */
export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  // Auto-slide carousel every 4 seconds
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Calculate offsets for carousel sliding
  const offset = idx * (100 / 3); // Desktop: 3 cards
  const mobileOffset = idx * 100; // Mobile: 1 card

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: '#000000' }}>
      <ParticleDriftBackground />

      {/* Title Section */}
      <div className="max-w-4xl mx-auto px-6 mb-12 relative z-10">
        <h2
          className="text-3xl md:text-5xl font-extrabold mb-3 text-center"
          style={{
            background: 'linear-gradient(90deg, var(--primary) 0%, #6366f1 45%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            letterSpacing: '-0.03em',
            textShadow: '0 2px 10px rgba(99,102,241,0.4)',
          }}
        >
          Trusted by the Best
        </h2>
        <p className="text-center text-xl max-w-2xl mx-auto" style={{ color: 'var(--muted)', opacity: 0.9 }}>
          Hear what our customers have to say about their experience.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: `calc(-${offset}% - ${idx * 8}px)` }}
          transition={{ type: 'tween', duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            '@media (max-width: 768px)': {
              transform: `translateX(-${mobileOffset}%)`,
              gap: '2rem',
            },
          }}
        >
          {items.map((it, i) => (
            <motion.div
              key={i}
              className="shrink-0 w-full md:w-[calc(33.333%-20px)] p-8 rounded-3xl"
              style={{
                backgroundColor: 'rgba(21,0,80,0.5)',
                border: i === idx ? '1px solid rgba(99,102,241,0.8)' : '1px solid rgba(99,102,241,0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: i === idx ? '0 15px 40px rgba(99,102,241,0.3)' : '0 8px 32px rgba(0,0,0,0.4)',
                opacity: i === idx ? 1 : 0.6,
                transform: i === idx ? 'scale(1)' : 'scale(0.95)',
                transition: 'opacity 0.8s, transform 0.8s, border 0.8s, box-shadow 0.8s',
              }}
              aria-hidden={i === idx ? 'false' : 'true'}
            >
              <div className="text-4xl mb-4" style={{ color: 'var(--accent)', opacity: 0.8 }}>
                “
              </div>
              <p className="text-lg italic mb-6 text-white leading-relaxed">{it.text}</p>
              <div className="w-16 h-1" style={{ background: 'linear-gradient(90deg, #6366f1, transparent)' }}></div>
              <div className="flex items-center gap-4 mt-6">
                <img
                  src={it.img}
                  alt={it.name}
                  className="w-14 h-14 rounded-full border-2"
                  style={{ borderColor: '#6366f1' }}
                />
                <div>
                  <div className="font-bold text-lg text-white">{it.name}</div>
                  <div className="text-sm" style={{ color: 'var(--muted)', opacity: 0.7 }}>
                    {it.title}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-12 relative z-10">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === idx ? '#6366f1' : 'rgba(255,255,255,0.2)',
              transform: i === idx ? 'scale(1.2)' : 'scale(1)',
            }}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
