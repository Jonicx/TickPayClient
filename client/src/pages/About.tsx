import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Calendar, Star, Heart, Globe, Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export default function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log('Form field changed:', name, value); // TODO: remove mock functionality
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData); // TODO: remove mock functionality
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }, 1500);
  };

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

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      detail: 'support@tickpay.co.tz',
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      detail: '+255 123 456 789',
      description: 'Monday to Friday, 8:00 AM to 6:00 PM EAT'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      detail: 'Dar es Salaam, Tanzania',
      description: 'Our office is located in the heart of the city'
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
        <div className="mt-16 mb-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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

        {/* Contact Section */}
        <div className="border-t border-border/20 pt-20">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-yellow-400/10 text-yellow-400 border-yellow-400/20 px-4 py-2" data-testid="badge-contact-tagline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            
            <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="text-contact-title">
              We'd Love to
              <span className="block bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
                Hear From You
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-description">
              Have questions about events, need help with your tickets, or want to partner with us? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="w-5 h-5 mr-2 text-primary" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8" data-testid="div-form-success">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          data-testid="input-contact-name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          data-testid="input-contact-email"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us how we can help you..."
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          data-testid="textarea-contact-message"
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                        data-testid="button-contact-submit"
                      >
                        {isSubmitting ? (
                          'Sending Message...'
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="mb-8">
                <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2" data-testid="badge-contact-info-tagline">
                  <Phone className="w-4 h-4 mr-2" />
                  Get In Touch
                </Badge>
                <h3 className="text-2xl font-bold text-foreground mb-3" data-testid="text-contact-info-title">
                  Contact Information
                </h3>
                <p className="text-lg text-muted-foreground">
                  We're here to help with any questions or concerns
                </p>
              </div>
              
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-card/90 backdrop-blur-sm border-card-border hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1" data-testid={`text-contact-method-title-${index}`}>
                          {info.title}
                        </h4>
                        <p className="text-primary font-medium mb-2" data-testid={`text-contact-method-detail-${index}`}>
                          {info.detail}
                        </p>
                        <p className="text-muted-foreground text-sm" data-testid={`text-contact-method-description-${index}`}>
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* FAQ Note */}
              <Card className="bg-gradient-to-r from-primary/5 to-yellow-400/5 border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2" data-testid="text-faq-title">
                    Frequently Asked Questions
                  </h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Before reaching out, check if your question is answered in our common questions:
                  </p>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• How do I transfer or refund my ticket?</li>
                    <li>• What if I lose my QR code?</li>
                    <li>• How do I change my event date?</li>
                    <li>• What payment methods do you accept?</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}