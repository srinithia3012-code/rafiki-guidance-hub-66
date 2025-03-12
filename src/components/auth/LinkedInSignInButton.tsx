
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideLoader2 } from "lucide-react";
import { signInWithLinkedIn } from "@/services/supabase";
import { toast } from "sonner";

interface LinkedInSignInButtonProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSuccess: () => void;
}

const LinkedInSignInButton: React.FC<LinkedInSignInButtonProps> = ({
  isLoading,
  setIsLoading,
  onSuccess,
}) => {
  const handleLinkedInSignIn = async () => {
    setIsLoading(true);
    
    try {
      await signInWithLinkedIn();
      // Note: onSuccess will be called via auth state change in the parent component
      // since OAuth redirects to a different URL
    } catch (error: any) {
      console.error("Sign in error:", error);
      // Display a more user-friendly error message
      const errorMessage = 
        error.message === 'User rejected the login request' 
          ? 'Sign-in canceled. Please try again.' 
          : error.message || "Failed to sign in. Please try again.";
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <Button 
      type="button" 
      variant="outline" 
      className="w-full flex items-center justify-center" 
      onClick={handleLinkedInSignIn}
      disabled={isLoading}
    >
      {isLoading ? (
        <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      )}
      <span className="ml-1">LinkedIn</span>
    </Button>
  );
};

export default LinkedInSignInButton;
