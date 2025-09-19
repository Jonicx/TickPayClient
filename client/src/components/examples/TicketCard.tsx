import TicketCard from '../TicketCard';
import { mockTickets } from '@shared/data';

export default function TicketCardExample() {
  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        Ticket Card Component
      </h2>
      <div className="space-y-6">
        {mockTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}