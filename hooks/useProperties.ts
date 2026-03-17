
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { fetchEasyBrokerProperties } from '../services/easybroker';
import { Property } from '../types';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'supabase' | 'easybroker' | 'mixed'>('easybroker');

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      let localData: Property[] = [];
      let currentSource: 'supabase' | 'easybroker' | 'mixed' = 'easybroker';

      try {
        // 1. Try fetching from Supabase if configured
        if (supabase) {
          const { data, error } = await supabase
            .from('properties')
            .select('*');

          if (!error && data && data.length > 0) {
            localData = data as Property[];
            currentSource = 'supabase';
          }
        }
      } catch (err) {
        console.warn("Error conectando con Supabase:", err);
      }

      try {
        // 2. Fetch from EasyBroker
        const externalData = await fetchEasyBrokerProperties({ limit: '50' });
        if (externalData.length > 0) {
          setProperties([...localData, ...externalData]);
          setSource(localData.length > 0 ? 'mixed' : 'easybroker');
        } else {
          setProperties(localData);
          setSource(currentSource);
        }
      } catch (err) {
        console.warn("Error fetching EasyBroker properties:", err);
        setProperties(localData);
        setSource(currentSource);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, source };
};
