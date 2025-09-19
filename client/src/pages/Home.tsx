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
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-8 bg-primary/10 text-primary border-primary/20 px-4 py-2" data-testid="badge-hero-tagline">
            <Zap className="w-4 h-4 mr-2" />
            Your Premium Ticket Experience
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight" data-testid="text-hero-title">
            Discover Amazing
            <span className="block bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              Events in Tanzania
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-description">
            From live concerts to sports events, food festivals to comedy shows - find and book tickets for the best experiences across Tanzania.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/events" data-testid="link-explore-events">
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg">
                <Calendar className="w-5 h-5 mr-3" />
                Explore Events
              </Button>
            </Link>
            
            <Link href="/my-tickets" data-testid="link-my-tickets">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg bg-background/50 backdrop-blur-sm">
                <Ticket className="w-5 h-5 mr-3" />
                My Tickets
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-3" data-testid="text-featured-title">
                Featured Events
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-featured-description">
                Don't miss out on these popular events happening soon
              </p>
            </div>
            
            <Link href="/events" data-testid="link-view-all-events">
              <Button variant="outline" className="hidden sm:flex">
                View All Events
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="grid-featured-events">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          <div className="mt-12 text-center sm:hidden">
            <Link href="/events" data-testid="link-view-all-events-mobile">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 px-6 bg-card/20 backdrop-blur-sm border-y border-border/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-yellow-400/10 text-yellow-400 border-yellow-400/20 px-4 py-2" data-testid="badge-stats-tagline">
              <Star className="w-4 h-4 mr-2" />
              Trusted by Thousands
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div data-testid="stat-events">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-xl">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-3">500+</h3>
              <p className="text-lg text-muted-foreground font-medium">Events Listed</p>
            </div>
            
            <div data-testid="stat-customers">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-yellow-400/10 rounded-xl">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-3">10K+</h3>
              <p className="text-lg text-muted-foreground font-medium">Happy Customers</p>
            </div>
            
            <div data-testid="stat-cities">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-xl">
                  <Ticket className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-3">25+</h3>
              <p className="text-lg text-muted-foreground font-medium">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}