import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setIsCheckingAuth(true);
      try {
        // Get current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setUser(data.session?.user || null);
        
        // Subscribe to auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            setUser(session?.user || null);
          }
        );
        
        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (err: any) {
        console.error("Auth check error:", err);
        toast.error("There was a problem checking your login status");
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkUser();
  }, []);

  return { user, isCheckingAuth };
}

export default useAuth; 