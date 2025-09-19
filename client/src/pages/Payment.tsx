import { useState } from 'react';
import { useParams, Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Calendar, MapPin, Shield, Check } from 'lucide-react';
import { mockEvents } from '@shared/data';

export default function Payment() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
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
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handlePayment = async () => {
    console.log('Payment triggered for event:', event.id); // TODO: remove mock functionality
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Redirect to tickets page after success
      setTimeout(() => {
        setLocation('/my-tickets');
      }, 2000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-payment-success">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground" data-testid="text-success-message">
              Your ticket for {event.title} has been confirmed. You'll receive an email confirmation shortly.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/my-tickets" data-testid="link-view-tickets">
              <Button size="lg">
                View My Tickets
              </Button>
            </Link>
            <Link href="/events" data-testid="link-find-more-events">
              <Button variant="outline" size="lg">
                Find More Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/events/${event.id}`} data-testid="link-back-to-event">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Event
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-6" data-testid="text-payment-title">
              Complete Your Purchase
            </h1>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-primary" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" data-testid="input-first-name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" data-testid="input-last-name" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" data-testid="input-email" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+255 123 456 789" data-testid="input-phone" />
                </div>
                
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" data-testid="input-card-number" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" data-testid="input-expiry" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" data-testid="input-cvv" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <Shield className="w-4 h-4 mr-2 text-primary" />
              Your payment information is secure and encrypted
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handlePayment}
              disabled={isProcessing}
              data-testid="button-complete-payment"
            >
              {isProcessing ? (
                'Processing Payment...'
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Complete Payment - {formatPrice(event.price)}
                </>
              )}
            </Button>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-20 h-20 object-cover rounded-lg"
                    data-testid={`img-payment-event-${event.id}`}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground" data-testid={`text-payment-event-title-${event.id}`}>
                      {event.title}
                    </h3>
                    <Badge variant="secondary" className="mb-2" data-testid={`badge-payment-category-${event.id}`}>
                      {event.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 border-t pt-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-muted-foreground">Date:</span>
                    <span className="ml-auto text-foreground" data-testid={`text-payment-date-${event.id}`}>
                      {formatDate(event.date)}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-muted-foreground">Venue:</span>
                    <span className="ml-auto text-foreground text-right" data-testid={`text-payment-venue-${event.id}`}>
                      {event.venue}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticket Price</span>
                    <span className="text-foreground" data-testid={`text-payment-subtotal-${event.id}`}>
                      {formatPrice(event.price)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="text-foreground">TZS 2,000</span>
                  </div>
                  
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary" data-testid={`text-payment-total-${event.id}`}>
                      {formatPrice(event.price + 2000)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}