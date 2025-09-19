import { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

export default function ParallaxBackground({ children }: ParallaxBackgroundProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth);
      setMouseY(e.clientY / window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Parallax Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Primary hero blobs with mouse interaction */}
        <div 
          className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/25 to-primary/5 rounded-full blur-3xl transition-all duration-1000"
          style={{
            transform: `translate(${mouseX * 50}px, ${mouseY * 30 - scrollY * 0.3}px) scale(${1 + mouseX * 0.1})`,
            animation: `float 8s ease-in-out infinite`,
          }}
        />
        <div 
          className="absolute top-32 right-1/3 w-72 h-72 bg-gradient-to-bl from-yellow-400/20 to-yellow-400/5 rounded-full blur-2xl transition-all duration-1000"
          style={{
            transform: `translate(${-mouseX * 30}px, ${-mouseY * 20 - scrollY * 0.2}px) scale(${1 + mouseY * 0.1})`,
            animation: `float 10s ease-in-out infinite 2s`,
          }}
        />
        
        {/* Scrolling parallax layers */}
        <div 
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        <div 
          className="absolute -top-20 right-10 w-80 h-80 bg-gradient-to-bl from-yellow-400/12 to-transparent rounded-full blur-2xl"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />
        
        {/* Mid-section floating orbs */}
        <div 
          className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-r from-primary/18 to-transparent rounded-full blur-2xl"
          style={{
            transform: `translateY(${-scrollY * 0.25}px) rotate(${scrollY * 0.1}deg)`,
            animation: `pulse 6s ease-in-out infinite 1s`,
          }}
        />
        <div 
          className="absolute top-1/3 right-0 w-48 h-48 bg-gradient-to-l from-yellow-300/15 to-transparent rounded-full blur-xl"
          style={{
            transform: `translateY(${-scrollY * 0.2}px)`,
            animation: `float 12s ease-in-out infinite 4s`,
          }}
        />
        
        {/* Interactive floating elements */}
        <div 
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-xl"
          style={{
            transform: `translate(-50%, ${scrollY * 0.3}px) scale(${1 + Math.sin(scrollY * 0.01) * 0.2})`,
            animation: `pulse 4s ease-in-out infinite`,
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-radial from-yellow-400/15 to-transparent rounded-full blur-xl"
          style={{
            transform: `translateY(${scrollY * -0.4}px)`,
            animation: `float 7s ease-in-out infinite 3s`,
          }}
        />
        
        {/* Constellation connections */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)`,
              animation: `twinkle ${2 + i}s ease-in-out infinite ${i * 0.5}s`,
            }}
          />
        ))}
        
        {/* Depth gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/10"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}