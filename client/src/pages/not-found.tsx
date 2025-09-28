import StarParticleBackground from "@/components/StarParticleBackground";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Star Particle Background */}
      <StarParticleBackground />

      <Card className="w-full max-w-md mx-4 bg-gradient-to-r from-green-700 to-yellow-600  border-0 rounded-xl">
        <CardContent className="pt-4 text-center text-white">
          <div className="flex flex-col items-center gap-2">
            {/* Animated Alert Icon */}
            <AlertCircle className="h-12 w-12 text-white animate-pulse" />
            
            <h1 className="text-3xl font-extrabold">404</h1>
            <h2 className="text-xl font-semibold">Oops! Page Not Found</h2>

            <p className="mt-2">
              The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Home Link using Wouter */}
            <Link to="/" className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-yellow-600  to-green-700 text-white font-semibold rounded-full shadow-lg hover:bg-gray-100 animate-pulse transition-all">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
