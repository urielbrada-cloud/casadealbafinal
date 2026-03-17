
import { Property, Development, BlogPost, TeamMember } from '../types';

// --- DATA INITIALIZATION ---
// This is the "Seed" data. We populate it with the "Campamento Base" property.

const INITIAL_PROPERTIES: Property[] = [];

// --- DYNAMIC DATA MANAGER ---

const STORAGE_KEY = 'casa_de_alba_properties';

// Helper to get data from LocalStorage or Fallback to Initial
const loadProperties = (): Property[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    // Check if we need to update/merge new "seed" properties
    if (stored) {
        const parsed = JSON.parse(stored);
        
        // Define IDs of all required seed properties
        const seedIds = INITIAL_PROPERTIES.map(p => p.id);
        
        // Check if any seed property is missing from storage
        const missingSeeds = INITIAL_PROPERTIES.filter(seed => 
            !parsed.some((p: Property) => p.id === seed.id)
        );

        if (missingSeeds.length > 0) {
            // Merge missing seeds into existing storage
            // Note: We put seeds first to ensure they appear at the top/as intended
            const merged = [...missingSeeds, ...parsed];
            
            // Optional: If we want to *update* existing seeds with new code changes (like fixed typos),
            // we would need a more complex merge strategy (e.g. filter out old versions of seeds first).
            // For now, we just ensure they exist. To force update a specific property, we can use the ID check:
            
            // Force update specific properties by ID if they exist but might be outdated in local storage
            const updatedParsed = parsed.map((p: Property) => {
                const seedMatch = INITIAL_PROPERTIES.find(seed => seed.id === p.id);
                return seedMatch ? seedMatch : p; // Replace with code version if it's a seed property
            });
            
            // Add completely new seeds that weren't in storage
            const finalMerged = [...updatedParsed, ...missingSeeds.filter(s => !updatedParsed.some((p: Property) => p.id === s.id))];

            localStorage.setItem(STORAGE_KEY, JSON.stringify(finalMerged));
            return finalMerged;
        }
        
        // If storage has everything, but maybe outdated versions of seed props, force update them
        const updatedParsed = parsed.map((p: Property) => {
             const seedMatch = INITIAL_PROPERTIES.find(seed => seed.id === p.id);
             return seedMatch ? seedMatch : p;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedParsed));
        return updatedParsed;
    }

    // Initialize if empty
    if (INITIAL_PROPERTIES.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
    }
    return INITIAL_PROPERTIES;
  } catch (e) {
    console.error("Error loading properties", e);
    return INITIAL_PROPERTIES;
  }
};

const addFallbackCoordinates = (p: Property, index: number): Property => {
  if (p.coordinates && p.coordinates.lat && p.coordinates.lng) {
    return p;
  }
  
  // Fallback coordinates for mock data (Guadalajara/Zapopan area)
  const baseLat = 20.6736;
  const baseLng = -103.3440;
  
  // Generate a deterministic offset based on the property ID or index
  const idNum = parseInt(p.id.replace(/\D/g, '')) || index;
  const latOffset = ((idNum % 100) - 50) / 1000;
  const lngOffset = (((idNum * 7) % 100) - 50) / 1000;
  
  return {
    ...p,
    coordinates: {
      lat: baseLat + latOffset,
      lng: baseLng + lngOffset
    }
  };
};

// Exported getter that components should use
export const getProperties = (): Property[] => {
  return loadProperties().map(addFallbackCoordinates);
};

