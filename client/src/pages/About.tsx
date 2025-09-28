import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StarParticleBackground from '@/components/StarParticleBackground';
import { Shield, Users, Calendar, Star, Heart, Globe, Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();
  
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
      title: t('about.feature1Title'),
      description: t('about.feature1Desc')
    },
    {
      icon: Calendar,
      title: t('about.feature2Title'),
      description: t('about.feature2Desc')
    },
    {
      icon: Users,
      title: t('about.feature3Title'),
      description: t('about.feature3Desc')
    },
    {
      icon: Star,
      title: t('about.feature4Title'),
      description: t('about.feature4Desc')
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.emailTitle'),
      detail: 'support@tickpay.co.tz',
      description: t('contact.emailDesc')
    },
    {
      icon: Phone,
      title: t('contact.phoneTitle'),
      detail: '+255 123 456 789',
      description: t('contact.phoneDesc')
    },
    {
      icon: MapPin,
      title: t('contact.visitTitle'),
      detail: 'Dar es Salaam, Tanzania',
      description: t('contact.visitDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Enhanced Star Particle Background */}
      <StarParticleBackground />
      <div className="relative py-8 px-4 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20" data-testid="badge-about-tagline">
            <Heart className="w-4 h-4 mr-2" />
            {t('about.tagline')}
          </Badge>
          
          <h1 className="text-4xl font-bold text-foreground mb-6" data-testid="text-about-title">
            {t('about.title')}
            <span className="block bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              {t('about.titleHighlight')}
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-about-description">
            {t('about.description')}
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="text-story-title">
            {t('about.storyTitle')}
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-story-content">
              {t('about.storyContent1')}
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t('about.storyContent2')}
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              {t('about.storyContent3')}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2" data-testid="badge-features-tagline">
              <Shield className="w-4 h-4 mr-2" />
              {t('about.featuresTagline')}
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-features-title">
              {t('about.featuresTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.featuresDesc')}
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
              {t('about.missionTitle')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-mission-content">
              {t('about.missionContent')}
            </p>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="mt-16 mb-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div data-testid="stat-events-hosted">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">{t('about.stats1')}</p>
          </div>
          
          <div data-testid="stat-happy-customers">
            <div className="text-3xl font-bold text-yellow-400 mb-2">10K+</div>
            <p className="text-muted-foreground">{t('about.stats2')}</p>
          </div>
          
          <div data-testid="stat-cities-covered">
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <p className="text-muted-foreground">{t('about.stats3')}</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="border-t border-border/20 pt-20">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-yellow-400/10 text-yellow-400 border-yellow-400/20 px-4 py-2" data-testid="badge-contact-tagline">
              <MessageCircle className="w-4 h-4 mr-2" />
              {t('contact.tagline')}
            </Badge>
            
            <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="text-contact-title">
              {t('contact.title')}
              <span className="block bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
                {t('contact.titleHighlight')}
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-description">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="w-5 h-5 mr-2 text-primary" />
                    {t('contact.formTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8" data-testid="div-form-success">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {t('contact.successTitle')}
                      </h3>
                      <p className="text-muted-foreground">
                        {t('contact.successDesc')}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
                      <div>
                        <Label htmlFor="name">{t('contact.nameLabel')}</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder={t('contact.namePlaceholder')}
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          data-testid="input-contact-name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">{t('contact.emailLabel')}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t('contact.emailPlaceholder')}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          data-testid="input-contact-email"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">{t('contact.messageLabel')}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder={t('contact.messagePlaceholder')}
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
                          t('contact.sendingButton')
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            {t('contact.sendButton')}
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
                  {t('contact.infoTitle')}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {t('contact.infoDesc')}
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
                    {t('contact.faqTitle')}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    {t('contact.faqDesc')}
                  </p>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• {t('contact.faq1')}</li>
                    <li>• {t('contact.faq2')}</li>
                    <li>• {t('contact.faq3')}</li>
                    <li>• {t('contact.faq4')}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}