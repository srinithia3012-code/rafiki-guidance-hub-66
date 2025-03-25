
import React from "react";
import { Helmet } from "react-helmet";
import ChatInterface from "@/components/ChatInterface";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { Skeleton } from "@/components/ui/skeleton";
import AuthPrompt from "@/components/career/AuthPrompt";
import { toast } from "sonner";

const ChatPage: React.FC = () => {
  const { user, isLoading, error } = useAuthStatus();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 mt-16 md:mt-20">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-6 text-center">Chat with Rafiki</h1>
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-[70vh] w-full rounded-lg" />
        </div>
      </div>
    );
  }
  
  // Handle authentication error
  if (error) {
    toast.error("There was a problem checking your authentication status");
    return <AuthPrompt />;
  }

  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 mt-16 md:mt-20">
      <Helmet>
        <title>Chat with Rafiki AI | Your AI Guidance Counselor</title>
        <meta name="description" content="Get personalized guidance and support from Rafiki AI, your virtual guidance counselor." />
      </Helmet>
      
      <h1 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-6 text-center">Chat with Rafiki</h1>
      <p className="text-center text-gray-600 mb-4 md:mb-8 text-sm md:text-base px-2">
        Ask Rafiki about career guidance, academic advice, or wellbeing support.
      </p>
      
      <div className="max-w-4xl mx-auto">
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatPage;
