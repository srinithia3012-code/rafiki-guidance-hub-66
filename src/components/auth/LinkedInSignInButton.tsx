
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signInWithLinkedIn } from "@/services/supabase";
import { toast } from "sonner";

interface LinkedInSignInButtonProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onSuccess?: () => void;
}

const LinkedInSignInButton: React.FC<LinkedInSignInButtonProps> = ({ 
  isLoading, 
  setIsLoading, 
  onSuccess 
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
      const errorMessage = error.message === 'User rejected the login request' 
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
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <svg className="mr-2 h-4 w-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )}
      <span className="ml-1">LinkedIn</span>
    </Button>
  );
};

export default LinkedInSignInButton;
