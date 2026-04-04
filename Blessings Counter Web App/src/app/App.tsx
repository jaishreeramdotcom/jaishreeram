import { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
}

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [isPressed, setIsPressed] = useState(false);
  const [blessings, setBlessings] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smooth counter animation
  useEffect(() => {
    const diff = count - displayCount;
    if (diff !== 0) {
      const increment = diff > 0 ? Math.ceil(Math.abs(diff) / 10) : -Math.ceil(Math.abs(diff) / 10);
      const timer = setTimeout(() => {
        setDisplayCount((prev) => prev + increment);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [count, displayCount]);

  // Mouse tracking for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ambient particle system
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => {
        const newParticles = prev
          .map((p) => ({
            ...p,
            x: p.x + p.speedX,
            y: p.y + p.speedY,
            life: p.life - 0.01,
          }))
          .filter((p) => p.life > 0);

        // Add new particles
        if (Math.random() > 0.7) {
          newParticles.push({
            id: Date.now() + Math.random(),
            x: Math.random() * window.innerWidth,
            y: window.innerHeight,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: -Math.random() * 2 - 0.5,
            life: 1,
          });
        }

        return newParticles.slice(-50);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Fetch initial count from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('jai-shree-ram-count');
    const initialCount = stored ? parseInt(stored) : 0;
    setCount(initialCount);
    setDisplayCount(initialCount);
    setIsLoading(false);
  }, []);

  const handleBlessingPress = async () => {
    if (isPressed) return;

    setIsPressed(true);

    // Create multiple floating blessings
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const newBlessing = {
          id: Date.now() + i,
          x: Math.random() * 80 + 10,
          y: Math.random() * 30 + 35,
        };
        setBlessings((prev) => [...prev, newBlessing]);

        setTimeout(() => {
          setBlessings((prev) => prev.filter((b) => b.id !== newBlessing.id));
        }, 2000);
      }, i * 100);
    }

    // Increment count
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('jai-shree-ram-count', newCount.toString());

    setTimeout(() => setIsPressed(false), 400);
  };

  if (isLoading) {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-br from-orange-950 via-red-900 to-amber-900">
        <div className="text-orange-300 text-2xl font-light animate-pulse">॥ ॐ ॥</div>
      </div>
    );
  }

  return (
    <div className="size-full relative overflow-hidden bg-gradient-to-br from-orange-950 via-red-900 to-amber-900">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-amber-500/20 animate-gradient" />

      {/* Radial gradient following mouse */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(255,154,0,0.15) 0%, transparent 70%)',
          left: mousePosition.x - 400,
          top: mousePosition.y - 400,
        }}
      />

      {/* Ambient particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(255,183,77,${particle.life}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${particle.size * 3}px rgba(255,183,77,${particle.life * 0.8})`,
          }}
        />
      ))}

      {/* Decorative Sanskrit mantras in background */}
      <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-20 left-10 text-9xl font-serif animate-float-slow">॥ श्री राम ॥</div>
        <div className="absolute bottom-20 right-10 text-9xl font-serif animate-float-slow-delay">॥ जय राम ॥</div>
        <div className="absolute top-1/3 right-32 text-7xl font-serif animate-float-slower">राम राम</div>
        <div className="absolute bottom-1/3 left-32 text-7xl font-serif animate-float-slower-delay">सीता राम</div>
      </div>

      {/* Floating blessing sparkles */}
      {blessings.map((blessing) => (
        <div
          key={blessing.id}
          className="absolute pointer-events-none"
          style={{
            left: `${blessing.x}%`,
            top: `${blessing.y}%`,
          }}
        >
          <div className="relative animate-blessing-float">
            <div className="text-6xl">✨</div>
            <div className="absolute inset-0 text-6xl animate-ping opacity-75">✨</div>
          </div>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 size-full flex flex-col items-center justify-center px-8 py-12">
        {/* Title with gradient text and glow */}
        <div className="text-center space-y-6 mb-16 animate-fade-in-up">
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-orange-200 via-amber-100 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x">
              जय श्री राम
            </h1>
            <div className="absolute inset-0 text-8xl md:text-9xl font-bold bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent blur-2xl opacity-50 animate-pulse-slow" aria-hidden="true">
              जय श्री राम
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-amber-200/90 tracking-wider">
            Jai Shree Ram
          </h2>

          <p className="text-lg text-orange-200/70 max-w-xl mx-auto leading-relaxed font-light">
            Take divine blessings from Shree Ram. Each blessing adds to an eternal counter that grows forever.
          </p>
        </div>

        {/* Counter Display with glass morphism */}
        <div className="mb-16 animate-fade-in-up-delay">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-[2rem] opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500 animate-pulse-slow" />

            {/* Glass card */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl px-16 py-10 border border-white/20 shadow-2xl">
              <div className="text-center">
                <div className="text-orange-200/80 text-xs font-light uppercase tracking-[0.3em] mb-4 animate-fade-in">
                  Global Blessings
                </div>
                <div className="text-7xl md:text-8xl font-bold bg-gradient-to-br from-amber-200 via-orange-100 to-amber-200 bg-clip-text text-transparent tabular-nums tracking-tight">
                  {displayCount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blessing Button with advanced effects */}
        <div className="relative mb-12 animate-fade-in-up-delay-2">
          {/* Animated ring */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 opacity-20 blur-xl animate-spin-slow" />

          <button
            onClick={handleBlessingPress}
            disabled={isPressed}
            className="relative group"
          >
            {/* Button glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-full opacity-60 blur-xl group-hover:opacity-100 transition-all duration-500 group-hover:blur-2xl" />

            {/* Main button */}
            <div className={`
              relative bg-gradient-to-br from-orange-500 to-amber-600
              text-white text-2xl md:text-3xl font-semibold
              px-16 py-8 rounded-full
              shadow-2xl
              transition-all duration-300
              border-2 border-orange-300/30
              ${isPressed ? 'scale-95' : 'group-hover:scale-105'}
              disabled:opacity-75 disabled:cursor-not-allowed
            `}>
              <span className="flex items-center gap-4">
                <Sparkles className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700" />
                <span className="tracking-wide">Take Blessings</span>
                <Sparkles className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700" />
              </span>

              {/* Ripple effect on press */}
              {isPressed && (
                <>
                  <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                  <span className="absolute inset-0 rounded-full bg-white/20 animate-ping animation-delay-100" />
                  <span className="absolute inset-0 rounded-full bg-white/10 animate-ping animation-delay-200" />
                </>
              )}
            </div>
          </button>
        </div>

        {/* Info text with subtle animation */}
        <p className="text-orange-200/50 text-sm text-center max-w-2xl font-light leading-relaxed animate-fade-in-up-delay-3">
          <span className="inline-block animate-pulse-slow">🪔</span>
          {' '}This eternal counter connects souls worldwide • Every blessing is preserved forever{' '}
          <span className="inline-block animate-pulse-slow animation-delay-500">🪔</span>
        </p>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 200% 50%; }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }

        @keyframes float-slow-delay {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-5deg); }
        }

        @keyframes float-slower {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(3deg); }
        }

        @keyframes float-slower-delay {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(-3deg); }
        }

        @keyframes blessing-float {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.8) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-250px) scale(1.5) rotate(360deg);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slow-delay {
          animation: float-slow-delay 9s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }

        .animate-float-slower-delay {
          animation: float-slower-delay 11s ease-in-out infinite;
        }

        .animate-blessing-float {
          animation: blessing-float 2s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in-up-delay {
          animation: fade-in-up 1s ease-out 0.2s both;
        }

        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 1s ease-out 0.4s both;
        }

        .animate-fade-in-up-delay-3 {
          animation: fade-in-up 1s ease-out 0.6s both;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animate-fade-in {
          animation: fade-in-up 2s ease-out;
        }
      `}</style>
    </div>
  );
}