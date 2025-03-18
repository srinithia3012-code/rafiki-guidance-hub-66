
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { GuidanceCategory } from "@/services/ai";
import { getLatestAssessmentByType } from "@/services/assessment";

export function useAssessmentData(user: User | null, category: GuidanceCategory) {
  const [assessmentData, setAssessmentData] = useState<any>(null);

  useEffect(() => {
    const loadAssessmentData = async () => {
      if (!user) return;
      
      try {
        // Map guidance category to assessment type
        let assessmentType = "";
        if (category === "career") {
          assessmentType = "career";
        } else if (category === "mental_health" || category === "stress_management") {
          assessmentType = "wellbeing";
        } else if (category === "academic") {
          assessmentType = "academic";
        }
        
        if (assessmentType) {
          const result = await getLatestAssessmentByType(user.id, assessmentType);
          if (result) {
            console.log(`Found assessment data for ${assessmentType}:`, result);
            setAssessmentData(result);
          } else {
            console.log(`No assessment data found for ${assessmentType}`);
            setAssessmentData(null);
          }
        }
      } catch (error) {
        console.error("Error loading assessment data:", error);
      }
    };
    
    loadAssessmentData();
  }, [user, category]);

  return { assessmentData };
}
