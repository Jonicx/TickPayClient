import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Zap, Users, Briefcase, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MoodFiltersProps {
  selectedMood: string | null;
  onMoodChange: (mood: string | null) => void;
  className?: string;
}

const moods = [
  {
    id: 'energetic',
    label: 'Energetic',
    labelSw: 'Wenye Nguvu',
    icon: Zap,
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-400/10',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-400/40',
    description: 'High-energy events that get your adrenaline pumping'
  },
  {
    id: 'relaxed',
    label: 'Relaxed',
    labelSw: 'Tulivu',
    icon: Heart,
    color: 'from-blue-400 to-purple-500',
    bgColor: 'bg-blue-400/10',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-400/40',
    description: 'Chill vibes and peaceful experiences'
  },
  {
    id: 'social',
    label: 'Social',
    labelSw: 'Kijamii',
    icon: Users,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-400/10',
    textColor: 'text-pink-600',
    borderColor: 'border-pink-400/40',
    description: 'Meet new people and connect with others'
  },
  {
    id: 'cultural',
    label: 'Cultural',
    labelSw: 'Kitamaduni',
    icon: Sparkles,
    color: 'from-green-400 to-teal-500',
    bgColor: 'bg-green-400/10',
    textColor: 'text-green-600',
    borderColor: 'border-green-400/40',
    description: 'Discover traditions and local experiences'
  },
  {
    id: 'professional',
    label: 'Professional',
    labelSw: 'Kitaaluma',
    icon: Briefcase,
    color: 'from-gray-400 to-slate-500',
    bgColor: 'bg-gray-400/10',
    textColor: 'text-gray-600',
    borderColor: 'border-gray-400/40',
    description: 'Business networking and learning opportunities'
  }
];

export default function MoodFilters({ selectedMood, onMoodChange, className = '' }: MoodFiltersProps) {
  const { language } = useLanguage();
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
          <Sparkles className="w-4 h-4 mr-2" />
          {language === 'sw' ? 'Chagua Hisia Yako' : 'Choose Your Vibe'}
        </Badge>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {language === 'sw' ? 'Gundua kwa Hisia' : 'Discover by Mood'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {language === 'sw' 
            ? 'Tafuta matukio kulingana na hisia unazohitaji' 
            : 'Find events that match exactly how you\'re feeling'}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant={selectedMood === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => onMoodChange(null)}
          className="h-auto py-2"
        >
          {language === 'sw' ? 'Yote' : 'All Vibes'}
        </Button>
        
        {moods.map((mood) => (
          <Button
            key={mood.id}
            variant={selectedMood === mood.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onMoodChange(mood.id)}
            className={`h-auto py-2 px-4 flex items-center space-x-2 group relative overflow-hidden ${
              selectedMood === mood.id 
                ? `${mood.bgColor} ${mood.textColor} ${mood.borderColor}` 
                : 'hover-elevate'
            }`}
            data-testid={`button-mood-${mood.id}`}
          >
            {/* Animated background gradient on hover */}
            <div 
              className={`absolute inset-0 bg-gradient-to-r ${mood.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
            />
            
            <mood.icon className="w-4 h-4 relative z-10" />
            <span className="text-sm font-medium relative z-10">
              {language === 'sw' ? mood.labelSw : mood.label}
            </span>
          </Button>
        ))}
      </div>
      
      {/* Selected mood description */}
      {selectedMood && (
        <div className="text-center mt-4 p-4 rounded-lg bg-card/50 border border-border">
          <p className="text-sm text-muted-foreground">
            {moods.find(m => m.id === selectedMood)?.description}
          </p>
        </div>
      )}
    </div>
  );
}