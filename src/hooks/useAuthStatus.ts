
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

export function useAuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        // Set up auth state listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            console.log("Auth state changed:", session?.user?.email);
            setUser(session?.user || null);
            setIsLoading(false);
          }
        );
        
        // THEN check for existing session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setUser(data.session?.user || null);
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (err: any) {
        console.error("Auth check error:", err);
        setError(err);
        toast.error("There was a problem checking your login status");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
  }, []);

  return { user, isLoading, error };
}
