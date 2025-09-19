import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EventCard from '@/components/EventCard';
import { Calendar, Star, Ticket, Zap } from 'lucide-react';
import { mockEvents } from '@shared/data';

export default function Home() {
  // TODO: remove mock functionality - get featured events from API
  const featuredEvents = mockEvents.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 bg-primary/10 text-primary border-primary/20" data-testid="badge-hero-tagline">
            <Zap className="w-4 h-4 mr-2" />
            Your Premium Ticket Experience
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6" data-testid="text-hero-title">
            Discover Amazing
            <span className="block bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              Events in Tanzania
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
            From live concerts to sports events, food festivals to comedy shows - find and book tickets for the best experiences across Tanzania.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events" data-testid="link-explore-events">
              <Button size="lg" className="w-full sm:w-auto">
                <Calendar className="w-5 h-5 mr-2" />
                Explore Events
              </Button>
            </Link>
            
            <Link href="/my-tickets" data-testid="link-my-tickets">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-background/50 backdrop-blur-sm">
                <Ticket className="w-5 h-5 mr-2" />
                My Tickets
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2" data-testid="text-featured-title">
                Featured Events
              </h2>
              <p className="text-muted-foreground" data-testid="text-featured-description">
                Don't miss out on these popular events happening soon
              </p>
            </div>
            
            <Link href="/events" data-testid="link-view-all-events">
              <Button variant="outline">
                View All Events
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-featured-events">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-events">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
              <p className="text-muted-foreground">Events Listed</p>
            </div>
            
            <div data-testid="stat-customers">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">10K+</h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            
            <div data-testid="stat-cities">
              <div className="flex items-center justify-center mb-4">
                <Ticket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">25+</h3>
              <p className="text-muted-foreground">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}