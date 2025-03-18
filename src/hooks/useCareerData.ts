
import { useState, useEffect } from "react";
import { CareerProfile, JobApplication, getUserCareerProfile, getUserJobApplications } from "@/services/career";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export function useCareerData(user: User | null) {
  const [careerProfile, setCareerProfile] = useState<CareerProfile | null>(null);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchCareerData = async () => {
    if (!user) {
      setCareerProfile(null);
      setJobApplications([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsRefreshing(true);
      
      // Fetch career profile
      const profile = await getUserCareerProfile(user.id);
      setCareerProfile(profile);
      
      // Fetch job applications
      const applications = await getUserJobApplications(user.id);
      setJobApplications(applications);
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
      
    const jobApplicationsChannel = supabase
      .channel('job-applications-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'job_applications',
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
      supabase.removeChannel(jobApplicationsChannel);
    };
  }, [user]);

  return {
    careerProfile,
    jobApplications,
    isLoading,
    isRefreshing,
    refreshData: fetchCareerData,
  };
}
