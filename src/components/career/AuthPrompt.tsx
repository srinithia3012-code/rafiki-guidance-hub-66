
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AuthPrompt: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 mt-16">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
        <p className="mb-6">Please sign in to access this feature and personalized resources.</p>
        <Button asChild className="bg-rafiki-600 hover:bg-rafiki-700">
          <Link to="/dashboard">Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default AuthPrompt;
