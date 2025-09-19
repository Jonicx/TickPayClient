interface ArtisticBackgroundProps {
  children: React.ReactNode;
}

export default function ArtisticBackground({ children }: ArtisticBackgroundProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Artistic blurred background shapes */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Large green gradient circle - top left */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        
        {/* Gold accent circle - top right */}
        <div className="absolute -top-20 right-10 w-64 h-64 bg-gradient-to-bl from-yellow-400/15 to-transparent rounded-full blur-2xl" />
        
        {/* Medium green circle - bottom left */}
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-3xl" />
        
        {/* Small gold accent - bottom right */}
        <div className="absolute bottom-32 right-20 w-48 h-48 bg-gradient-to-tl from-yellow-300/10 to-transparent rounded-full blur-2xl" />
        
        {/* Center accent for depth */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}