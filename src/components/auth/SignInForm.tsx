
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideLoader2 } from "lucide-react";
import { signInWithEmail } from "@/services/supabase";
import { toast } from "sonner";
import GoogleSignInButton from "./GoogleSignInButton";
import LinkedInSignInButton from "./LinkedInSignInButton";

interface SignInFormProps {
  onSuccess: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
      toast.success("Signed in successfully!");
      onSuccess();
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="youremail@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-rafiki-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full bg-rafiki-600 hover:bg-rafiki-700" disabled={isLoading}>
          {isLoading ? <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign In
        </Button>
      </form>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <GoogleSignInButton 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          onSuccess={onSuccess} 
        />
        
        <LinkedInSignInButton 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          onSuccess={onSuccess} 
        />
      </div>
    </>
  );
};

export default SignInForm;
