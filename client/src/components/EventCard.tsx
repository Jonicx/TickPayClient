import { Link } from 'wouter';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MoodRing from '@/components/MoodRing';
import { Calendar, Clock, MapPin, Users, Cloud, Sun, CloudRain, Zap, User } from 'lucide-react';
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
    <Card className={`group overflow-hidden bg-card/90 backdrop-blur-sm border-card-border relative ${className}`} data-testid={`card-event-${event.id}`}>
      {/* Dynamic Mood Ring */}
      <MoodRing mood={event.mood} />
      
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
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
      
      <CardFooter className="p-4 pt-0">
        {/* Event Planner Info and Button sharing space evenly */}
        <div className="flex items-center gap-3">
          {/* Event Planner Info - takes half the space */}
          <div className="flex items-center space-x-2 flex-1 p-2 bg-muted/30 rounded-lg min-w-0">
            <Avatar className="w-7 h-7 flex-shrink-0">
              <AvatarImage src={event.planner.avatar} alt={event.planner.name} />
              <AvatarFallback>
                <User className="w-3 h-3" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate" data-testid={`text-planner-${event.id}`}>
                {event.planner.name}
              </p>
              {event.planner.company && (
                <p className="text-xs text-muted-foreground truncate">
                  {event.planner.company}
                </p>
              )}
            </div>
          </div>
          
          {/* View Button - takes half the space */}
          <Link href={`/events/${event.id}`} className="flex-1" data-testid={`link-event-details-${event.id}`}>
            <Button className="w-full" size="sm">
              <Users className="w-3 h-3 mr-1" />
              View
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}