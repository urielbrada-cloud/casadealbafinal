
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getProperties } from '../data/mockData';
import { fetchEasyBrokerProperties } from '../services/easybroker';
import { Property } from '../types';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'supabase' | 'mock' | 'mixed'>('mock');

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      let localData: Property[] = [];
      let currentSource: 'supabase' | 'mock' | 'mixed' = 'mock';

      try {
        // 1. Try fetching from Supabase if configured
        if (supabase) {
          const { data, error } = await supabase
            .from('properties')
            .select('*');

          if (!error && data && data.length > 0) {
            console.log("Conectado a Supabase: Datos cargados correctamente.");
            localData = data as Property[];
            currentSource = 'supabase';
          } else {
            localData = getProperties();
          }
        } else {
          localData = getProperties();
        }
      } catch (err) {
        console.warn("Error conectando con Supabase, usando datos de respaldo:", err);
        localData = getProperties();
      }

      try {
        // 2. Fetch from EasyBroker
        const externalData = await fetchEasyBrokerProperties({ limit: '10' });
        if (externalData.length > 0) {
          setProperties([...localData, ...externalData]);
          setSource('mixed');
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