// Exported setter for the Admin Panel
export const saveProperties = (properties: Property[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  // Dispatch a custom event so components can listen to updates if they want
  window.dispatchEvent(new Event('properties-updated'));
};

// --- LEGACY EXPORTS ---
export const PROPERTIES = loadProperties();

export const DEVELOPMENTS: Development[] = [
  {
    id: 'd3',
    slug: 'nautica-residences-cancun',
    name: 'NAUTICA RESIDENCES',
    tagline: 'Venta de Departamentos en Cancún frente al mar.',
    location: 'Cancún, Q. Roo',
    startingPrice: '$6,380,000 MXN',
    completionDate: 'Preventa',
    description: '¿Busca departamentos en venta en Cancún con alta plusvalía? Nautica Residences es la oportunidad definitiva en el Caribe Mexicano. Ubicado estratégicamente cerca de la Laguna Nichupté y la Zona Hotelera, este desarrollo introduce el concepto "Hotel Living" para inversionistas inteligentes. Dos torres de lujo diseñadas para rentas vacacionales y uso residencial. Disfrute de amenidades de clase mundial como Bowling Alley, Simulador de Golf y Beach Club exclusivo en Costa Mujeres.',
    amenities: [
      'Sky Infinity Pool & Bar',
      'Beach Club Costa Mujeres',
      'Canchas de Pádel & Tenis',
      'Gimnasio Technogym',
      'Abundance Spa'
    ],
    amenityCategories: [
      {
        title: "WELLNESS",
        image: "https://lh3.googleusercontent.com/d/19ZWQYb4LcZg5zMjiSBVhywhO8ELyzXul", // Official Gallery Image
        items: ["Abundance Spa", "Zen Studio", "Indoor Oasis", "Seashell Beauty Salon", "Barber Shop", "Hammock Bay", "Cove (Rooftop Solarium)"]
      },
      {
        title: "FITNESS",
        image: "https://lh3.googleusercontent.com/d/11K4X499vs9xCJogoOQLIAE6Une5nLVpD", // Official Gallery Image
        items: ["All Fitness (Gym Technogym)", "Padel Court", "Tenis Court", "Reef Rock Climbing", "Mini Golf", "Sport Center", "Petanque", "Aqua Slide"]
      },
      {
        title: "SMART LIVING",
        image: "https://lh3.googleusercontent.com/d/15IXlNb8JAEuQaKFrh2rppyY30uaXrq-i", // Official Gallery Image
        items: ["Co-Working Lounge", "Nautical Power (Charging)", "Seguridad & Cámaras 24/7", "Entrada Controlada", "Compass Market", "Transporte Privado a Beach Club", "Renta de Lanchas & Catamaranes"]
      },
      {
        title: "COMMUNITY",
        image: "https://lh3.googleusercontent.com/d/1h5XLuTLQg8CCt-K4zxBr2xxXBgRy8jXV", // Official Gallery Image
        items: ["Family Pool & Kids Pool", "The Playground", "Kids Club", "Teens Club", "Arcade", "Cinema Lounge", "Marina Ballroom", "Marina Deck", "Activity Hub", "Pet Zone", "Kiddie Cutz"]
      },
      {
        title: "FOOD AND PLEASURE",
        image: "https://lh3.googleusercontent.com/d/1Oiuo-dtWD4Ge6qOj-2v37w8mqqqDJ9ga", // Official Gallery Image
        items: ["Beach Club Costa Mujeres", "Sky Infinity Pool & Bar", "Sky Lounge", "Lighthouse Bistro", "Piano Bar", "Sports Bar", "Coffee Corner", "Splash & Snack", "The Ace's (Rooftop)", "Media Room", "Music Hall"]
      }
    ],
    images: [
      // --- SLIDER PORTADA IMAGES (First 11) ---
      'https://lh3.googleusercontent.com/d/11Rlk0EKXdC3VaDNgHY5FDOYz0RvAPkNX',
      'https://lh3.googleusercontent.com/d/14XTy7La9ULj8WZPXgxXsPlt4lM2p0eBX',
      'https://lh3.googleusercontent.com/d/15v_Q6JvCtvVjoLmsTXmcKl_gGAaheLC5',
      'https://lh3.googleusercontent.com/d/198F9141-9vcSCq_IIJajeCbd9sJpF5FD',
      'https://lh3.googleusercontent.com/d/1NgJqUckQSWTz3w8XNuZJgTE5ochhkngj',
      'https://lh3.googleusercontent.com/d/1NpT0qy8HvKf6nudykcQpcf-tRDPHR_jp',
      'https://lh3.googleusercontent.com/d/1absdQjaS7NJPORuk7xqUyjmRvsrlnckA',
      'https://lh3.googleusercontent.com/d/1jr_2gyeSoU_FFGi1eoznbaB5BscRCdlR',
      'https://lh3.googleusercontent.com/d/1kCkm3Hxx540TFihBmfGbNgqxcC9iNcI4',
      'https://lh3.googleusercontent.com/d/1mU79wCj8vjcWDpyJGrvv-MjRG9EXBCgo',
      'https://lh3.googleusercontent.com/d/1nHWYrbFICXL2N8xKX76dMqHCo9h4zbkR',
      // --- GALLERY IMAGES ---
      'https://lh3.googleusercontent.com/d/10e03CMu8jg8H9awDk_1OQzLfmzI_IKxW',
      'https://lh3.googleusercontent.com/d/11K4X499vs9xCJogoOQLIAE6Une5nLVpD',
      'https://lh3.googleusercontent.com/d/13eymSwa1HmiDRcjX0Kv5_ec6htXnsGb3',
      'https://lh3.googleusercontent.com/d/15IXlNb8JAEuQaKFrh2rppyY30uaXrq-i',
      'https://lh3.googleusercontent.com/d/15fCHOBgLN5VNoxd4zBK6PWFZyYUJmhwl',
      'https://lh3.googleusercontent.com/d/18UWlJAGUo1YPyyI8_Adpdcna1oKYqLYv',
      'https://lh3.googleusercontent.com/d/18_L1rKKlfGAUKZtTj28uHv0iblIddMVN',
      'https://lh3.googleusercontent.com/d/18j6f4h1nQUz1zjhW4cxrYB2siyQ_QrPZ',
      'https://lh3.googleusercontent.com/d/19ZWQYb4LcZg5zMjiSBVhywhO8ELyzXul',
      'https://lh3.googleusercontent.com/d/1A2poVRN_2DwnH3OFCcALfOvYk_nMunZ2',
      'https://lh3.googleusercontent.com/d/1A7AainKMvAFeXIYrOqRgPbwhl7sciozX',
      'https://lh3.googleusercontent.com/d/1CGuWCeCJ0rtkbSimvotbVzbmpn0TLZiW',
      'https://lh3.googleusercontent.com/d/1ENkUKcFm_w0lxkSJUP0bhL06tMsCPvWB',
      'https://lh3.googleusercontent.com/d/1GOQrfHK7g7z-lGVCDKWF7XQii0bh6UYT',
      'https://lh3.googleusercontent.com/d/1NCswFTgEKgAl-IsLe176yacW--Vw2YeK',
      'https://lh3.googleusercontent.com/d/1O3k4fgAM8zcxBbQwbNU66pVFlDuZZEwz',
      'https://lh3.googleusercontent.com/d/1OCFSXMmYtPJV2JY4CR7thmtjd2a0n9aG',
      'https://lh3.googleusercontent.com/d/1OKKDdcEAQG_HxrVQMfVcJ6J40_2tP0R2',
      'https://lh3.googleusercontent.com/d/1Oiuo-dtWD4Ge6qOj-2v37w8mqqqDJ9ga',
      'https://lh3.googleusercontent.com/d/1Q373f_lHbTkLyogIZbzE8buRuEyns4fA',
      'https://lh3.googleusercontent.com/d/1QDWqDQLcx1PHVSa7N1C_EhfQ8AqxwZg1',
      'https://lh3.googleusercontent.com/d/1Qi3jPaJgmv5mKcZ8PnaB77ykK_oHt37Z',
      'https://lh3.googleusercontent.com/d/1RLxZAyxzJPsHXkl-CIkX7_yv0wYhUMgN',
      'https://lh3.googleusercontent.com/d/1SYUMh7yzn8_AiKna6nBt2BKkLf86G8nm',
      'https://lh3.googleusercontent.com/d/1Sl4rFz6bS4vlH2DlRMr1Unce5qPSvIJp',
      'https://lh3.googleusercontent.com/d/1VEJftoq-l6X1Te83g3iHPcHD3CgP-OPR',
      'https://lh3.googleusercontent.com/d/1VOV-Ib5TMC40Q8MOVZevZCi2EasaBNuH',
      'https://lh3.googleusercontent.com/d/1W4Yktcjmz__n0zIGUWb2LyYGbuLZpN2M',
      'https://lh3.googleusercontent.com/d/1_NZ2ANccfvg9H4lkqspq5bXxGtAkn7Z2',
      'https://lh3.googleusercontent.com/d/1cKcBiYzsoL8xBk8Qn9CrNFvVQ4gvar-j',
      'https://lh3.googleusercontent.com/d/1cPz544QOfRQKkTKLm7H9BKjDHl6Ljv92',
      'https://lh3.googleusercontent.com/d/1cU8aSOfu5y2wmWh5XWs-RtL8RUZdhv-O',
      'https://lh3.googleusercontent.com/d/1cggwMoRWKTDFn4JQVYM6g8QLj08B44i4',
      'https://lh3.googleusercontent.com/d/1dLMn5mRHIBDP5K4i6hbZxOHlBZ37XX_L',
      'https://lh3.googleusercontent.com/d/1dS2VkLWkH1SxvN-gkUwVLmIUY3ax_i2C',
      'https://lh3.googleusercontent.com/d/1ez3asDIJOFqbHGjFzlYCZwPxRC1ykGns',
      'https://lh3.googleusercontent.com/d/1fC5zGlFxUNTj6OyaN6DzppKHjhQQVVoU',
      'https://lh3.googleusercontent.com/d/1fb-YNpq4_Nf7kbvK7yocPlXro8WXlZBL',
      'https://lh3.googleusercontent.com/d/1h5XLuTLQg8CCt-K4zxBr2xxXBgRy8jXV',
      'https://lh3.googleusercontent.com/d/1hS2mnlxPkmcfUgj61PVHMIgLZpzobkpQ',
      'https://lh3.googleusercontent.com/d/1hkXAp_QI0aukFpKC6-kmv-cA_a7mg8MC',
      'https://lh3.googleusercontent.com/d/1lSu-ArDJlKpEOVZIIfc59KNEJm-UNYU_',
      'https://lh3.googleusercontent.com/d/1leCyRE3RG-CnNInnciUzw5DZTjkkn6qQ',
      'https://lh3.googleusercontent.com/d/1o5dO7pcEs4zt4dxWdr-Yc8RzM6IZMv9-',
      'https://lh3.googleusercontent.com/d/1ok434YWdcg7NfJgDXUwoWZXeBmdFaM4P',
      'https://lh3.googleusercontent.com/d/1sPt9Z1CnPyCb2ZfcPMaom1cZ2Dc31-6w',
      'https://lh3.googleusercontent.com/d/1sl4J4XO0eB05z9kLvv5gLnSK_RWHgVYd',
      'https://lh3.googleusercontent.com/d/1taZxHsfy64ueaPOuQ1BLb7ZatWBPGrzG',
      'https://lh3.googleusercontent.com/d/1wLjpAZJApM0WMcyTdneCES-WevnHA_S3',
      'https://lh3.googleusercontent.com/d/1wMEjgAg0tLNes76PCs2-iCaG6V7uJN95'
    ],
    units: [
        {
            name: "Small (S1)",
            area: "72.32 m²",
            bedrooms: 1,
            bathrooms: 1,
            price: "$6,380,000 MXN",
            image: "https://lh3.googleusercontent.com/d/133RpNoz9QVWJLhXW5b4NT_fW_eQmA7Fu"
        },
        {
            name: "Ocean Front (OF1)",
            area: "93.93 m²",
            bedrooms: 1, // 1 + Den
            bathrooms: 1,
            price: "$8,120,000 MXN",
            image: "https://lh3.googleusercontent.com/d/14-hZ4SAlIENi7Dzt4CX0OLA4DzD9kkys"
        },
        {
             name: "Medium (M1)",
             area: "115.67 m²",
             bedrooms: 2,
             bathrooms: 2,
             price: "$9,040,000 MXN",
             image: "https://lh3.googleusercontent.com/d/1CqwA3pJAwTAUExzwN98b0nEN1EXCc4Oi"
        },
        {
            name: "Large (L1)",
            area: "113.56 m²",
            bedrooms: 2, // 2 + Den
            bathrooms: 2,
            price: "$8,800,000 MXN",
            image: "https://lh3.googleusercontent.com/d/1PeWFJkt3jCxcB8EQ1zfW76pIkp4h7cuG"
        },
        {
            name: "Ocean View (OV)",
            area: "205.12 m²",
            bedrooms: 3,
            bathrooms: 3,
            price: "$17,670,000 MXN",
            image: "https://lh3.googleusercontent.com/d/1R-mA2AyTo2K-IZseFFnMQZrFa8-V6qxj"
        },
        {
            name: "Village / Villa (V1)",
            area: "235.56 m²",
            bedrooms: 3,
            bathrooms: 3,
            price: "$19,200,000 MXN",
            image: "https://lh3.googleusercontent.com/d/1SETy4S6QDWRlYeFlF4szCZjD_lLdPZ-R"
        },
        {
            name: "Penthouse (PH1)",
            area: "260.03 m²",
            bedrooms: 3,
            bathrooms: 3,
            price: "$22,850,000 MXN",
            image: "https://lh3.googleusercontent.com/d/1VaqVLFAypeO-rS_pXHfGOSqEZDpOX14q"
        }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b6',
    slug: 'mundial-2026-rentas-corto-plazo-airbnb',
    title: 'Mundial 2026: Por qué tu departamento podría rentarse un 700% más caro',
    excerpt: 'Con una afluencia estimada de 590,000 turistas, el Mundial 2026 reconfigurará el mercado de rentas a corto plazo. Analizamos la "fiebre" de precios en Monterrey y CDMX.',
    content: `
      <p>El Mundial de la FIFA 2026 no será solo un evento deportivo; para el sector inmobiliario en México, representa el mayor "pico de demanda" de la década. Con una afluencia estimada de <strong>590,000 turistas internacionales</strong> visitando únicamente las tres ciudades sede (Ciudad de México, Guadalajara y Monterrey), la infraestructura hotelera tradicional será insuficiente, obligando al mercado a volcarse masivamente hacia las plataformas de corta estancia como Airbnb.</p>

      <h3>1. El desborde de la capacidad hotelera</h3>
      <p>El análisis es claro: México no tiene suficientes cuartos de hotel para absorber el golpe de demanda. Se proyecta que <strong>90,000 de los visitantes</strong> optarán forzosamente por alojamientos alternativos, generando más de <strong>560,000 noches de alojamiento</strong> reservadas exclusivamente para el torneo.</p>
      
      <ul>
          <li><strong>Derrama económica directa:</strong> Solo en rentas a corto plazo, se estima una inyección de 558 millones de dólares en el país durante el evento.</li>
          <li><strong>Ingreso promedio:</strong> Un anfitrión en la Ciudad de México podría ingresar un promedio de <strong>$1,800 USD</strong> (aprox. $36,000 MXN) solo durante el mes del torneo.</li>
      </ul>

      <h3>2. Monterrey: El epicentro de la especulación</h3>
      <p>Monterrey presenta el caso más extremo de plusvalía temporal. Al ser una ciudad industrial con una oferta hotelera turística más limitada en comparación con CDMX o Cancún, la presión sobre los precios será brutal.</p>
      
      <img src="https://lh3.googleusercontent.com/d/1m4rpOe6HjUO-LJVMyMt2EWZbk8ocJFQB" alt="Estadio BBVA Monterrey Mundial 2026" />

      <ul>
          <li><strong>El aumento del 700%:</strong> En municipios aledaños al Estadio BBVA (Guadalupe), el costo promedio de alojamiento por 15 días podría saltar de $17,633 MXN a <strong>$136,459 MXN</strong>. Un incremento del 673%.</li>
          <li><strong>San Pedro Garza García:</strong> En la zona más exclusiva, el alojamiento por 15 días pasaría de $13,835 a $76,284 (+451%).</li>
      </ul>

      <h3>3. Ciudad de México: Precios de "Super Bowl"</h3>
      <p>En la capital, la cercanía al Estadio Azteca es el factor determinante. Se ha reportado que, para el partido inaugural, algunas propiedades premium podrían cotizarse hasta en <strong>$150,000 MXN por noche</strong>.</p>
      <p>El reto no es solo tener la propiedad, sino ofrecer una experiencia logística impecable en una ciudad que estará saturada. Los visitantes evaluarán la ciudad en tiempo real, lo que pone presión sobre la calidad del servicio del anfitrión.</p>

      <h3>4. El "Boom" Comercial: No solo es vivienda</h3>
      <p>El impacto se derrama hacia el retail. Las marcas internacionales están buscando agresivamente espacios para "Fan Zones" y Pop-up Stores.</p>
      <img src="https://lh3.googleusercontent.com/d/1sWOz9wm_Qbkv4D2qWVnnw5GMFu7kLxoj" alt="Fan Zones Mundial 2026" />
      <p>Se estima un incremento de entre <strong>25% y 40%</strong> en las rentas de locales comerciales ubicados en corredores clave como Reforma (CDMX) y Puerta de Hierro (GDL).</p>

      <h3>5. El "Turismo de Retorno"</h3>
      <p>Un dato crucial para el inversionista a largo plazo: el beneficio no termina con el silbatazo final. Se proyecta un fenómeno de "turismo de retorno" que generaría <strong>239 millones de dólares adicionales</strong> en los cinco años posteriores al Mundial, consolidando una ocupación alta sostenida hasta 2030.</p>

      <blockquote>
          <strong>Riesgos y Consideraciones:</strong> Este "boom" agrava el desplazamiento de residentes locales (gentrificación) y presiona la infraestructura de movilidad. Elegir ubicaciones estratégicas conectadas al transporte masivo será la clave para mitigar estos riesgos y garantizar la experiencia del usuario.
      </blockquote>
    `,
    author: 'Editorial Casa de Alba',
    date: '20 Feb, 2025',
    coverImage: 'https://lh3.googleusercontent.com/d/1LZzHy_AX6ZslJHQY5D47o1jw8mdph4lq',
    category: 'Mercado & Inversión'
  },
  {
    id: 'b4',
    slug: 'arquitectura-biofilica-lujo-sustentable',
    title: 'El Retorno al Origen: Arquitectura Biofílica en el Lujo Moderno',
    excerpt: 'El concreto ha cedido el paso a la naturaleza. Exploramos cómo los desarrollos premium en Zapopan están integrando bosques vivos dentro de sus estructuras para reducir el estrés y purificar el aire.',
    content: '<p>Contenido demo sobre arquitectura...</p>',
    author: 'Arq. Sofía Riquelme',
    date: '15 Dic, 2024',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop',
    category: 'Arquitectura'
  },
  {
    id: 'b5',
    slug: 'smart-homes-domotica-2025',
    title: 'Más allá de Alexa: La verdadera Smart Home del 2025',
    excerpt: 'La automatización ya no es un gadget, es la infraestructura invisible del confort. Desde cristales que se opacan a demanda hasta sistemas de seguridad predictiva con IA.',
    content: '<p>Contenido demo sobre tecnología...</p>',
    author: 'Uriel De Alba',
    date: '02 Ene, 2025',
    coverImage: 'https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=2670&auto=format&fit=crop',
    category: 'Tecnología'
  }
];

export const TEAM: TeamMember[] = [
  {
    id: 't1',
    name: 'Uriel De Alba',
    role: 'Fundador & CEO',
    bio: 'Visionario. Fundó Casa de Alba para redefinir el mercado con tecnología y alianzas estratégicas.',
    image: 'https://lh3.googleusercontent.com/d/1hx7vxWDh9y4zmAIAOudQw5HJaIeS6jV1'
  },
  {
    id: 't2',
    name: 'Lorena Vázquez',
    role: 'Directora Comercial',
    bio: 'Más de 15 años gestionando portafolios de alto valor en Puerta de Hierro y Valle Real. Experta en negociación.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 't3',
    name: 'Lic. Carlos Mendoza',
    role: 'Consultor Jurídico',
    bio: 'Especialista en derecho inmobiliario y estructuración patrimonial. Garantiza la certeza jurídica de cada inversión.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 't4',
    name: 'Arq. Sofía Riquelme',
    role: 'Head of Branding',
    bio: 'Fusiona arquitectura y marketing para crear narrativas visuales que elevan el valor percibido de cada propiedad.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop'
  }
];
