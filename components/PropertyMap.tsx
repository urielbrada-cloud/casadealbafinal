import React, { useEffect, useRef } from 'react';
import { Property } from '../types';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    google: any;
  }
}
declare var google: any;

interface PropertyMapProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  interactive?: boolean;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, center = [19.4326, -99.1332], zoom = 12, interactive = true }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);
  const navigate = useNavigate();

  const validProperties = properties.filter(p => p.coordinates && p.coordinates.lat && p.coordinates.lng);

  useEffect(() => {
    if (window.google && mapRef.current && !mapInstance.current) {
      infoWindowRef.current = new window.google.maps.InfoWindow();

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: center[0], lng: center[1] },
        zoom: zoom,
        disableDefaultUI: !interactive,
        gestureHandling: interactive ? 'auto' : 'none',
        zoomControl: interactive,
        mapTypeControl: false,
        streetViewControl: false,
      });
    }
  }, [center, zoom, interactive]);

  useEffect(() => {
    if (!window.google || !mapInstance.current) return;

    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    const bounds = new window.google.maps.LatLngBounds();
    let hasValidBounds = false;

    validProperties.forEach(property => {
      const position = { lat: property.coordinates!.lat, lng: property.coordinates!.lng };
      
      const marker = new window.google.maps.Marker({
        position,
        map: mapInstance.current,
        title: property.title,
        icon: {
           url: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png'
        }
      });

      if (interactive) {
        marker.addListener('click', () => {
          const content = `
            <div style="width:200px; font-family: sans-serif; cursor: pointer;" onclick="window.location.href='/propiedades/${property.slug}'">
              <div style="height:100px; background:#f3f4f6; overflow:hidden; border-radius:8px; margin-bottom:8px;">
                <img src="${property.images[0]}" style="width:100%; height:100%; object-fit:cover;" referrerpolicy="no-referrer" />
              </div>
              <h3 style="font-weight:bold; font-size:14px; margin:0 0 4px 0; color:#000827;">${property.title}</h3>
              <p style="color:#e25c21; font-weight:bold; font-size:12px; margin:0;">${property.price}</p>
            </div>
          `;
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open(mapInstance.current, marker);
        });
      }

      markersRef.current.push(marker);
      bounds.extend(position);
      hasValidBounds = true;
    });

    if (hasValidBounds && mapInstance.current && validProperties.length > 0) {
      mapInstance.current.fitBounds(bounds);
    }
  }, [validProperties, interactive]);

  return (
    <div className="w-full h-full min-h-[500px] rounded-3xl overflow-hidden shadow-inner border border-gray-200 relative z-0">
      <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
};

export default PropertyMap;
