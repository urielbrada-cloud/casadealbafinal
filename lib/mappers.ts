import { Property, Development, BlogPost, TeamMember } from '../types';

export function mapProperty(row: any): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    price: row.price,
    priceRaw: Number(row.price_raw) || 0,
    type: row.type,
    bedrooms: row.bedrooms ?? undefined,
    bathrooms: row.bathrooms ?? undefined,
    parking: row.parking ?? undefined,
    landArea: row.land_area ?? undefined,
    constructionArea: row.construction_area,
    description: row.description || '',
    features: row.features || [],
    images: row.images || [],
    isFeatured: row.is_featured ?? false,
    coordinates: row.coordinates ?? undefined,
    googleMapsUrl: row.google_maps_url ?? undefined,
    pointsOfInterest: row.points_of_interest ?? undefined,
    amenities: row.amenities ?? undefined,
    videoUrl: row.video_url ?? undefined,
  };
}

export function mapDevelopment(row: any): Development {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline || '',
    location: row.location,
    startingPrice: row.starting_price,
    completionDate: row.completion_date || '',
    description: row.description || '',
    amenities: row.amenities || [],
    amenityCategories: row.amenity_categories ?? undefined,
    images: row.images || [],
    units: row.units || [],
    heroVideo: row.hero_video ?? undefined,
  };
}

export function mapBlogPost(row: any): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    content: row.content || '',
    author: row.author || 'Uriel De Alba',
    date: row.date,
    coverImage: row.cover_image || '',
    category: row.category || '',
  };
}

export function mapTeamMember(row: any): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio || '',
    image: row.image || '',
  };
}
