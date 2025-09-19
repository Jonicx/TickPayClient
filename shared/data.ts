// TODO: remove mock functionality - dummy data for prototype
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  price: number;
  image: string;
  category: 'Music' | 'Sports' | 'Food' | 'Comedy' | 'Business';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Ticket {
  id: string;
  eventId: string;
  event: Event;
  qrCode: string;
  purchaseDate: string;
  seatNumber?: string;
}

// Dummy events data with Tanzania locations
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Diamond Platnumz Live Concert',
    description: 'The biggest Tanzanian artist performs his greatest hits in an unforgettable night of music.',
    date: '2024-10-15',
    time: '20:00',
    location: 'Dar es Salaam',
    venue: 'Mlimani City Conference Centre',
    price: 25000,
    image: '@assets/generated_images/Concert_event_stage_lighting_fc1e927a.png',
    category: 'Music',
    coordinates: { lat: -6.7924, lng: 39.2083 }
  },
  {
    id: '2',
    title: 'Simba SC vs Young Africans',
    description: 'The biggest derby in Tanzanian football. Experience the electric atmosphere of this historic rivalry.',
    date: '2024-10-20',
    time: '16:00',
    location: 'Dar es Salaam',
    venue: 'Benjamin Mkapa Stadium',
    price: 15000,
    image: '@assets/generated_images/Football_stadium_night_view_170194e3.png',
    category: 'Sports',
    coordinates: { lat: -6.8235, lng: 39.2695 }
  },
  {
    id: '3',
    title: 'Zanzibar Food Festival',
    description: 'Taste the best of Zanzibar cuisine with local and international chefs showcasing their specialties.',
    date: '2024-11-02',
    time: '18:00',
    location: 'Stone Town, Zanzibar',
    venue: 'Forodhani Gardens',
    price: 20000,
    image: '@assets/generated_images/Food_festival_outdoor_scene_f56c82e1.png',
    category: 'Food',
    coordinates: { lat: -6.1659, lng: 39.1917 }
  },
  {
    id: '4',
    title: 'Idris Sultan Comedy Night',
    description: 'Join Tanzania\'s favorite comedian for an evening of laughter and entertainment.',
    date: '2024-10-25',
    time: '19:30',
    location: 'Dar es Salaam',
    venue: 'Hyatt Regency Kilimanjaro',
    price: 18000,
    image: '@assets/generated_images/Comedy_club_stage_spotlight_28177329.png',
    category: 'Comedy',
    coordinates: { lat: -6.8000, lng: 39.2833 }
  },
  {
    id: '5',
    title: 'East Africa Business Summit',
    description: 'Network with leading entrepreneurs and business leaders from across East Africa.',
    date: '2024-11-10',
    time: '09:00',
    location: 'Arusha',
    venue: 'Arusha International Conference Centre',
    price: 50000,
    image: '@assets/generated_images/Business_conference_hall_setup_263c6c28.png',
    category: 'Business',
    coordinates: { lat: -3.3869, lng: 36.6830 }
  },
  {
    id: '6',
    title: 'Harmonize & Rayvanny Concert',
    description: 'Two of Tanzania\'s biggest stars share the stage for an incredible musical experience.',
    date: '2024-11-15',
    time: '20:30',
    location: 'Mwanza',
    venue: 'CCM Kirumba Stadium',
    price: 22000,
    image: '@assets/generated_images/Concert_event_stage_lighting_fc1e927a.png',
    category: 'Music',
    coordinates: { lat: -2.5164, lng: 32.9175 }
  },
  {
    id: '7',
    title: 'Kilimanjaro Marathon',
    description: 'Challenge yourself in the shadow of Africa\'s highest peak in this epic marathon event.',
    date: '2024-12-01',
    time: '06:00',
    location: 'Moshi',
    venue: 'Moshi Town',
    price: 35000,
    image: '@assets/generated_images/Football_stadium_night_view_170194e3.png',
    category: 'Sports',
    coordinates: { lat: -3.3398, lng: 37.3407 }
  },
  {
    id: '8',
    title: 'Swahili Street Food Tour',
    description: 'Explore the authentic flavors of Tanzania with guided food tours through local markets.',
    date: '2024-11-25',
    time: '17:00',
    location: 'Dar es Salaam',
    venue: 'Kariakoo Market Area',
    price: 12000,
    image: '@assets/generated_images/Food_festival_outdoor_scene_f56c82e1.png',
    category: 'Food',
    coordinates: { lat: -6.8161, lng: 39.2626 }
  },
  {
    id: '9',
    title: 'Mchafuko Comedy Club',
    description: 'Discover new comedic talent in Tanzania\'s premier comedy showcase event.',
    date: '2024-11-05',
    time: '20:00',
    location: 'Dar es Salaam',
    venue: 'Slipway Entertainment Centre',
    price: 15000,
    image: '@assets/generated_images/Comedy_club_stage_spotlight_28177329.png',
    category: 'Comedy',
    coordinates: { lat: -6.7908, lng: 39.2694 }
  },
  {
    id: '10',
    title: 'Tanzania Tech Startup Pitch',
    description: 'Watch innovative startups pitch their ideas to investors and industry experts.',
    date: '2024-12-15',
    time: '14:00',
    location: 'Dar es Salaam',
    venue: 'Kempinski Hotel',
    price: 30000,
    image: '@assets/generated_images/Business_conference_hall_setup_263c6c28.png',
    category: 'Business',
    coordinates: { lat: -6.7885, lng: 39.2694 }
  }
];

// Mock purchased tickets
export const mockTickets: Ticket[] = [
  {
    id: 'ticket-1',
    eventId: '1',
    event: mockEvents[0],
    qrCode: '@assets/generated_images/QR_code_placeholder_ticket_fe39157e.png',
    purchaseDate: '2024-09-15',
    seatNumber: 'A-15'
  },
  {
    id: 'ticket-2',
    eventId: '3',
    event: mockEvents[2],
    qrCode: '@assets/generated_images/QR_code_placeholder_ticket_fe39157e.png',
    purchaseDate: '2024-09-18',
  }
];