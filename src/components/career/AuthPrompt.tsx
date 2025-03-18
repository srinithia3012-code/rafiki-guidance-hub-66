
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AuthPrompt: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 mt-16">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
        <p className="mb-6">Please sign in to access your career dashboard and personalized resources.</p>
        <Button asChild>
          <Link to="/signin">Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default AuthPrompt;
