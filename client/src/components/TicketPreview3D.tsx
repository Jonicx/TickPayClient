import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, Calendar, MapPin, Clock, Star } from 'lucide-react';
import type { Event } from '@shared/data';

interface TicketPreview3DProps {
  event: Event;
  isVisible: boolean;
  className?: string;
}

export default function TicketPreview3D({ event, isVisible, className = '' }: TicketPreview3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-700 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
      } ${className}`}
    >
      {/* 3D Ticket Container */}
      <div 
        className="relative w-80 h-48 preserve-3d transition-transform duration-700 cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Ticket */}
        <Card className="absolute inset-0 bg-gradient-to-br from-primary/20 to-yellow-400/20 border-primary/30 backface-hidden">
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40">
                  {event.category}
                </Badge>
                <div className="flex items-center space-x-1 text-yellow-400">
                  {Array.from({ length: event.mood.intensity >= 7 ? 3 : event.mood.intensity >= 4 ? 2 : 1 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">
                {event.title}
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  <span>{formatDate(event.date)} at {event.time}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  <span className="line-clamp-1">{event.venue}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">
                {formatPrice(event.price)}
              </div>
              <Badge variant="outline" className="bg-yellow-400/20 text-yellow-600 border-yellow-400/40">
                Premium Ticket
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Back of Ticket */}
        <Card 
          className="absolute inset-0 bg-gradient-to-bl from-background/95 to-card/95 border-border backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="w-12 h-12 text-primary" />
            </div>
            
            <h4 className="font-semibold text-foreground mb-2">QR Code</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Your unique ticket code will appear here after purchase
            </p>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Ticket ID: #TK-{event.id.padStart(6, '0')}</p>
              <p>Valid for single entry</p>
              <p>Present at venue entrance</p>
            </div>
            
            <div className="absolute bottom-4 right-4">
              <Badge variant="outline" className="text-xs">
                TickPay
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Click hint */}
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">Click to flip ticket</p>
      </div>

    </div>
  );
}