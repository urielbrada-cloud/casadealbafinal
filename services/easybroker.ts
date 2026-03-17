import { Property } from '../types';

export const fetchEasyBrokerProperties = async (params: Record<string, string> = {}): Promise<Property[]> => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`/api/properties${queryParams ? `?${queryParams}` : ''}`);
    
    if (!response.ok) {
      console.warn('Failed to fetch properties from backend, using fallback data');
      return [];
    }

    const data = await response.json();
    
    if (!data.content || !Array.isArray(data.content)) {
      return [];
    }

    return data.content.map((ebProp: any) => {
      // Find the primary operation (sale or rental)
      const operation = ebProp.operations && ebProp.operations.length > 0 ? ebProp.operations[0] : null;
      const price = operation ? `${operation.formatted_amount} ${operation.currency}` : 'Precio a consultar';
      const priceRaw = operation ? operation.amount : 0;

      // Map property type
      let type: 'residential' | 'commercial' | 'land' | 'development' = 'residential';
      const ebType = ebProp.property_type ? ebProp.property_type.toLowerCase() : '';
      if (ebType.includes('commercial') || ebType.includes('office') || ebType.includes('warehouse')) {
        type = 'commercial';
      } else if (ebType.includes('land') || ebType.includes('lot')) {
        type = 'land';
      }

      let coordinates: { lat: number; lng: number } | undefined;
      const locName = typeof ebProp.location === 'object' && ebProp.location !== null ? ebProp.location.name : (ebProp.location || '');
      
      if (typeof ebProp.location === 'object' && ebProp.location !== null && ebProp.location.latitude && ebProp.location.longitude) {
        coordinates = {
          lat: parseFloat(ebProp.location.latitude),
          lng: parseFloat(ebProp.location.longitude)
        };
      } else {
        // Fallback: Generate deterministic coordinates based on location name and ID
        const idNum = parseInt(ebProp.public_id.replace(/\\D/g, '')) || Math.random() * 10000;
        const latOffset = ((idNum % 100) - 50) / 1000; // -0.05 to +0.05
        const lngOffset = (((idNum * 7) % 100) - 50) / 1000;
        
        const locLower = locName.toLowerCase();
        let baseLat = 20.65; // Default Guadalajara
        let baseLng = -103.40;
        
        if (locLower.includes('ciudad de méxico') || locLower.includes('cdmx') || locLower.includes('polanco') || locLower.includes('condesa')) {
          baseLat = 19.4326;
          baseLng = -99.1332;
        } else if (locLower.includes('monterrey') || locLower.includes('san pedro garza')) {
          baseLat = 25.6866;
          baseLng = -100.3161;
        } else if (locLower.includes('querétaro') || locLower.includes('queretaro')) {
          baseLat = 20.5888;
          baseLng = -100.3899;
        } else if (locLower.includes('mérida') || locLower.includes('merida')) {
          baseLat = 20.9674;
          baseLng = -89.6237;
        } else if (locLower.includes('tulum')) {
          baseLat = 20.2114;
          baseLng = -87.4654;
        } else if (locLower.includes('cancún') || locLower.includes('cancun')) {
          baseLat = 21.1619;
          baseLng = -86.8515;
        }

        coordinates = {
          lat: baseLat + latOffset,
          lng: baseLng + lngOffset
        };
      }

      return {
        id: ebProp.public_id,
        slug: ebProp.public_id.toLowerCase(),
        title: ebProp.title,
        location: typeof ebProp.location === 'object' && ebProp.location !== null ? ebProp.location.name : ebProp.location,
        price,
        priceRaw,
        type,
        bedrooms: ebProp.bedrooms,
        bathrooms: ebProp.bathrooms,
        parking: ebProp.parking_spaces,
        landArea: ebProp.lot_size ? `${ebProp.lot_size} m²` : undefined,
        constructionArea: ebProp.construction_size ? `${ebProp.construction_size} m²` : '0 m²',
        description: ebProp.description || '',
        features: [],
        images: ebProp.title_image_full ? [ebProp.title_image_full] : [],
        isFeatured: false,
        coordinates,
      } as Property;
    });
  } catch (error) {
    console.warn('Error fetching EasyBroker properties:', error);
    return [];
  }
};

