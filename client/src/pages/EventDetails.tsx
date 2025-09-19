import { useParams, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EventMap from '@/components/EventMap';
import { Calendar, Clock, MapPin, Users, Ticket, ArrowLeft, Star } from 'lucide-react';
import { mockEvents } from '@shared/data';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  
  // TODO: remove mock functionality - get event from API
  const event = mockEvents.find(e => e.id === id);
  
  if (!event) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4" data-testid="text-event-not-found">
            Event not found
          </h1>
          <Link href="/events" data-testid="link-back-to-events">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBookTicket = () => {
    console.log('Book ticket triggered for event:', event.id); // TODO: remove mock functionality
    // Navigate to payment page in real implementation
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/events" data-testid="link-back-to-events">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
        
        {/* Premium Badge */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4 bg-yellow-400/10 text-yellow-400 border-yellow-400/20 px-4 py-2" data-testid="badge-event-details-tagline">
            <Star className="w-4 h-4 mr-2" />
            Premium Event Experience
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-96 object-cover"
                data-testid={`img-event-hero-${event.id}`}
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-primary text-primary-foreground" data-testid={`badge-event-category-${event.id}`}>
                  {event.category}
                </Badge>
              </div>
            </div>

            {/* Event Info */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-4" data-testid={`text-event-title-${event.id}`}>
                {event.title}
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium text-foreground" data-testid={`text-event-date-${event.id}`}>
                      {formatDate(event.date)}
                    </p>
                    <p className="text-sm">Date</p>
                  </div>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium text-foreground" data-testid={`text-event-time-${event.id}`}>
                      {event.time}
                    </p>
                    <p className="text-sm">Time</p>
                  </div>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium text-foreground" data-testid={`text-event-venue-${event.id}`}>
                      {event.venue}
                    </p>
                    <p className="text-sm" data-testid={`text-event-location-${event.id}`}>
                      {event.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Ticket className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium text-yellow-400" data-testid={`text-event-price-${event.id}`}>
                      {formatPrice(event.price)}
                    </p>
                    <p className="text-sm">Per Ticket</p>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed" data-testid={`text-event-description-${event.id}`}>
                {event.description}
              </p>
            </div>

            {/* Event Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Event Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EventMap
                  coordinates={event.coordinates}
                  venue={event.venue}
                  location={event.location}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  Book Your Ticket
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-3xl font-bold text-yellow-400 mb-2" data-testid={`text-booking-price-${event.id}`}>
                    {formatPrice(event.price)}
                  </p>
                  <p className="text-muted-foreground">per ticket</p>
                </div>
                
                <Link href={`/payment/${event.id}`} className="w-full" data-testid={`link-book-ticket-${event.id}`}>
                  <Button className="w-full" size="lg" onClick={handleBookTicket}>
                    <Users className="w-5 h-5 mr-2" />
                    Book Now
                  </Button>
                </Link>
                
                <p className="text-xs text-muted-foreground text-center">
                  Secure payment • Instant confirmation
                </p>
              </CardContent>
            </Card>

            {/* QR Code Demo */}
            <Card>
              <CardHeader>
                <CardTitle>Your Digital Ticket</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <img
                  src="@assets/generated_images/QR_code_placeholder_ticket_fe39157e.png"
                  alt="Sample QR Code"
                  className="w-32 h-32 mx-auto border border-border rounded-lg mb-4"
                  data-testid={`img-sample-qr-${event.id}`}
                />
                <p className="text-sm text-muted-foreground">
                  After purchase, you'll receive a QR code to scan at the venue entrance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}