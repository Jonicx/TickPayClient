import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import LanguageToggle from '@/components/LanguageToggle';
import { Menu, X, Ticket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavigationProps {
  className?: string;
}

// TODO: Add authentication state management when implementing login
const publicNavItems = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/how-to-sell', label: 'howToSell' },


];

const privateNavItems = [
  { href: '/my-tickets', label: 'My Tickets' },
  // TODO: Add organizer/admin items when implementing authentication
  // { href: '/organizer', label: 'Organizer' },
  // { href: '/admin', label: 'Admin' },
];

export default function Navigation({ className = '' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useLanguage();
  
  // TODO: Replace with real authentication state when implementing login
  const isLoggedIn = false; // Mock authentication state
  
  // Combine nav items based on authentication status with translations
  const getTranslatedNavItems = () => {
    const translatedPublic = [
      { href: '/', label: t('nav.home') },
      { href: '/events', label: t('nav.events') },
      { href: '/how-to-sell', label: t('nav.howToSell') },
      { href: '/about', label: t('nav.about') },
    ];
    const translatedPrivate = [
      { href: '/my-tickets', label: t('nav.myTickets') },
    ];
    
    return isLoggedIn ? [...translatedPublic, ...translatedPrivate] : translatedPublic;
  };
  
  const navItems = getTranslatedNavItems();

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <nav className={`bg-background/95 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center space-x-3 group">
              <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
                TickPay
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-${item.label.toLowerCase().replace(' ', '-')}`}>
                <div className="relative group">
                  <span className={`
                    text-sm font-medium transition-colors duration-200 py-2 px-1
                    ${isActive(item.href) 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}>
                    {item.label}
                  </span>
                  {isActive(item.href) && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                  {!isActive(item.href) && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  )}
                </div>
              </Link>
            ))}
            
            {/* Language Toggle */}
            <LanguageToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              data-testid="button-mobile-menu"
              className="hover:bg-muted/50"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} data-testid={`mobile-link-${item.label.toLowerCase().replace(' ', '-')}`}>
                  <div 
                    className={`
                      text-base font-medium py-3 px-2 rounded-lg transition-colors
                      ${isActive(item.href) 
                        ? 'text-primary bg-primary/5' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}