
import React from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, User, Tag, ArrowRight, TrendingUp, Mail, Quote } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const BlogList: React.FC = () => {
  // We use the first post as the "Cover Story"
  const coverStory = BLOG_POSTS[0];
  
  // The rest of the posts
  const feedPosts = BLOG_POSTS.slice(1);

  const categories = [
    { name: "Tendencias de Mercado", count: 12 },
    { name: "Arquitectura & Diseño", count: 8 },
    { name: "Estilo de Vida", count: 5 },
    { name: "Inversión Inteligente", count: 10 },
    { name: "Destinos", count: 4 },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-[14px] px-[14px] min-h-screen max-w-[100vw] flex flex-col bg-background">
      <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden bg-white py-8 md:py-12 px-4 md:px-12 lg:px-20 shadow-2xl font-sans text-primary">
      
      {/* 1. MAGAZINE HEADER - Massive Typography */}
      <div className="max-w-[1920px] mx-auto px-2 md:px-12 mb-8 md:mb-16">
        <div className="border-b border-black pb-6 md:pb-8">
            <div className="flex flex-col items-center justify-center mb-4 md:mb-6 relative">
                {/* Decorative Issue Number */}
                <div className="absolute top-0 left-0 hidden md:block">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Vol. 24</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Winter Issue</p>
                </div>

                <h1 className="font-serif text-[15vw] md:text-[11rem] leading-[0.8] tracking-tighter text-primary uppercase text-center select-none">
                  The Journal
                </h1>

                {/* Decorative Date */}
                <div className="absolute top-0 right-0 hidden md:block text-right">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Casa de Alba</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Est. 2024</p>
                </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-black pt-2">
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-gray-500 w-1/3">
                    Market Intelligence
                </div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-gray-500 w-1/3 text-center">
                    Design
                </div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-gray-500 w-1/3 text-right">
                    Lifestyle
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* 2. COVER STORY (FEATURED) - Asymmetrical Layout */}
        {coverStory && (
            <section className="mb-16">
                <Link to={`/journal/${coverStory.slug}`} className="group block">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                        
                        {/* Image Side (Dominant) */}
                        <div className="lg:col-span-8 relative">
                            <div className="aspect-[16/9] overflow-hidden rounded-sm relative">
                                <img 
                                    src={coverStory.coverImage} 
                                    alt={coverStory.title} 
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                />
                                {/* Overlay Tag */}
                                <div className="absolute bottom-0 left-0 bg-white px-6 py-4 border-t border-r border-black">
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                        <TrendingUp size={14} className="text-accent"/> Historia de Portada
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Text Side (Minimalist) */}
                        <div className="lg:col-span-4 flex flex-col h-full pt-4 lg:pt-0 justify-between">
                             <div>
                                 <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6 block border-b border-gray-200 pb-2">
                                    {coverStory.category}
                                 </span>
                                 <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary leading-[0.95] mb-8 group-hover:text-accent transition-colors tracking-tight">
                                    {coverStory.title}
                                 </h2>
                                 <p className="text-gray-500 text-lg font-light leading-relaxed line-clamp-4 mb-8">
                                    {coverStory.excerpt}
                                 </p>
                             </div>
                             
                             <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400 border-t border-black pt-4 mt-8 lg:mt-0">
                                <div className="flex items-center gap-2">
                                    Por {coverStory.author}
                                </div>
                                <div className="group-hover:translate-x-2 transition-transform duration-300 text-primary">
                                    Leer Ahora <ArrowRight size={14} className="inline ml-1"/>
                                </div>
                             </div>
                        </div>
                    </div>
                </Link>
            </section>
        )}

        {/* --- AD SPACE: Horizontal Banner after Cover Story --- */}
        <div className="max-w-4xl mx-auto mb-16">
            <AdUnit slot="1234567890" format="horizontal" />
        </div>

        {/* 3. MAIN CONTENT GRID & SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-black pt-16">
            
            {/* LEFT COLUMN: ARTICLES FEED */}
            <div className="lg:col-span-8">
                <div className="flex items-end justify-between mb-12">
                    <h3 className="font-serif text-4xl text-primary leading-none">
                        Edición <span className="italic text-gray-400">Actual</span>
                    </h3>
                    <div className="h-[1px] bg-gray-200 flex-grow ml-8"></div>
                </div>

                <div className="grid grid-cols-1 gap-16">
                    {feedPosts.map((post, idx) => (
                        <div key={`${post.id}-${idx}`}>
                            <Link to={`/journal/${post.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-gray-100 pb-16 last:border-0">
                                
                                {/* Image (Portrait for Magazine Feel) */}
                                <div className={`relative overflow-hidden aspect-[3/4] md:aspect-[4/3] ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                                    <img 
                                        src={post.coverImage} 
                                        alt={post.title} 
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                
                                {/* Content */}
                                <div className={`flex flex-col h-full justify-center ${idx % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                                    <div className={`flex items-center gap-3 mb-4 ${idx % 2 === 1 ? 'justify-end' : ''}`}>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black px-2 py-1">
                                            {post.category}
                                        </span>
                                        <span className="text-[10px] font-bold text-gray-400">{post.date}</span>
                                    </div>
                                    
                                    <h4 className="font-serif text-3xl md:text-4xl text-primary leading-none mb-4 group-hover:underline decoration-1 underline-offset-4 decoration-accent tracking-tight">
                                        {post.title}
                                    </h4>
                                    
                                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6 font-light">
                                        {post.excerpt}
                                    </p>
                                    
                                    <div className={`mt-auto ${idx % 2 === 1 ? 'flex justify-end' : ''}`}>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary border-b border-primary pb-1 group-hover:border-accent group-hover:text-accent transition-colors">
                                            Leer Artículo Completo
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            
                            {/* Insert In-Feed Ad after the 2nd item */}
                            {idx === 1 && (
                                <AdUnit slot="0987654321" format="fluid" layout="in-article" className="my-16" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Pagination / Load More */}
                <div className="mt-20 border-t border-black pt-8 flex justify-center">
                    <button className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2">
                        Ver Archivo <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            {/* RIGHT COLUMN: STICKY SIDEBAR */}
            <div className="lg:col-span-4 relative">
                <div className="sticky top-32 space-y-16">
                    
                    {/* Editor's Note Quote */}
                    <div className="relative p-8 border border-gray-200 bg-gray-50">
                        <Quote size={48} className="text-gray-200 absolute top-4 left-4" />
                        <p className="font-serif italic text-xl text-primary mb-6 relative z-10 text-center leading-relaxed">
                            "El verdadero lujo no es solo la propiedad que habitas, sino la vida que construyes dentro de ella."
                        </p>
                        <div className="text-center border-t border-gray-200 pt-4">
                            <p className="text-xs font-bold uppercase tracking-widest text-primary">Alejandra Alba</p>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400">Editora en Jefe</p>
                        </div>
                    </div>

                    {/* --- AD SPACE: Sidebar MPU (Square) --- */}
                    <AdUnit slot="5566778899" format="rectangle" />

                    {/* Trending Mini-List */}
                    <div>
                        <div className="flex items-center justify-between mb-6 pb-2 border-b border-black">
                            <h4 className="font-bold text-xs uppercase tracking-widest">Lo Más Leído</h4>
                            <TrendingUp size={16} className="text-primary" />
                        </div>
                        <div className="space-y-6">
                            {BLOG_POSTS.slice(0, 3).map((post, idx) => (
                                 <Link to={`/journal/${post.slug}`} key={`trend-${idx}`} className="flex gap-4 group cursor-pointer items-baseline">
                                    <span className="text-4xl font-serif text-gray-200 group-hover:text-accent transition-colors leading-none">0{idx + 1}</span>
                                    <div>
                                        <h5 className="font-serif text-lg leading-tight text-primary mb-1 group-hover:underline decoration-1">{post.title}</h5>
                                    </div>
                                 </Link>
                            ))}
                        </div>
                    </div>

                    {/* Explore Topics */}
                    <div>
                        <div className="flex items-center justify-between mb-6 pb-2 border-b border-black">
                            <h4 className="font-bold text-xs uppercase tracking-widest">Explorar</h4>
                        </div>
                        <ul className="space-y-3">
                            {categories.map((cat, idx) => (
                                <li key={idx} className="flex justify-between items-center group cursor-pointer">
                                    <span className="text-sm font-serif text-gray-600 group-hover:text-primary transition-colors italic">{cat.name}</span>
                                    <span className="text-[10px] text-gray-400 font-bold">({cat.count})</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Box - Luxury Invite Style */}
                    <div className="bg-[#000827] text-white p-8 text-center relative overflow-hidden border border-gray-800">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-[60px] pointer-events-none"></div>
                        
                        <Mail size={24} className="mx-auto mb-4 text-accent" />
                        <h4 className="font-serif text-2xl mb-2">The Weekly Brief</h4>
                        <p className="text-white/60 text-xs mb-6 font-light leading-relaxed px-4">
                            Inteligencia de mercado y arquitectura curada directamente a su bandeja de entrada cada lunes.
                        </p>
                        <div className="space-y-4 relative z-10">
                            <button 
                                onClick={() => {
                                    const message = `Hola me interesa suscribirme al newsletter The Weekly Brief`;
                                    window.open(`https://wa.me/523322275000?text=${encodeURIComponent(message)}`, '_blank');
                                }}
                                className="w-full bg-white text-primary text-[10px] font-bold uppercase tracking-[0.2em] py-3 hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2"
                            >
                                <Mail size={14} /> Suscribirse por WhatsApp
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BlogList;
