interface ArtisticBackgroundProps {
  children: React.ReactNode;
}

export default function ArtisticBackground({ children }: ArtisticBackgroundProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Artistic blurred background shapes */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Hero Section Strategic Blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/25 to-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-32 right-1/3 w-72 h-72 bg-gradient-to-bl from-yellow-400/20 to-yellow-400/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s' }} />
        
        {/* Background Depth Blobs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute -top-20 right-10 w-80 h-80 bg-gradient-to-bl from-yellow-400/12 to-transparent rounded-full blur-2xl" />
        
        {/* Mid-section accent blobs */}
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-r from-primary/18 to-transparent rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-0 w-48 h-48 bg-gradient-to-l from-yellow-300/15 to-transparent rounded-full blur-xl" />
        
        {/* Bottom section blobs */}
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-primary/12 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-56 h-56 bg-gradient-to-tl from-yellow-300/8 to-transparent rounded-full blur-2xl" />
        
        {/* Floating accent elements */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-radial from-yellow-400/15 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s' }} />
        
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/10" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}