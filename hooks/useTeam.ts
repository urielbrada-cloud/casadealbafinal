import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { mapTeamMember } from '../lib/mappers';
import { TeamMember } from '../types';
import { TEAM } from '../data/mockData';

export const useTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);

      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .order('sort_order', { ascending: true });

          if (!error && data && data.length > 0) {
            setTeam(data.map(mapTeamMember));
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Error fetching team from Supabase:', err);
      }

      // Fallback to mockData
      setTeam(TEAM);
      setLoading(false);
    };

    fetchTeam();
  }, []);

  return { team, loading };
};
