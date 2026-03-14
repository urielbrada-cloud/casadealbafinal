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

      return {
        id: ebProp.public_id,
        slug: ebProp.public_id.toLowerCase(),
        title: ebProp.title,
        location: ebProp.location,
        price,
        priceRaw,
        type,
        bedrooms: ebProp.bedrooms,
        bathrooms: ebProp.bathrooms,
        parking: ebProp.parking_spaces,
        landArea: ebProp.lot_size ? `${ebProp.lot_size} m²` : undefined,
        constructionArea: ebProp.construction_size ? `${ebProp.construction_size} m²` : '0 m²',
        description: ebProp.description || '',
        features: [], // EasyBroker summary doesn't include full features, would need detailed endpoint
        images: ebProp.title_image_full ? [ebProp.title_image_full] : [],
        isFeatured: false,
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

    return {
      id: ebProp.public_id,
      slug: ebProp.public_id.toLowerCase(),
      title: ebProp.title,
      location: ebProp.location,
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
    } as Property;
  } catch (error) {
    console.warn('Error fetching EasyBroker property:', error);
    return null;
  }
};
