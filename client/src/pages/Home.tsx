import { useState, useEffect, useMemo } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import EventCard from '@/components/EventCard';
import MoodFilters from '@/components/MoodFilters';
import SmartNotification from '@/components/SmartNotification';
import TicketPreview3D from '@/components/TicketPreview3D';
import { useSound } from '@/components/SoundPlayer';
import { useLanguage } from '@/hooks/useLanguage';
import { Calendar, Star, Ticket, Zap, Sparkles, Heart, Music, Globe, Users, MapPin, TrendingUp } from 'lucide-react';
import { mockEvents, Event } from '@shared/data';

export default function Home() {
  const { language, t } = useLanguage();
  const { playSound } = useSound();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const [show3DPreview, setShow3DPreview] = useState(false);
  const [previewEvent, setPreviewEvent] = useState<Event | null>(null);
  
  // TODO: remove mock functionality - get featured events from API
  const allEvents = mockEvents;
  
  // Filter events by mood if selected
  const filteredEvents = useMemo(() => {
    if (!selectedMood) return allEvents;
    return allEvents.filter(event => event.mood.vibe === selectedMood);
  }, [selectedMood]);
  
  const featuredEvents = filteredEvents.slice(0, 6);
  
  // Handle event hover for sound effects and 3D preview
  const handleEventHover = (event: Event | null) => {
    if (event) {
      setHoveredEventId(event.id);
      playSound('hover');
    } else {
      setHoveredEventId(null);
    }
  };
  
  // Handle 3D ticket preview
  const handle3DPreview = (event: Event) => {
    setPreviewEvent(event);
    setShow3DPreview(true);
    playSound('click');
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShow3DPreview(false);
      setPreviewEvent(null);
    }, 5000);
  };
  
  // Handle mood filter change
  const handleMoodChange = (mood: string | null) => {
    setSelectedMood(mood);
    playSound('click');
  };

  return (
    <div className="min-h-screen relative">
      {/* 3D Ticket Preview Overlay */}
      {show3DPreview && previewEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <TicketPreview3D 
            event={previewEvent} 
            isVisible={show3DPreview}
            className="animate-in fade-in-0 zoom-in-95 duration-500"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShow3DPreview(false)}
            className="absolute top-6 right-6 bg-background/80 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 mr-2" />
            Close Preview
          </Button>
        </div>
      )}
      
      {/* Hero Section with Advanced Features */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge 
            variant="outline" 
            className="mb-8 bg-primary/10 text-primary border-primary/20 px-4 py-2 animate-pulse" 
            data-testid="badge-hero-tagline"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {t('home.tagline')}
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight" data-testid="text-hero-title">
            {t('home.title').split(' ').slice(0, 2).join(' ')}
            <span className="block bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
              {t('home.title').split(' ').slice(2).join(' ')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-description">
            {t('home.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/events" data-testid="link-explore-events">
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
                onClick={() => playSound('click')}
              >
                <Calendar className="w-5 h-5 mr-3" />
                {t('home.exploreEvents')}
              </Button>
            </Link>
            
            <Link href="/my-tickets" data-testid="link-my-tickets">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto px-8 py-4 text-lg bg-background/50 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                onClick={() => playSound('click')}
              >
                <Ticket className="w-5 h-5 mr-3" />
                {t('home.myTickets')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Smart Notifications */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <SmartNotification events={allEvents} />
        </div>
      </section>

      {/* Mood-Based Discovery */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <MoodFilters 
            selectedMood={selectedMood} 
            onMoodChange={handleMoodChange}
            className="mb-12"
          />
        </div>
      </section>

      {/* Enhanced Featured Events Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-3 flex items-center gap-3" data-testid="text-featured-title">
                <Music className="w-8 h-8 text-primary" />
                {selectedMood ? (
                  <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
                    {language === 'sw' ? 'Matukio ya ' : 'Events for '}
                    {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}
                    {language === 'sw' ? ' Mood' : ' Mood'}
                  </span>
                ) : (
                  t('home.featuredEvents')
                )}
              </h2>
              <p className="text-lg text-muted-foreground flex items-center gap-2" data-testid="text-featured-description">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                {selectedMood 
                  ? `${filteredEvents.length} events match your vibe` 
                  : t('home.featuredDesc')
                }
              </p>
            </div>
            
            <Link href="/events" data-testid="link-view-all-events">
              <Button 
                variant="outline" 
                className="hidden sm:flex hover:scale-105 transition-transform"
                onClick={() => playSound('click')}
              >
                <Globe className="w-4 h-4 mr-2" />
                {t('home.viewAllEvents')}
              </Button>
            </Link>
          </div>
          
          {/* Event Constellation Grid with Interactive Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="grid-featured-events">
            {featuredEvents.map((event, index) => (
              <div 
                key={event.id}
                className="relative transform transition-all duration-500 hover:z-10"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={() => handleEventHover(event)}
                onMouseLeave={() => handleEventHover(null)}
              >
                {/* Constellation Connection Lines */}
                {index < featuredEvents.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-primary/30 to-transparent z-0" />
                )}
                
                <div 
                  className={`group cursor-pointer transition-all duration-300 ${
                    hoveredEventId === event.id ? 'scale-105 rotate-1' : ''
                  }`}
                  onClick={() => handle3DPreview(event)}
                >
                  <EventCard event={event} />
                  
                  {/* Hover Pulse Effect */}
                  {hoveredEventId === event.id && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-yellow-400/5 animate-pulse pointer-events-none" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* No Events Message for Mood Filter */}
          {selectedMood && featuredEvents.length === 0 && (
            <Card className="p-12 text-center bg-card/50 border-dashed">
              <CardContent>
                <Heart className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {language === 'sw' ? 'Hakuna matukio ya hisia hii' : 'No events match this vibe'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === 'sw' 
                    ? 'Jaribu kubadilisha chaguo lako au angalia matukio yote'
                    : 'Try changing your mood filter or explore all events'
                  }
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => handleMoodChange(null)}
                  className="hover:scale-105 transition-transform"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {language === 'sw' ? 'Ona Yote' : 'Show All Events'}
                </Button>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-12 text-center sm:hidden">
            <Link href="/events" data-testid="link-view-all-events-mobile">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto hover:scale-105 transition-transform"
                onClick={() => playSound('click')}
              >
                <Globe className="w-4 h-4 mr-2" />
                {t('home.viewAllEvents')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Stats with Local Pulse */}
      <section className="py-20 px-6 bg-card/20 backdrop-blur-sm border-y border-border/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-yellow-400/10 text-yellow-400 border-yellow-400/20 px-4 py-2 animate-pulse" data-testid="badge-stats-tagline">
              <Star className="w-4 h-4 mr-2" />
              {t('home.trustedBy')}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div data-testid="stat-events" className="group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-3">500+</h3>
              <p className="text-lg text-muted-foreground font-medium">
                {language === 'sw' ? 'Matukio' : 'Events Listed'}
              </p>
            </div>
            
            <div data-testid="stat-customers" className="group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-yellow-400/10 rounded-xl group-hover:bg-yellow-400/20 transition-colors duration-300">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-3">15K+</h3>
              <p className="text-lg text-muted-foreground font-medium">
                {language === 'sw' ? 'Wateja Wenye Furaha' : 'Happy Customers'}
              </p>
            </div>
            
            <div data-testid="stat-cities" className="group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-green-400/10 rounded-xl group-hover:bg-green-400/20 transition-colors duration-300">
                  <MapPin className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-3">25+</h3>
              <p className="text-lg text-muted-foreground font-medium">
                {language === 'sw' ? 'Miji' : 'Cities Covered'}
              </p>
            </div>
            
            <div data-testid="stat-vibes" className="group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-purple-400/10 rounded-xl group-hover:bg-purple-400/20 transition-colors duration-300">
                  <Heart className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-3">5</h3>
              <p className="text-lg text-muted-foreground font-medium">
                {language === 'sw' ? 'Aina za Hisia' : 'Mood Types'}
              </p>
            </div>
          </div>
          
          {/* Live Local Pulse */}
          <div className="mt-16 text-center">
            <Card className="inline-flex items-center gap-4 px-6 py-4 bg-card/50 border-primary/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-foreground">
                  {language === 'sw' ? 'Mfumo wa Papo Hapo' : 'Live Pulse'}
                </span>
              </div>
              <div className="h-4 border-l border-border"></div>
              <span className="text-sm text-muted-foreground">
                {language === 'sw' ? '3 matukio yanavutia sasa hivi' : '3 trending events right now'}
              </span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}