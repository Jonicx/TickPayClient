import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import EventCard from '@/components/EventCard';
import { Search, Filter } from 'lucide-react';
import { mockEvents, type Event } from '@shared/data';

const categories = ['All', 'Music', 'Sports', 'Food', 'Comedy', 'Business'] as const;

export default function Events() {
  // TODO: remove mock functionality - get events from API
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const filteredEvents = mockEvents.filter((event: Event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (query: string) => {
    console.log('Search triggered:', query); // TODO: remove mock functionality
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: string) => {
    console.log('Category filter triggered:', category); // TODO: remove mock functionality
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-events-title">
            All Events
          </h1>
          <p className="text-muted-foreground" data-testid="text-events-description">
            Find and book tickets for amazing events across Tanzania
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search events, venues, or locations..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
              data-testid="input-search-events"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Filter className="w-5 h-5 text-muted-foreground mt-2 mr-2" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryFilter(category)}
                data-testid={`button-filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground" data-testid="text-results-count">
            Showing {filteredEvents.length} of {mockEvents.length} events
            {selectedCategory !== 'All' && (
              <Badge variant="secondary" className="ml-2">
                {selectedCategory}
              </Badge>
            )}
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-events">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12" data-testid="div-no-events">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find more events.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}