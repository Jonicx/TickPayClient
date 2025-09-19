import { Link } from 'wouter';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MoodRing from '@/components/MoodRing';
import { Calendar, Clock, MapPin, Users, Cloud, Sun, CloudRain, Zap } from 'lucide-react';
import type { Event } from '@shared/data';

interface EventCardProps {
  event: Event;
  className?: string;
}

export default function EventCard({ event, className = '' }: EventCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-4 h-4 text-yellow-400" />;
      case 'cloudy': return <Cloud className="w-4 h-4 text-gray-400" />;
      case 'rainy': return <CloudRain className="w-4 h-4 text-blue-400" />;
      case 'stormy': return <Zap className="w-4 h-4 text-purple-400" />;
      default: return <Sun className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <Card className={`group hover-elevate overflow-hidden bg-card/90 backdrop-blur-sm border-card-border relative ${className}`} data-testid={`card-event-${event.id}`}>
      {/* Dynamic Mood Ring */}
      <MoodRing mood={event.mood} />
      
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
          data-testid={`img-event-${event.id}`}
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-primary text-primary-foreground" data-testid={`badge-category-${event.id}`}>
            {event.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          {event.weather && (
            <Badge variant="outline" className="bg-background/80 text-foreground border-border flex items-center gap-1" data-testid={`badge-weather-${event.id}`}>
              {getWeatherIcon(event.weather.condition)}
              {event.weather.temp}°C
            </Badge>
          )}
          <Badge variant="outline" className="bg-yellow-400/90 text-yellow-900 border-yellow-500" data-testid={`badge-price-${event.id}`}>
            {formatPrice(event.price)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-4 line-clamp-2" data-testid={`text-title-${event.id}`}>
          {event.title}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span data-testid={`text-date-${event.id}`}>{formatDate(event.date)}</span>
            <Clock className="w-4 h-4 ml-4 mr-2 text-primary" />
            <span data-testid={`text-time-${event.id}`}>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span className="line-clamp-1" data-testid={`text-location-${event.id}`}>
              {event.venue}, {event.location}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 space-y-3">
        {/* Transport Info */}
        <div className="text-xs text-muted-foreground flex items-center justify-between w-full">
          <span>🚌 {event.transport.bodaBodaTime} by boda</span>
          <span>🚶 {event.transport.walkingDistance}</span>
        </div>
        
        <Link href={`/events/${event.id}`} className="w-full" data-testid={`link-event-details-${event.id}`}>
          <Button className="w-full group-hover:scale-105 transition-transform">
            <Users className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}