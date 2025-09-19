import EventMap from '../EventMap';
import { mockEvents } from '@shared/data';

export default function EventMapExample() {
  const event = mockEvents[0]; // Diamond Platnumz concert
  
  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        Event Map Component
      </h2>
      <div className="max-w-2xl">
        <EventMap
          coordinates={event.coordinates}
          venue={event.venue}
          location={event.location}
        />
        <p className="text-muted-foreground mt-4">
          Interactive map showing {event.venue} in {event.location}
        </p>
      </div>
    </div>
  );
}