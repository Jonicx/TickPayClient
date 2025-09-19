import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Calendar, Star, Heart, Globe } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your transactions are protected with bank-level security and encryption.'
    },
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Find and book tickets for events across Tanzania in just a few clicks.'
    },
    {
      icon: Users,
      title: 'Trusted Platform',
      description: 'Join thousands of satisfied customers who trust TickPay for their events.'
    },
    {
      icon: Star,
      title: 'Quality Events',
      description: 'We partner with the best event organizers to bring you amazing experiences.'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20" data-testid="badge-about-tagline">
            <Heart className="w-4 h-4 mr-2" />
            About TickPay
          </Badge>
          
          <h1 className="text-4xl font-bold text-foreground mb-6" data-testid="text-about-title">
            Your Gateway to
            <span className="block bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              Amazing Experiences
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-about-description">
            TickPay is Tanzania's premier event ticketing platform, connecting people with unforgettable experiences across the country.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="text-story-title">
            Our Story
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-story-content">
              Founded in 2024, TickPay was born from a simple vision: to make discovering and attending events in Tanzania as easy and enjoyable as possible. We recognized that Tanzania has a vibrant cultural scene with incredible music, sports, food festivals, comedy shows, and business events, but people often struggled to find and book tickets for these experiences.
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our team of passionate technologists and event enthusiasts came together to create a platform that would bridge this gap. We wanted to build something that would not only make ticket booking seamless but also help event organizers reach wider audiences and grow their events.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Today, TickPay serves customers across Tanzania, from Dar es Salaam to Zanzibar, from Arusha to Mwanza. We're proud to be part of Tanzania's growing digital economy and to contribute to the success of local events and entertainment.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2" data-testid="badge-features-tagline">
              <Shield className="w-4 h-4 mr-2" />
              Premium Platform
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-features-title">
              Why Choose TickPay?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best ticketing experience in Tanzania
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="grid-features">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/90 backdrop-blur-sm border-card-border hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2" data-testid={`text-feature-title-${index}`}>
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-yellow-400/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4" data-testid="text-mission-title">
              Our Mission
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-mission-content">
              To democratize access to events and entertainment in Tanzania by providing a reliable, secure, and user-friendly platform that connects event-goers with amazing experiences while supporting local event organizers and artists.
            </p>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div data-testid="stat-events-hosted">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Events Hosted</p>
          </div>
          
          <div data-testid="stat-happy-customers">
            <div className="text-3xl font-bold text-yellow-400 mb-2">10K+</div>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          
          <div data-testid="stat-cities-covered">
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <p className="text-muted-foreground">Cities Covered</p>
          </div>
        </div>
      </div>
    </div>
  );
}