
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { ArrowLeft, Share2 } from 'lucide-react';
import AdUnit from '../components/AdUnit';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, loading } = useBlogPosts();
  const post = posts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <div className="pt-40 text-center text-gray-400">Cargando...</div>;
  if (!post) return <div className="pt-40 text-center">Artículo no encontrado</div>;

  return (
    <div className="pt-24 md:pt-32 pb-[14px] px-[14px] min-h-screen max-w-[100vw] flex flex-col bg-background">
      <div className="relative w-full h-full rounded-3xl md:rounded-[3rem] overflow-hidden bg-white py-8 md:py-12 px-4 md:px-12 lg:px-20 shadow-2xl">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-8 md:mb-16">
            <Link to="/journal" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors group">
               <div className="p-2 rounded-full border border-gray-200 group-hover:border-primary transition-colors">
                 <ArrowLeft size={14} />
               </div>
               Volver a Editorial
            </Link>
            <button className="p-3 rounded-full hover:bg-gray-50 text-gray-400 hover:text-primary transition-colors">
                <Share2 size={18} />
            </button>
        </div>
        
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] block mb-8 border-b border-accent/30 pb-4 w-fit md:mx-0 mx-auto">
                {post.category}
            </span>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary mb-10 leading-[0.9] tracking-tight">
                {post.title}
            </h1>
            
            {/* Author & Meta */}
            <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-b border-gray-100 gap-6">
               <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                      <div className="w-full h-full bg-primary flex items-center justify-center text-white font-serif text-2xl">
                          {post.author.charAt(0)}
                      </div>
                   </div>
                   <div className="text-left">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Por {post.author}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Casa de Alba Editorial</p>
                   </div>
               </div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-4 py-2 rounded-full">{post.date}</p>
            </div>
        </div>

        {/* Cover Image */}
        <div className="mb-16 relative group">
           <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img src={post.coverImage} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"/>
           </div>
           {/* Decorative elements behind image */}
           <div className="absolute -bottom-10 -right-10 w-full h-full border border-gray-100 rounded-3xl -z-10 hidden md:block"></div>
        </div>

        {/* --- AD SPACE: Top Banner Content --- */}
        <AdUnit slot="2233445566" format="horizontal" className="mb-16" />

        {/* Content Body - Enhanced Typography for Magazine Readability */}
        <div className="
            prose prose-lg md:prose-xl max-w-none 
            
            /* Typography Base: Relaxed DM Sans */
            prose-p:font-sans prose-p:text-gray-500 prose-p:text-[1.25rem] md:prose-p:text-[1.3rem] 
            prose-p:leading-[2.4] /* Increased line-height (> 2.0) */
            prose-p:tracking-tight 
            prose-p:mb-16 /* Increased paragraph spacing */
            
            /* First Letter Drop Cap Style */
            first-letter:prose-p:font-serif first-letter:prose-p:text-5xl first-letter:prose-p:text-primary first-letter:prose-p:float-left first-letter:prose-p:mr-3 first-letter:prose-p:mt-[-10px] first-letter:prose-p:font-bold

            /* Headings: Clear Separation */
            prose-headings:font-sans prose-headings:font-bold prose-headings:text-primary prose-headings:tracking-tight prose-headings:mt-24 prose-headings:mb-12 prose-headings:text-2xl md:prose-headings:text-4xl
            
            /* Links */
            prose-a:text-accent prose-a:font-bold prose-a:tracking-tight prose-a:no-underline hover:prose-a:text-primary hover:prose-a:underline prose-a:transition-colors
            
            /* Lists */
            prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-8 prose-ul:my-20
            prose-li:font-sans prose-li:text-gray-600 prose-li:text-lg 
            prose-li:leading-[2.0] /* Increased list item line-height */
            prose-li:pl-6 prose-li:border-l-2 prose-li:border-accent/30
            
            /* Images inside content */
            prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-24 prose-img:w-full
            
            /* Blockquotes */
            prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-10 prose-blockquote:py-8 prose-blockquote:my-24 prose-blockquote:bg-gray-50 prose-blockquote:rounded-r-2xl
            prose-blockquote:font-serif prose-blockquote:text-2xl prose-blockquote:italic prose-blockquote:text-primary prose-blockquote:leading-loose
            
            /* Strong/Bold text: High Visibility */
            prose-strong:text-primary prose-strong:font-black prose-strong:tracking-tight prose-strong:text-[1.05em]
        ">
           <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        {/* --- AD SPACE: Bottom Banner Content --- */}
        <AdUnit slot="6655443322" format="horizontal" className="mt-16" />

        {/* Footer / CTA */}
        <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="bg-primary text-white p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
                
                <h3 className="font-serif text-4xl md:text-5xl mb-8 relative z-10 tracking-tight">¿Interesado en estas oportunidades?</h3>
                <p className="text-white/60 mb-12 max-w-xl mx-auto font-light leading-relaxed relative z-10 text-lg">
                    Nuestros asesores pueden brindarle un análisis detallado sobre cómo aprovechar este momento de mercado.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                    <Link to="/inversion" className="bg-white text-primary px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 shadow-lg transform hover:-translate-y-1">
                        Ver Oportunidades
                    </Link>
                    <a href={`https://wa.me/523322275000?text=${encodeURIComponent("Hola me interesa contactar a un asesor sobre las oportunidades de inversión del artículo: " + post.title)}`} target="_blank" rel="noopener noreferrer" className="border border-white/30 text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300">
                        Contactar Asesor
                    </a>
                </div>
            </div>
        </div>

      </div>
      </div>
    </div>
  );
};

export default BlogPost;
