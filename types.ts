
export type PropertyType = 'residential' | 'commercial' | 'land' | 'development';

export interface PointOfInterest {
  name: string;
  distance: string; // e.g., "5 min"
  category: 'school' | 'shopping' | 'hospital' | 'office' | 'tourism';
}

export interface UnitType {
  name: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  price: string;
  image: string;
}

export interface AmenityCategory {
  title: string;
  items: string[];
  image: string; // Background image for the block
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: string;
  priceRaw: number;
  type: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;     // Nuevos campos
  landArea?: string;    // m2 Terreno
  constructionArea: string; // m2 Construcción (antes area)
  description: string;
  features: string[];
  images: string[];
  isFeatured?: boolean;
  coordinates?: { lat: number; lng: number };
  googleMapsUrl?: string; // Link directo a Google Maps (Short URL)
  pointsOfInterest?: PointOfInterest[];
  amenities?: string[]; // Legacy o specific amenidades
  videoUrl?: string; // Link a recorrido virtual
}

export interface Development {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  startingPrice: string;
  completionDate: string;
  description: string;
  amenities: string[]; // Legacy flat list
  amenityCategories?: AmenityCategory[]; // New grouped structure
  images: string[];
  units: UnitType[]; // New field for specific unit types
  heroVideo?: string; // Optional video background
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown
  author: string;
  date: string;
  coverImage: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface SearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: PropertyType;
}
