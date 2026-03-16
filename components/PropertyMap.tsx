import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Property } from '../types';
import { Link } from 'react-router-dom';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for properties
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface PropertyMapProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  interactive?: boolean;
}

// Component to handle map bounds when properties change
const MapBounds: React.FC<{ properties: Property[] }> = ({ properties }) => {
  const map = useMap();

  useEffect(() => {
    const validProps = properties.filter(p => p.coordinates && p.coordinates.lat && p.coordinates.lng);
    if (validProps.length > 0) {
      const bounds = L.latLngBounds(validProps.map(p => [p.coordinates!.lat, p.coordinates!.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [properties, map]);

  return null;
};

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, center = [19.4326, -99.1332], zoom = 12, interactive = true }) => {
  const validProperties = properties.filter(p => p.coordinates && p.coordinates.lat && p.coordinates.lng);

  return (
    <div className="w-full h-full min-h-[500px] rounded-3xl overflow-hidden shadow-inner border border-gray-200 relative z-0">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={interactive} 
        dragging={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        zoomControl={interactive}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapBounds properties={validProperties} />
        
        {validProperties.map(property => (
          <Marker 
            key={property.id} 
            position={[property.coordinates!.lat, property.coordinates!.lng]}
            icon={customIcon}
          >
            <Popup className="property-popup">
              <div className="w-48 overflow-hidden rounded-lg">
                <img 
                  src={property.images[0]} 
                  alt={property.title} 
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-serif text-sm font-bold text-primary mb-1 truncate">{property.title}</h3>
                  <p className="text-accent font-bold text-xs mb-2">{property.price}</p>
                  <Link 
                    to={`/propiedades/${property.slug}`}
                    className="block w-full text-center bg-primary text-white text-[10px] uppercase tracking-wider py-2 rounded-md hover:bg-accent transition-colors"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
