import EventCard from '../EventCard';
import { mockEvents } from '@shared/data';

export default function EventCardExample() {
  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        Event Card Component
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.slice(0, 3).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}