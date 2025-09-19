interface MoodRingProps {
  mood: {
    energy: 'low' | 'medium' | 'high';
    vibe: 'relaxed' | 'energetic' | 'cultural' | 'social' | 'professional';
    intensity: number;
  };
  className?: string;
}

const getMoodColors = (vibe: string, energy: string) => {
  const colors = {
    energetic: energy === 'high' ? 'from-red-500/60 to-orange-500/60' : 'from-orange-400/50 to-yellow-500/50',
    relaxed: 'from-blue-400/50 to-purple-400/50',
    cultural: 'from-green-400/50 to-teal-500/50',
    social: 'from-pink-400/50 to-rose-500/50',
    professional: 'from-gray-400/40 to-slate-500/40'
  };
  
  return colors[vibe as keyof typeof colors] || colors.cultural;
};

const getAnimationSpeed = (intensity: number) => {
  if (intensity >= 8) return '2s';
  if (intensity >= 5) return '3s';
  return '4s';
};

export default function MoodRing({ mood, className = '' }: MoodRingProps) {
  const colors = getMoodColors(mood.vibe, mood.energy);
  const animationSpeed = getAnimationSpeed(mood.intensity);
  
  return (
    <div className={`absolute -inset-1 rounded-xl ${className}`}>
      {/* Animated mood ring */}
      <div 
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
        style={{
          animation: `pulse ${animationSpeed} ease-in-out infinite`,
        }}
      />
      
      {/* Secondary pulse for high intensity events */}
      {mood.intensity >= 7 && (
        <div 
          className={`absolute -inset-2 rounded-xl bg-gradient-to-br ${colors} opacity-0 group-hover:opacity-50`}
          style={{
            animation: `pulse ${animationSpeed} ease-in-out infinite 0.5s`,
          }}
        />
      )}
      
      {/* Mood indicator dot */}
      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-to-br ${colors} opacity-60`} />
      
    </div>
  );
}