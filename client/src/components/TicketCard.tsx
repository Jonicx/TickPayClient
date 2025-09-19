import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import type { Ticket as TicketType } from '@shared/data';

interface TicketCardProps {
  ticket: TicketType;
  className?: string;
}

export default function TicketCard({ ticket, className = '' }: TicketCardProps) {
  const { event } = ticket;
  
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

  return (
    <Card className={`bg-card/90 backdrop-blur-sm border-card-border hover-elevate ${className}`} data-testid={`card-ticket-${ticket.id}`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Event Image */}
          <div className="flex-shrink-0">
            <img
              src={event.image}
              alt={event.title}
              className="w-full md:w-32 h-32 object-cover rounded-lg"
              data-testid={`img-ticket-event-${ticket.id}`}
            />
          </div>
          
          {/* Event Details */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg text-foreground" data-testid={`text-ticket-title-${ticket.id}`}>
                {event.title}
              </h3>
              <Badge variant="secondary" className="bg-primary text-primary-foreground" data-testid={`badge-ticket-category-${ticket.id}`}>
                {event.category}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <span data-testid={`text-ticket-date-${ticket.id}`}>{formatDate(event.date)}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <span data-testid={`text-ticket-time-${ticket.id}`}>{event.time}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span data-testid={`text-ticket-venue-${ticket.id}`}>{event.venue}</span>
              </div>
              
              {ticket.seatNumber && (
                <div className="flex items-center text-muted-foreground">
                  <Ticket className="w-4 h-4 mr-2 text-primary" />
                  <span data-testid={`text-ticket-seat-${ticket.id}`}>Seat {ticket.seatNumber}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-yellow-400" data-testid={`text-ticket-price-${ticket.id}`}>
                {formatPrice(event.price)}
              </span>
              <span className="text-sm text-muted-foreground" data-testid={`text-ticket-purchase-date-${ticket.id}`}>
                Purchased: {formatDate(ticket.purchaseDate)}
              </span>
            </div>
          </div>
          
          {/* QR Code */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <img
              src={ticket.qrCode}
              alt="Ticket QR Code"
              className="w-24 h-24 border border-border rounded-lg"
              data-testid={`img-ticket-qr-${ticket.id}`}
            />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Scan at venue
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}