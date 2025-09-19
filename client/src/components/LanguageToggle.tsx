import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();
  
  const handleToggle = () => {
    console.log('Language toggle clicked, current language:', language);
    toggleLanguage();
    console.log('Language after toggle:', language === 'en' ? 'sw' : 'en');
  };
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className={`flex items-center space-x-2 hover:bg-muted/50 ${className}`}
      data-testid="button-language-toggle"
    >
      <Globe className="w-4 h-4" />
      <Badge 
        variant="outline" 
        className={`text-xs ${
          language === 'sw' 
            ? 'bg-green-400/20 text-green-600 border-green-400/40' 
            : 'bg-blue-400/20 text-blue-600 border-blue-400/40'
        }`}
      >
        {language === 'en' ? 'EN' : 'SW'}
      </Badge>
    </Button>
  );
}