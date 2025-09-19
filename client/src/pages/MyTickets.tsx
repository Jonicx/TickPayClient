import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TicketCard from '@/components/TicketCard';
import { Ticket, Calendar, Plus } from 'lucide-react';
import { mockTickets } from '@shared/data';

export default function MyTickets() {
  // TODO: remove mock functionality - get user tickets from API
  const userTickets = mockTickets;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Badge variant="outline" className="mb-4 bg-yellow-400/10 text-yellow-400 border-yellow-400/20 px-4 py-2" data-testid="badge-tickets-tagline">
              <Ticket className="w-4 h-4 mr-2" />
              Your Collection
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-3" data-testid="text-tickets-title">
              My Tickets
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-tickets-description">
              View and manage your purchased event tickets
            </p>
          </div>
          
          <Link href="/events" data-testid="link-find-events">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Find Events
            </Button>
          </Link>
        </div>

        {/* Tickets List */}
        {userTickets.length > 0 ? (
          <div className="space-y-6" data-testid="list-user-tickets">
            {userTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16" data-testid="div-no-tickets">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-muted/20 rounded-full">
                <Ticket className="w-12 h-12 text-muted-foreground" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No tickets yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't purchased any tickets yet. Explore events and book your first ticket to get started.
            </p>
            
            <Link href="/events" data-testid="link-explore-events-empty">
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Explore Events
              </Button>
            </Link>
          </div>
        )}

        {/* Ticket Instructions */}
        {userTickets.length > 0 && (
          <div className="mt-12 p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-card-border" data-testid="div-ticket-instructions">
            <h3 className="font-semibold text-foreground mb-3">
              How to use your tickets:
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                Arrive at the venue 30 minutes before the event starts
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                Present your QR code at the entrance for quick scanning
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                Keep your phone charged or take a screenshot as backup
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}