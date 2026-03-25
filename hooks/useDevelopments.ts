import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { mapDevelopment } from '../lib/mappers';
import { Development } from '../types';
import { DEVELOPMENTS } from '../data/mockData';

export const useDevelopments = () => {
  const [developments, setDevelopments] = useState<Development[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopments = async () => {
      setLoading(true);

      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('developments')
            .select('*')
            .order('created_at', { ascending: false });

          if (!error && data && data.length > 0) {
            setDevelopments(data.map(mapDevelopment));
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Error fetching developments from Supabase:', err);
      }

      // Fallback to mockData
      setDevelopments(DEVELOPMENTS);
      setLoading(false);
    };

    fetchDevelopments();
  }, []);

  return { developments, loading };
};