export const fetchEasyBrokerProperty = async (id: string): Promise<Property | null> => {
  try {
    const response = await fetch(`/api/properties/${id}`);
    
    if (!response.ok) {
      return null;
    }

    const ebProp = await response.json();
    
    const operation = ebProp.operations && ebProp.operations.length > 0 ? ebProp.operations[0] : null;
    const price = operation ? `${operation.formatted_amount} ${operation.currency}` : 'Precio a consultar';
    const priceRaw = operation ? operation.amount : 0;

    let type: 'residential' | 'commercial' | 'land' | 'development' = 'residential';
    const ebType = ebProp.property_type ? ebProp.property_type.toLowerCase() : '';
    if (ebType.includes('commercial') || ebType.includes('office') || ebType.includes('warehouse')) {
      type = 'commercial';
    } else if (ebType.includes('land') || ebType.includes('lot')) {
      type = 'land';
    }

    let coordinates: { lat: number; lng: number } | undefined;
    const locName = typeof ebProp.location === 'object' && ebProp.location !== null ? ebProp.location.name : (ebProp.location || '');

    if (typeof ebProp.location === 'object' && ebProp.location !== null && ebProp.location.latitude && ebProp.location.longitude) {
      coordinates = {
        lat: parseFloat(ebProp.location.latitude),
        lng: parseFloat(ebProp.location.longitude)
      };
    } else {
      // Fallback: Generate deterministic coordinates based on location name and ID
      const idNum = parseInt(ebProp.public_id.replace(/\D/g, '')) || Math.random() * 10000;
      const latOffset = ((idNum % 100) - 50) / 1000; // -0.05 to +0.05
      const lngOffset = (((idNum * 7) % 100) - 50) / 1000;
      
      const locLower = locName.toLowerCase();
      let baseLat = 20.65; // Default Guadalajara
      let baseLng = -103.40;
      
      if (locLower.includes('ciudad de méxico') || locLower.includes('cdmx') || locLower.includes('polanco') || locLower.includes('condesa')) {
        baseLat = 19.4326;
        baseLng = -99.1332;
      } else if (locLower.includes('monterrey') || locLower.includes('san pedro garza')) {
        baseLat = 25.6866;
        baseLng = -100.3161;
      } else if (locLower.includes('querétaro') || locLower.includes('queretaro')) {
        baseLat = 20.5888;
        baseLng = -100.3899;
      } else if (locLower.includes('mérida') || locLower.includes('merida')) {
        baseLat = 20.9674;
        baseLng = -89.6237;
      } else if (locLower.includes('tulum')) {
        baseLat = 20.2114;
        baseLng = -87.4654;
      } else if (locLower.includes('cancún') || locLower.includes('cancun')) {
        baseLat = 21.1619;
        baseLng = -86.8515;
      }

      coordinates = {
        lat: baseLat + latOffset,
        lng: baseLng + lngOffset
      };
    }

    return {
      id: ebProp.public_id,
      slug: ebProp.public_id.toLowerCase(),
      title: ebProp.title,
      location: typeof ebProp.location === 'object' && ebProp.location !== null ? ebProp.location.name : ebProp.location,
      price,
      priceRaw,
      type,
      bedrooms: ebProp.bedrooms,
      bathrooms: ebProp.bathrooms,
      parking: ebProp.parking_spaces,
      landArea: ebProp.lot_size ? `${ebProp.lot_size} m²` : undefined,
      constructionArea: ebProp.construction_size ? `${ebProp.construction_size} m²` : '0 m²',
      description: ebProp.description || '',
      features: ebProp.features ? ebProp.features.map((f: any) => f.name) : [],
      images: ebProp.property_images ? ebProp.property_images.map((img: any) => img.url) : (ebProp.title_image_full ? [ebProp.title_image_full] : []),
      isFeatured: false,
      coordinates,
    } as Property;
  } catch (error) {
    console.warn('Error fetching EasyBroker property:', error);
    return null;
  }
};
