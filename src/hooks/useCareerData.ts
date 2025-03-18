
import { useState, useEffect } from "react";
import { CareerProfile, getUserCareerProfile } from "@/services/career";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export function useCareerData(user: User | null) {
  const [careerProfile, setCareerProfile] = useState<CareerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchCareerData = async () => {
    if (!user) {
      setCareerProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsRefreshing(true);
      
      // Fetch career profile
      const profile = await getUserCareerProfile(user.id);
      setCareerProfile(profile);
    } catch (error) {
      console.error("Error fetching career data:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Setup real-time subscription
  useEffect(() => {
    if (!user) return;
    
    fetchCareerData();
    
    // Subscribe to real-time changes
    const careerProfileChannel = supabase
      .channel('career-profile-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'career_profiles',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchCareerData();
        }
      )
      .subscribe();
    
    // Cleanup
    return () => {
      supabase.removeChannel(careerProfileChannel);
    };
  }, [user]);

  return {
    careerProfile,
    isLoading,
    isRefreshing,
    refreshData: fetchCareerData,
  };
}
