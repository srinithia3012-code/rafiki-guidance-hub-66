
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useAuthStatus() {
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setIsCheckingAuth(true);
      try {
        const { data } = await supabase.auth.getSession();
        console.log("Auth session:", data.session);
        setUser(data.session?.user || null);
        
        // Subscribe to auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            console.log("Auth state changed:", session?.user?.email);
            setUser(session?.user || null);
          }
        );
        
        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error checking auth:", error);
        toast.error("Error checking authentication status");
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkUser();
  }, []);

  return { user, isCheckingAuth };
}
