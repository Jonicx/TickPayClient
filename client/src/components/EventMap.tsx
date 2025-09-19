import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface EventMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  venue: string;
  location: string;
  className?: string;
}

export default function EventMap({ coordinates, venue, location, className = '' }: EventMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Custom map styling can be added here
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  return (
    <div className={`rounded-xl overflow-hidden border border-border ${className}`} data-testid="map-event-location">
      <MapContainer
        center={[coordinates.lat, coordinates.lng] as [number, number]}
        zoom={15}
        style={{ height: '300px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>
            <div className="text-center">
              <h4 className="font-semibold text-foreground" data-testid="text-venue-popup">
                {venue}
              </h4>
              <p className="text-sm text-muted-foreground" data-testid="text-location-popup">
                {location}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}