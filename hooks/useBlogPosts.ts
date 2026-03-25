import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { mapBlogPost } from '../lib/mappers';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/mockData';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published')
            .order('created_at', { ascending: false });

          if (!error && data && data.length > 0) {
            setPosts(data.map(mapBlogPost));
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Error fetching blog posts from Supabase:', err);
      }

      // Fallback to mockData
      setPosts(BLOG_POSTS);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return { posts, loading };
};
