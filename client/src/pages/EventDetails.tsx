import { useParams, Link } from 'wouter';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EventMap from '@/components/EventMap';
import TicketPreview3D from '@/components/TicketPreview3D';
import MoodRing from '@/components/MoodRing';
import SmartNotification from '@/components/SmartNotification';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/components/SoundPlayer';
import { Calendar, Clock, MapPin, Users, Ticket, ArrowLeft, Star, Cloud, Sun, Truck } from 'lucide-react';
import { mockEvents, type Event } from '@shared/data';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { playSound } = useSound();
  const [show3DPreview, setShow3DPreview] = useState(false);
  
  // TODO: remove mock functionality - get event from API
  const event = mockEvents.find(e => e.id === id);
  
  // Debug logging for language changes
  useEffect(() => {
    console.log('EventDetails component language changed to:', language);
  }, [language]);
  
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
    playSound('success');
    // Navigate to payment page in real implementation
  };

  const handle3DPreview = () => {
    console.log('3D ticket preview triggered for event:', event.id);
    playSound('click');
    setShow3DPreview(!show3DPreview);
  };

  if (!event) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4" data-testid="text-event-not-found">
            {language === 'sw' ? 'Tukio halionekani' : 'Event not found'}
          </h1>
          <Link href="/events" data-testid="link-back-to-events">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'sw' ? 'Rudi kwenye Matukio' : 'Back to Events'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
            {language === 'sw' ? 'Uzoefu wa Tukio la Ubora' : 'Premium Event Experience'}
          </Badge>
        </div>

        {/* Smart Notifications */}
        <SmartNotification events={[event]} />

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
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="secondary" className="bg-primary text-primary-foreground" data-testid={`badge-event-category-${event.id}`}>
                  {event.category}
                </Badge>
                
                {/* Weather Badge */}
                {event.weather && (
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                    {event.weather.condition === 'sunny' ? <Sun className="w-3 h-3 mr-1" /> : <Cloud className="w-3 h-3 mr-1" />}
                    {event.weather.temp}°C
                  </Badge>
                )}
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2">
                {/* Transport Info */}
                {event.transport && (
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                    <Truck className="w-3 h-3 mr-1" />
                    {language === 'sw' ? `${event.transport.bodaBodaTime}` : `${event.transport.bodaBodaTime}`}
                  </Badge>
                )}
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

                {/* Distance Information - only on details page */}
                <div className="flex items-center text-muted-foreground col-span-2">
                  <Truck className="w-5 h-5 mr-3 text-primary" />
                  <div className="flex gap-4 text-sm">
                    <span>🚌 {event.transport.bodaBodaTime} by boda</span>
                    <span>🚶 {event.transport.walkingDistance}</span>
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
                  {language === 'sw' ? 'Agiza Tiketi Yako' : 'Book Your Ticket'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-3xl font-bold text-yellow-400 mb-2" data-testid={`text-booking-price-${event.id}`}>
                    {formatPrice(event.price)}
                  </p>
                  <p className="text-muted-foreground">{language === 'sw' ? 'kwa tiketi' : 'per ticket'}</p>
                </div>
                
                <Link href={`/payment/${event.id}`} className="w-full" data-testid={`link-book-ticket-${event.id}`}>
                  <Button className="w-full" size="lg" onClick={handleBookTicket}>
                    <Users className="w-5 h-5 mr-2" />
                    {language === 'sw' ? 'Agiza Sasa' : 'Book Now'}
                  </Button>
                </Link>
                
                <p className="text-xs text-muted-foreground text-center">
                  {language === 'sw' ? 'Malipo salama • Thibitisho la haraka' : 'Secure payment • Instant confirmation'}
                </p>
              </CardContent>
            </Card>

            {/* QR Code Demo with 3D Preview */}
            <Card>
              <CardHeader>
                <CardTitle>{language === 'sw' ? 'Tiketi Yako ya Kidijitali' : 'Your Digital Ticket'}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div 
                  className="cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={handle3DPreview}
                >
                  <img
                    src="@assets/generated_images/QR_code_placeholder_ticket_fe39157e.png"
                    alt="Sample QR Code"
                    className="w-32 h-32 mx-auto border border-border rounded-lg mb-4 hover:border-primary/50 transition-colors"
                    data-testid={`img-sample-qr-${event.id}`}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handle3DPreview}
                  className="mb-4"
                  data-testid={`button-3d-preview-${event.id}`}
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  {language === 'sw' ? 'Ona Hakikisho la 3D' : 'View 3D Preview'}
                </Button>
                <p className="text-sm text-muted-foreground">
                  {language === 'sw' 
                    ? 'Baada ya kununua, utapokea nambari ya QR kusonga kwenye mlango wa uwanja.'
                    : 'After purchase, you\'ll receive a QR code to scan at the venue entrance.'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 3D Ticket Preview Modal */}
        <TicketPreview3D
          event={event}
          isVisible={show3DPreview}
        />
      </div>
    </div>
  );
}