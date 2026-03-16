
import { Property, Development, BlogPost, TeamMember } from '../types';

// --- DATA INITIALIZATION ---
// This is the "Seed" data. We populate it with the "Campamento Base" property.

const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-campamento-base-001',
    slug: 'residencia-campamento-base-los-robles',
    title: 'Casa en Los Robles, Zapopan',
    location: 'Coto Bonsai, Los Robles, Zapopan',
    price: '$11,900,000 MXN',
    priceRaw: 11900000,
    type: 'residential',
    bedrooms: 4,
    bathrooms: 5,
    parking: 4,
    landArea: '276.00 m²',
    constructionArea: '288.36 m²',
    isFeatured: true,
    description: `Diseñada para quien busca desconectarse de la ciudad sin salir de ella. Esta residencia en el Coto Bonsai de Los Robles combina una logística impecable con el estilo de vida wellness. 
    
    Destaca por su cochera para 4 autos (una rareza en la zona) y su versatilidad, ofreciendo un estudio con baño completo en planta baja ideal para visitas o home office. Disfruta de una sala a doble altura que inunda de luz los espacios y un Roof Garden con doble terraza y vistas a la reserva natural.
    
    Ubicada en una zona privilegiada de Zapopan, ofrece acceso inmediato a rutas de ciclismo y senderismo, además de la opción de un Club Deportivo privado de 23,000 m² (membresía opcional). Acabados de lujo, privacidad total y seguridad con doble filtro de acceso.`,
    features: [
      'Seguridad 24/7', 
      'Acceso Controlado', 
      'Cochera 4 Autos', 
      'Recámara en PB', 
      'Baño Completo en PB', 
      'Doble Altura', 
      'Roof Garden', 
      'Vista al Bosque', 
      'Club Deportivo (Opcional)', 
      'Pet Friendly'
    ],
    images: [
      'https://lh3.googleusercontent.com/d/139pJ7EwmqcEscmetvxfTkBJPGh22CJ32', // Interior Doble Altura (Ahora Principal)
      'https://lh3.googleusercontent.com/d/10arWwKb6OTvpH8qqptND2LmmYeSdlLxa', // Fachada Principal (Antes 1ra)
      'https://lh3.googleusercontent.com/d/135EnPkx6xLD3S2PK010LKqB63-fxQGdi',
      'https://lh3.googleusercontent.com/d/17vXKotYqXe0sYpkpa74vNnOXoNwSoH91',
      'https://lh3.googleusercontent.com/d/18kB0i6dQR19Q1R8yK_nm40fZkOcKGYHh',
      'https://lh3.googleusercontent.com/d/1Awlquf6M5G2mcp_kHqnFCMrKW0Tptkx9',
      'https://lh3.googleusercontent.com/d/1BSUv4pve4XkTE-j-1Px7c9JSLKqoCKau',
      'https://lh3.googleusercontent.com/d/1C55zv94SV3cpV1BfIVAW2pnz1zb9pbo6',
      'https://lh3.googleusercontent.com/d/1DcSp4GFDf3tHkO4zEDlENwqOwi9krjm0',
      'https://lh3.googleusercontent.com/d/1GczuOZtuTQFXHziSv4dDr6DjojM7wu9g',
      'https://lh3.googleusercontent.com/d/1KvOL6kme5EDqtx0IAlGNEh5-2SWLC0v1',
      'https://lh3.googleusercontent.com/d/1M9DxKSXI2MwfW0ScgvgAU8BLAb0txugS', // Cocina Detalle
      'https://lh3.googleusercontent.com/d/1MgU-mPlu99KOGYcGb2aXrv3s1Z_qq2gb',
      'https://lh3.googleusercontent.com/d/1R-_T4EMFawqBnbxjdo8ynqplkU0BUqRx',
      'https://lh3.googleusercontent.com/d/1SjE8B7T8FWiV-w5nhD7KeqNMRNkNfbtO',
      'https://lh3.googleusercontent.com/d/1TA0WAoemrCkswE50VJLRt45gLhL1VUzp',
      'https://lh3.googleusercontent.com/d/1TLMO3m3SVz30w_RVVEcdPHrgsT2DmDPj',
      'https://lh3.googleusercontent.com/d/1VN7I16sPH-1dACIx_M4cl0SoLCmsnRGQ',
      'https://lh3.googleusercontent.com/d/1Vn_jeVR49nJBwFOtbgUKrQ7wjEqtKWRs',
      'https://lh3.googleusercontent.com/d/1YJaE4fFl1svjPBTgxvvpX5thgbjoXZEY', // Roof Garden
      'https://lh3.googleusercontent.com/d/1ZjqgWBt-rYcbAhyfjAylg8MgpQ-Ey1aY',
      'https://lh3.googleusercontent.com/d/1_GMEbBZWSvKqg-uxWoRS1GllBdTU8OKN',
      'https://lh3.googleusercontent.com/d/1bq56_OfBY8TNsDX_pAFvDwLoqbm2yNdU',
      'https://lh3.googleusercontent.com/d/1bsohA_uTumtyG0lZcVUQ-9R29v6aMTmn',
      'https://lh3.googleusercontent.com/d/1cyGPMqKszWMZbooaDTV9FTx6kkGKu-zC',
      'https://lh3.googleusercontent.com/d/1gIr8eqTW3NGNmdDUWiVnYLwAmc7x0RjN',
      'https://lh3.googleusercontent.com/d/1kquDhGVxajmHJVOLzl-BoWBPuBPsck8P',
      'https://lh3.googleusercontent.com/d/1lJnKbpLvrnXNuXg_aH1I2NYuTuwOZciz',
      'https://lh3.googleusercontent.com/d/1lq-zYjqlpU0nlyQtjUjQ9EINgUqtx93L',
      'https://lh3.googleusercontent.com/d/1n3kwnvLzEyaIt7kmt1gUxxd1BoBeq7jW',
      'https://lh3.googleusercontent.com/d/1nC3Q6n5AARWuyr3_ZRdMMqqoaWO1hZI3',
      'https://lh3.googleusercontent.com/d/1owY2zAjV9CUDo8Dedkm78iUe-XDE-8J8',
      'https://lh3.googleusercontent.com/d/1s2Ahu4cqPFIX_5p2IR7DgQAohNAM9f6z',
      'https://lh3.googleusercontent.com/d/1uRKB3R7gm1OW1Koy6O06QjoZkyPIMmQA',
      'https://lh3.googleusercontent.com/d/1ujrcPT5uMlotzgjhHvdF9KMsiVADKwBm',
      'https://lh3.googleusercontent.com/d/1xSwrduND6zY8hQQJyd_-ImrrfXWn8XTy',
      'https://lh3.googleusercontent.com/d/1z_FjCW8CXyzGKkf7rqSeyPqn0CW1t9Q1'
    ],
    coordinates: { lat: 20.610205, lng: -103.488747 },
    googleMapsUrl: 'https://maps.app.goo.gl/Q51TaGkid7r76uFL8',
    pointsOfInterest: [
      { name: 'Bosque de la Primavera', distance: 'Colindante', category: 'tourism' },
      { name: 'Club Deportivo Los Robles', distance: '2 min', category: 'shopping' },
      { name: 'Technology Park', distance: '10 min', category: 'office' },
      { name: 'Prepa Tec de Monterrey', distance: '12 min', category: 'school' },
      { name: 'Estadio Akron', distance: '15 min', category: 'tourism' }
    ]
  },
  {
    id: 'prop-landmark-reserve-003-sale',
    slug: 'departamento-venta-landmark-reserve-piso-32',
    title: 'Depto. en Venta Landmark Reserve Piso 32',
    location: 'The Landmark Reserve, Puerta de Hierro, Zapopan',
    price: '$10,790,000 MXN',
    priceRaw: 10790000,
    type: 'residential',
    bedrooms: 1,
    bathrooms: 1.5,
    parking: 2,
    landArea: 'N/A',
    constructionArea: '87 m²',
    isFeatured: true,
    description: `OPORTUNIDAD DE INVERSIÓN EN PISO 32. Adquiere el único departamento de 1 recámara en The Landmark Reserve con 2 CAJONES DE ESTACIONAMIENTO independientes.
    
    Plusvalía garantizada en el desarrollo vertical más icónico de Zapopan. Esta propiedad ofrece vistas panorámicas incomparables hacia Royal Country desde su terraza privada en el nivel 32. Combina lujo y funcionalidad en 87 m², ofreciendo una recámara principal con vestidor y baño completo, un baño de visitas adicional, cocina equipada de alta gama, cuarto de servicio y bodega. Ideal para ejecutivos de alto nivel o parejas.
    
    VIVE EN UN RESORT: El edificio cuenta con las mejores áreas comunes de Andares, incluyendo Sky Pool con carriles de nado, gimnasio de alto rendimiento, spa con hidroterapia, Business Center y Coworking (ideal para Home Office). Todo esto respaldado por servicio de Concierge, Bellboy y Valet Parking 24/7.
    
    UBICACIÓN INMEJORABLE: En el corazón de Puerta de Hierro. Baja del elevador y camina a los mejores restaurantes de Plaza Andares y The Landmark.
    
    Una joya para inversionistas buscando rentas de alto perfil o plataformas de corta estancia.`,
    features: [
      'Venta / Inversión',
      'Piso 32',
      'Vistas Panorámicas',
      'Terraza',
      '2 Cajones Independientes',
      'Bodega',
      'Cuarto de Servicio',
      'Sky Pool & Carril de Nado',
      'Gym & Spa',
      'Concierge 24/7'
    ],
    images: [
      'https://lh3.googleusercontent.com/d/1-GofpkZneXkMYG0FgXxe2J99a7KNHDEk', // Nueva Foto de Portada
      'https://lh3.googleusercontent.com/d/1-5KFd1_QAesQhoqToVSmNbHQVAZJLAQG',
      'https://lh3.googleusercontent.com/d/11g6eVr6ZjrLiY0VCX2JOn4MBZX9cbTyA',
      'https://lh3.googleusercontent.com/d/12k1R98ZngvGf5FqFwnP5buQrE9WTc58g',
      'https://lh3.googleusercontent.com/d/13Fiis7brmmnb8cKruX_hFK5u308J43Vi',
      'https://lh3.googleusercontent.com/d/13RQjKwhyENf_aCxaUNJwcoKOuG96Rd9B',
      'https://lh3.googleusercontent.com/d/14VlYw3Z708t3o2obI2udENFEtpephmgU',
      'https://lh3.googleusercontent.com/d/15s4W78wWs4ulQjW6R9RWrVyo6IDxgWQ9',
      'https://lh3.googleusercontent.com/d/16SCOuONkYC-epbnVlaLT_4kVlh57s48l',
      'https://lh3.googleusercontent.com/d/16VAUAFovY72xIpWjmNljt7XUPtGyDjH_',
      'https://lh3.googleusercontent.com/d/18RR7FtIkm-RtlS5SFR3RuQHa4RU0Xj81',
      'https://lh3.googleusercontent.com/d/18oRk5KNx5iESPcMrCLqKkFKUKDJcJxWz',
      'https://lh3.googleusercontent.com/d/193NqdBna44cksgtlt4wQrmVIpv8gK98R',
      'https://lh3.googleusercontent.com/d/1A4yAP3e6gPka_ZoBP1YV8V7PzZIX_oAH',
      'https://lh3.googleusercontent.com/d/1BYuupWSFVTLlfYmsbBzAbYtfscXT9hIv',
      'https://lh3.googleusercontent.com/d/1BlglM8M4haGQoJxL0_H1qIJ3E-Lf5Om4',
      'https://lh3.googleusercontent.com/d/1CFHasQQw4DNfOgGmehp2krV4LHyXc4Py',
      'https://lh3.googleusercontent.com/d/1FBQipGnFEFmhZvA6iB_npVpeX39h60op',
      'https://lh3.googleusercontent.com/d/1Fb2rLEO4DaYFVsUoI1xeI6lOFluPs3kh',
      'https://lh3.googleusercontent.com/d/1FszbpVimY0K6v2mmYzzpx_DTJqqv8WoQ',
      'https://lh3.googleusercontent.com/d/1Hs0-fj7qu0JH080t426LsB3X0gdAI1th',
      'https://lh3.googleusercontent.com/d/1JazCjs-SXvJ9D3RjBkckwdqiRfFjJsku',
      'https://lh3.googleusercontent.com/d/1KOE3FCWvZrY71lVaPMog7-GiSqZ-qMJn',
      'https://lh3.googleusercontent.com/d/1LWCg7BVYDaznIIosuikbz7syjeAWN8RG',
      'https://lh3.googleusercontent.com/d/1OUJU9i0Y8g27CjzChkjamIrL5RMdnAXo',
      'https://lh3.googleusercontent.com/d/1RS7CZFZiDdpr-NtUnJg3U8T0Srs26NNj',
      'https://lh3.googleusercontent.com/d/1SHvyO2S_KxzE-ym1ucbVv4J3pMZmcpWI',
      'https://lh3.googleusercontent.com/d/1Tz0mDmHFm8XOYieT95wq26_EYEe--w_z',
      'https://lh3.googleusercontent.com/d/1V-Ub1270uj9zYqFI1nMD1FPgzr7eZqJz',
      'https://lh3.googleusercontent.com/d/1YTG1PMS5aio9Q8CeC2jeDUUibqXDwL8X',
      'https://lh3.googleusercontent.com/d/1YyKZDpaOnkrNIikc6oUgB0kHSURVLTl9',
      'https://lh3.googleusercontent.com/d/1e3-GCReW6oKOhpyL2Y4PTonqXDtzfyTC',
      'https://lh3.googleusercontent.com/d/1fEyFY3EpYH0LpZQ3lwhoPddJxGEYDkXh',
      'https://lh3.googleusercontent.com/d/1gC9J7UbEfQLzyFk6hrqyxK58XJ6nI-Q2',
      'https://lh3.googleusercontent.com/d/1hTHe9uOYZqK_5Wx2klv1jWTKidmeY_lG',
      'https://lh3.googleusercontent.com/d/1hcnBviIPVwrsm8Ui5d2Us5lphObZDRb2',
      'https://lh3.googleusercontent.com/d/1jY6JHIN_NBsupGndX8-goBvQQteyA0-b',
      'https://lh3.googleusercontent.com/d/1kYF26B86CHt43Vemx0eZ5IMZ0ijY7KTt',
      'https://lh3.googleusercontent.com/d/1lEGehl7IJFk6FVqVhITHgs8r1xAFqweb',
      'https://lh3.googleusercontent.com/d/1lWPcG_7P8fik8knzi13iZyaPFyj393f3',
      'https://lh3.googleusercontent.com/d/1lbPGlzc1zRUfGIRIpE5QjGGWqTytC1jF',
      'https://lh3.googleusercontent.com/d/1m-5Ap6zt4GJcQCsgx5Ew_eA9Uao3v5Fx',
      'https://lh3.googleusercontent.com/d/1ma8ax2p06_suvAVghYH7AhP7u4yk5mH1',
      'https://lh3.googleusercontent.com/d/1nsY7hMzvIO4vP-F1rBd82gWC50G4b5ta',
      'https://lh3.googleusercontent.com/d/1osQzQeclFbeD82yc7uDpfH3DyJCNwa1O',
      'https://lh3.googleusercontent.com/d/1pPXR_6Kg0vqLXbDXVvoW5z71zZ3zDOZ_',
      'https://lh3.googleusercontent.com/d/1t862-0weu1iy2efb5C8CT6Q-Mja9q0gw',
      'https://lh3.googleusercontent.com/d/1ueRkg0IlYe8FxtbAZRYePF6zJqcNwuSg',
      'https://lh3.googleusercontent.com/d/1untsX1iYBgpKwDEStfX1zLOlMQidX5Eq',
      'https://lh3.googleusercontent.com/d/1xl6EXp9fJHuS-AhtGNPYgv9DtJTPGsE5'
    ],
    coordinates: { lat: 20.711623, lng: -103.411649 },
    googleMapsUrl: 'https://maps.app.goo.gl/msmv71xoojV3t8wk7',
    pointsOfInterest: [
      { name: 'Plaza Andares', distance: '1 min', category: 'shopping' },
      { name: 'The Landmark', distance: 'Mismo edificio', category: 'shopping' },
      { name: 'Hospital Puerta de Hierro', distance: '3 min', category: 'hospital' },
      { name: 'Club de Industriales', distance: '5 min', category: 'office' },
      { name: 'Bosque Colomos', distance: '10 min', category: 'tourism' }
    ]
  },
  {
    id: 'prop-landmark-reserve-002',
    slug: 'departamento-renta-landmark-reserve-piso-32',
    title: 'Depto. en Renta Landmark Reserve Piso 32',
    location: 'The Landmark Reserve, Puerta de Hierro, Zapopan',
    price: '$48,000 MXN / Mes',
    priceRaw: 48000,
    type: 'residential',
    bedrooms: 1,
    bathrooms: 1.5,
    parking: 2,
    landArea: 'N/A',
    constructionArea: '87 m²',
    isFeatured: true,
    description: `OPORTUNIDAD EN PISO 32. Renta el único departamento de 1 recámara en The Landmark Reserve con 2 CAJONES DE ESTACIONAMIENTO independientes.
    
    Disfruta de vistas panorámicas incomparables hacia Royal Country desde tu terraza privada en el nivel 32. Este departamento combina lujo y funcionalidad en 87 m², ofreciendo una recámara principal con vestidor y baño completo, un baño de visitas adicional, cocina equipada de alta gama, cuarto de servicio y bodega.
    
    VIVE EN UN RESORT: El edificio cuenta con las mejores áreas comunes de Andares, incluyendo Sky Pool con carriles de nado, gimnasio de alto rendimiento, spa con hidroterapia, Business Center y Coworking (ideal para Home Office). Todo esto respaldado por servicio de Concierge, Bellboy y Valet Parking 24/7.
    
    UBICACIÓN INMEJORABLE: En el corazón de Puerta de Hierro. Baja del elevador y camina a los mejores restaurantes de Plaza Andares y The Landmark.
    
    *Renta incluye mantenimiento.*`,
    features: [
      'Piso 32',
      'Vistas Panorámicas',
      'Terraza',
      '2 Cajones Independientes',
      'Bodega',
      'Cuarto de Servicio',
      'Sky Pool & Carril de Nado',
      'Gym & Spa',
      'Business Center',
      'Concierge 24/7'
    ],
    images: [
      'https://lh3.googleusercontent.com/d/1-5KFd1_QAesQhoqToVSmNbHQVAZJLAQG',
      'https://lh3.googleusercontent.com/d/1-GofpkZneXkMYG0FgXxe2J99a7KNHDEk',
      'https://lh3.googleusercontent.com/d/11g6eVr6ZjrLiY0VCX2JOn4MBZX9cbTyA',
      'https://lh3.googleusercontent.com/d/12k1R98ZngvGf5FqFwnP5buQrE9WTc58g',
      'https://lh3.googleusercontent.com/d/13Fiis7brmmnb8cKruX_hFK5u308J43Vi',
      'https://lh3.googleusercontent.com/d/13RQjKwhyENf_aCxaUNJwcoKOuG96Rd9B',
      'https://lh3.googleusercontent.com/d/14VlYw3Z708t3o2obI2udENFEtpephmgU',
      'https://lh3.googleusercontent.com/d/15s4W78wWs4ulQjW6R9RWrVyo6IDxgWQ9',
      'https://lh3.googleusercontent.com/d/16SCOuONkYC-epbnVlaLT_4kVlh57s48l',
      'https://lh3.googleusercontent.com/d/16VAUAFovY72xIpWjmNljt7XUPtGyDjH_',
      'https://lh3.googleusercontent.com/d/18RR7FtIkm-RtlS5SFR3RuQHa4RU0Xj81',
      'https://lh3.googleusercontent.com/d/18oRk5KNx5iESPcMrCLqKkFKUKDJcJxWz',
      'https://lh3.googleusercontent.com/d/193NqdBna44cksgtlt4wQrmVIpv8gK98R',
      'https://lh3.googleusercontent.com/d/1A4yAP3e6gPka_ZoBP1YV8V7PzZIX_oAH',
      'https://lh3.googleusercontent.com/d/1BYuupWSFVTLlfYmsbBzAbYtfscXT9hIv',
      'https://lh3.googleusercontent.com/d/1BlglM8M4haGQoJxL0_H1qIJ3E-Lf5Om4',
      'https://lh3.googleusercontent.com/d/1CFHasQQw4DNfOgGmehp2krV4LHyXc4Py',
      'https://lh3.googleusercontent.com/d/1FBQipGnFEFmhZvA6iB_npVpeX39h60op',
      'https://lh3.googleusercontent.com/d/1Fb2rLEO4DaYFVsUoI1xeI6lOFluPs3kh',
      'https://lh3.googleusercontent.com/d/1FszbpVimY0K6v2mmYzzpx_DTJqqv8WoQ',
      'https://lh3.googleusercontent.com/d/1Hs0-fj7qu0JH080t426LsB3X0gdAI1th',
      'https://lh3.googleusercontent.com/d/1JazCjs-SXvJ9D3RjBkckwdqiRfFjJsku',
      'https://lh3.googleusercontent.com/d/1KOE3FCWvZrY71lVaPMog7-GiSqZ-qMJn',
      'https://lh3.googleusercontent.com/d/1LWCg7BVYDaznIIosuikbz7syjeAWN8RG',
      'https://lh3.googleusercontent.com/d/1OUJU9i0Y8g27CjzChkjamIrL5RMdnAXo',
      'https://lh3.googleusercontent.com/d/1RS7CZFZiDdpr-NtUnJg3U8T0Srs26NNj',
      'https://lh3.googleusercontent.com/d/1SHvyO2S_KxzE-ym1ucbVv4J3pMZmcpWI',
      'https://lh3.googleusercontent.com/d/1Tz0mDmHFm8XOYieT95wq26_EYEe--w_z',
      'https://lh3.googleusercontent.com/d/1V-Ub1270uj9zYqFI1nMD1FPgzr7eZqJz',
      'https://lh3.googleusercontent.com/d/1YTG1PMS5aio9Q8CeC2jeDUUibqXDwL8X',
      'https://lh3.googleusercontent.com/d/1YyKZDpaOnkrNIikc6oUgB0kHSURVLTl9',
      'https://lh3.googleusercontent.com/d/1e3-GCReW6oKOhpyL2Y4PTonqXDtzfyTC',
      'https://lh3.googleusercontent.com/d/1fEyFY3EpYH0LpZQ3lwhoPddJxGEYDkXh',
      'https://lh3.googleusercontent.com/d/1gC9J7UbEfQLzyFk6hrqyxK58XJ6nI-Q2',
      'https://lh3.googleusercontent.com/d/1hTHe9uOYZqK_5Wx2klv1jWTKidmeY_lG',
      'https://lh3.googleusercontent.com/d/1hcnBviIPVwrsm8Ui5d2Us5lphObZDRb2',
      'https://lh3.googleusercontent.com/d/1jY6JHIN_NBsupGndX8-goBvQQteyA0-b',
      'https://lh3.googleusercontent.com/d/1kYF26B86CHt43Vemx0eZ5IMZ0ijY7KTt',
      'https://lh3.googleusercontent.com/d/1lEGehl7IJFk6FVqVhITHgs8r1xAFqweb',
      'https://lh3.googleusercontent.com/d/1lWPcG_7P8fik8knzi13iZyaPFyj393f3',
      'https://lh3.googleusercontent.com/d/1lbPGlzc1zRUfGIRIpE5QjGGWqTytC1jF',
      'https://lh3.googleusercontent.com/d/1m-5Ap6zt4GJcQCsgx5Ew_eA9Uao3v5Fx',
      'https://lh3.googleusercontent.com/d/1ma8ax2p06_suvAVghYH7AhP7u4yk5mH1',
      'https://lh3.googleusercontent.com/d/1nsY7hMzvIO4vP-F1rBd82gWC50G4b5ta',
      'https://lh3.googleusercontent.com/d/1osQzQeclFbeD82yc7uDpfH3DyJCNwa1O',
      'https://lh3.googleusercontent.com/d/1pPXR_6Kg0vqLXbDXVvoW5z71zZ3zDOZ_',
      'https://lh3.googleusercontent.com/d/1t862-0weu1iy2efb5C8CT6Q-Mja9q0gw',
      'https://lh3.googleusercontent.com/d/1ueRkg0IlYe8FxtbAZRYePF6zJqcNwuSg',
      'https://lh3.googleusercontent.com/d/1untsX1iYBgpKwDEStfX1zLOlMQidX5Eq',
      'https://lh3.googleusercontent.com/d/1xl6EXp9fJHuS-AhtGNPYgv9DtJTPGsE5'
    ],
    coordinates: { lat: 20.711623, lng: -103.411649 },
    googleMapsUrl: 'https://maps.app.goo.gl/msmv71xoojV3t8wk7',
    pointsOfInterest: [
      { name: 'Plaza Andares', distance: '1 min', category: 'shopping' },
      { name: 'The Landmark', distance: 'Mismo edificio', category: 'shopping' },
      { name: 'Hospital Puerta de Hierro', distance: '3 min', category: 'hospital' },
      { name: 'Club de Industriales', distance: '5 min', category: 'office' },
      { name: 'Bosque Colomos', distance: '10 min', category: 'tourism' }
    ]
  },
  {
    id: 'prop-cdmx-polanco-001',
    slug: 'penthouse-polanco-cdmx',
    title: 'Penthouse de Lujo en Polanco',
    location: 'Polanco, Ciudad de México',
    price: '$25,000,000 MXN',
    priceRaw: 25000000,
    type: 'residential',
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 3,
    landArea: 'N/A',
    constructionArea: '320 m²',
    isFeatured: true,
    description: `Espectacular Penthouse en el corazón de Polanco con vistas al Parque Lincoln. Acabados de importación, pisos de madera de roble, y una terraza privada de 80m2.`,
    features: ['Seguridad 24/7', 'Terraza Privada', 'Elevador Directo', 'Cuarto de Servicio'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687931-cebf004f96eb?q=80&w=800&auto=format&fit=crop'
    ],
    coordinates: { lat: 19.4326, lng: -99.1932 },
    googleMapsUrl: 'https://maps.app.goo.gl/Q51TaGkid7r76uFL8',
    pointsOfInterest: []
  },
  {
    id: 'prop-mty-sanpedro-001',
    slug: 'residencia-san-pedro-garza-garcia',
    title: 'Residencia en San Pedro Garza García',
    location: 'San Pedro Garza García, Monterrey',
    price: '$35,500,000 MXN',
    priceRaw: 35500000,
    type: 'residential',
    bedrooms: 4,
    bathrooms: 5,
    parking: 4,
    landArea: '600 m²',
    constructionArea: '550 m²',
    isFeatured: true,
    description: `Majestuosa residencia con vistas a la Sierra Madre. Diseño arquitectónico contemporáneo, alberca infinita y jardín paisajista.`,
    features: ['Alberca Infinita', 'Vistas a la Montaña', 'Cine en Casa', 'Jardín Paisajista'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop'
    ],
    coordinates: { lat: 25.6511, lng: -100.3585 },
    googleMapsUrl: 'https://maps.app.goo.gl/Q51TaGkid7r76uFL8',
    pointsOfInterest: []
  },
  {
    id: 'prop-tulum-aldeazama-001',
    slug: 'villa-aldea-zama-tulum',
    title: 'Villa Exclusiva en Aldea Zama',
    location: 'Aldea Zama, Tulum',
    price: '$12,000,000 MXN',
    priceRaw: 12000000,
    type: 'residential',
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    landArea: '300 m²',
    constructionArea: '250 m²',
    isFeatured: true,
    description: `Villa rodeada de selva en la zona más exclusiva de Tulum. Diseño eco-chic, alberca privada y paneles solares. A 10 minutos de la playa.`,
    features: ['Alberca Privada', 'Eco-Chic', 'Paneles Solares', 'Seguridad 24/7'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=800&auto=format&fit=crop'
    ],
    coordinates: { lat: 20.2014, lng: -87.4554 },
    googleMapsUrl: 'https://maps.app.goo.gl/Q51TaGkid7r76uFL8',
    pointsOfInterest: []
  }
];

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
