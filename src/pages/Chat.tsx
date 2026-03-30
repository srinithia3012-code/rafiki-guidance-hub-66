
import React from "react";
import { Helmet } from "react-helmet";
import ChatInterface from "@/components/ChatInterface";

const ChatPage: React.FC = () => {
  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 mt-16 md:mt-20">
      <Helmet>
        <title>Chat with Rafiki AI | Your AI Guidance Counselor</title>
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