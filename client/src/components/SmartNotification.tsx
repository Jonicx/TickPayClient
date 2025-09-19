import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Cloud, Sun, AlertTriangle, Info, Calendar } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import type { Event } from '@shared/data';

interface SmartNotificationProps {
  events: Event[];
  className?: string;
}

interface NotificationData {
  id: string;
  type: 'weather' | 'reminder' | 'traffic' | 'recommendation';
  title: string;
  message: string;
  eventId?: string;
  icon: React.ReactNode;
  priority: 'low' | 'medium' | 'high';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function SmartNotification({ events, className = '' }: SmartNotificationProps) {
  const { language, t } = useLanguage();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    generateSmartNotifications();
  }, [events, language]);

  const generateSmartNotifications = () => {
    const newNotifications: NotificationData[] = [];
    const now = new Date();
    
    events.forEach((event) => {
      const eventDate = new Date(event.date);
      const daysDiff = Math.floor((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      // Weather alerts for outdoor events
      if (event.weather?.isOutdoor && daysDiff <= 1 && daysDiff >= 0) {
        if (event.weather.condition === 'rainy' || event.weather.condition === 'stormy') {
          newNotifications.push({
            id: `weather-${event.id}`,
            type: 'weather',
            title: language === 'sw' ? 'Tahadhari ya Hali ya Hewa' : 'Weather Alert',
            message: language === 'sw' 
              ? `Mvua inatarajiwa siku ya ${event.title}. Beba miwani!`
              : `Rain expected for ${event.title}. Don't forget your umbrella!`,
            eventId: event.id,
            icon: <Cloud className="w-5 h-5 text-blue-500" />,
            priority: 'high'
          });
        } else if (event.weather.temp > 32) {
          newNotifications.push({
            id: `heat-${event.id}`,
            type: 'weather',
            title: language === 'sw' ? 'Joto Kali' : 'Hot Weather',
            message: language === 'sw'
              ? `Joto kali ${event.weather.temp}°C. Beba maji na vaa nguo nyepesi!`
              : `It'll be hot at ${event.weather.temp}°C. Bring water and wear light clothes!`,
            eventId: event.id,
            icon: <Sun className="w-5 h-5 text-orange-500" />,
            priority: 'medium'
          });
        }
      }
      
      // Event reminders
      if (daysDiff === 1) {
        newNotifications.push({
          id: `reminder-${event.id}`,
          type: 'reminder',
          title: language === 'sw' ? 'Tukio Kesho' : 'Event Tomorrow',
          message: language === 'sw'
            ? `${event.title} ni kesho saa ${event.time}. Tayari?`
            : `${event.title} is tomorrow at ${event.time}. Ready to go?`,
          eventId: event.id,
          icon: <Calendar className="w-5 h-5 text-primary" />,
          priority: 'medium'
        });
      }
      
      // Traffic/Transport recommendations
      if (daysDiff === 0 && event.transport.dalaDalaRoutes.length > 0) {
        newNotifications.push({
          id: `transport-${event.id}`,
          type: 'traffic',
          title: language === 'sw' ? 'Njia Bora za Kwenda' : 'Best Routes',
          message: language === 'sw'
            ? `Tumia ${event.transport.dalaDalaRoutes[0]} au boda boda (${event.transport.bodaBodaTime})`
            : `Take ${event.transport.dalaDalaRoutes[0]} or boda boda (${event.transport.bodaBodaTime})`,
          eventId: event.id,
          icon: <Info className="w-5 h-5 text-green-500" />,
          priority: 'low'
        });
      }
      
      // Mood-based recommendations
      if (event.mood.intensity >= 8 && daysDiff <= 3 && daysDiff >= 0) {
        newNotifications.push({
          id: `hot-${event.id}`,
          type: 'recommendation',
          title: language === 'sw' ? 'Tukio Moto!' : 'Hot Event!',
          message: language === 'sw'
            ? `${event.title} ni tukio la hali ya juu. Tiketi zinaongezeka!`
            : `${event.title} is getting popular. Tickets are selling fast!`,
          eventId: event.id,
          icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
          priority: 'high'
        });
      }
    });
    
    // Filter out dismissed notifications
    const filteredNotifications = newNotifications.filter(
      notification => !dismissedIds.includes(notification.id)
    );
    
    // Sort by priority
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    filteredNotifications.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    
    setNotifications(filteredNotifications.slice(0, 3)); // Limit to 3 notifications
  };

  const dismissNotification = (id: string) => {
    setDismissedIds(prev => [...prev, id]);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className={`space-y-3 ${className}`} data-testid="smart-notifications">
      {notifications.map((notification) => (
        <Card 
          key={notification.id}
          className={`border-l-4 ${
            notification.priority === 'high' ? 'border-l-red-500 bg-red-50/50 dark:bg-red-950/20' :
            notification.priority === 'medium' ? 'border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20' :
            'border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
          } hover-elevate`}
          data-testid={`notification-${notification.type}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {notification.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground text-sm">
                      {notification.title}
                    </h4>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        notification.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                        notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      }`}
                    >
                      {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  {notification.action && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={notification.action.onClick}
                    >
                      {notification.action.label}
                    </Button>
                  )}
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => dismissNotification(notification.id)}
                className="p-1 h-auto"
                data-testid={`dismiss-${notification.id}`}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}