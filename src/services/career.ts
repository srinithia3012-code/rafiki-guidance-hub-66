
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type CareerProfile = {
  id: string;
  user_id: string;
  interests: string[];
  skills: string[];
  education_level: string | null;
  preferred_industries: string[];
  created_at: string;
  updated_at: string;
};

export type JobApplication = {
  id: string;
  user_id: string;
  company_name: string;
  position: string;
  application_date: string;
  status: string;
  next_steps: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

// Career Profile functions
export const getUserCareerProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('career_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error("Error fetching career profile:", error);
      return null;
    }
    
    return data as CareerProfile;
  } catch (error) {
    console.error("Error fetching career profile:", error);
    return null;
  }
};

export const createCareerProfile = async (userId: string, profileData: Partial<CareerProfile>) => {
  try {
    const { data, error } = await supabase
      .from('career_profiles')
      .insert({
        user_id: userId,
        interests: profileData.interests || [],
        skills: profileData.skills || [],
        education_level: profileData.education_level || null,
        preferred_industries: profileData.preferred_industries || [],
      })
      .select()
      .single();
      
    if (error) {
      console.error("Error creating career profile:", error);
      toast.error("Failed to create career profile");
      throw error;
    }
    
    toast.success("Career profile created successfully");
    return data as CareerProfile;
  } catch (error) {
    console.error("Error creating career profile:", error);
    throw error;
  }
};

export const updateCareerProfile = async (profileId: string, updates: Partial<CareerProfile>) => {
  try {
    const { data, error } = await supabase
      .from('career_profiles')
      .update(updates)
      .eq('id', profileId)
      .select()
      .single();
      
    if (error) {
      console.error("Error updating career profile:", error);
      toast.error("Failed to update career profile");
      throw error;
    }
    
    toast.success("Career profile updated successfully");
    return data as CareerProfile;
  } catch (error) {
    console.error("Error updating career profile:", error);
    throw error;
  }
};

// Job Applications functions
export const getUserJobApplications = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('user_id', userId)
      .order('application_date', { ascending: false });
    
    if (error) {
      console.error("Error fetching job applications:", error);
      return [];
    }
    
    return data as JobApplication[];
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return [];
  }
};

export const createJobApplication = async (userId: string, applicationData: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        user_id: userId,
        ...applicationData
      })
      .select()
      .single();
      
    if (error) {
      console.error("Error creating job application:", error);
      toast.error("Failed to create job application");
      throw error;
    }
    
    toast.success("Job application saved successfully");
    return data as JobApplication;
  } catch (error) {
    console.error("Error creating job application:", error);
    throw error;
  }
};

export const updateJobApplication = async (applicationId: string, updates: Partial<JobApplication>) => {
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .update(updates)
      .eq('id', applicationId)
      .select()
      .single();
      
    if (error) {
      console.error("Error updating job application:", error);
      toast.error("Failed to update job application");
      throw error;
    }
    
    toast.success("Job application updated successfully");
    return data as JobApplication;
  } catch (error) {
    console.error("Error updating job application:", error);
    throw error;
  }
};

export const deleteJobApplication = async (applicationId: string) => {
  try {
    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', applicationId);
      
    if (error) {
      console.error("Error deleting job application:", error);
      toast.error("Failed to delete job application");
      throw error;
    }
    
    toast.success("Job application deleted successfully");
  } catch (error) {
    console.error("Error deleting job application:", error);
    throw error;
  }
};

// Job Application Status Options
export const JOB_APPLICATION_STATUSES = [
  "Application Submitted",
  "Resume Screening",
  "Assessment",
  "Interview Scheduled",
  "Interview Completed",
  "Technical Interview",
  "Final Interview",
  "Offer Received",
  "Negotiation",
  "Rejected",
  "Withdrawn",
  "Accepted",
];
