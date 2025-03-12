
import React from "react";
import { Helmet } from "react-helmet";
import ChatInterface from "@/components/ChatInterface";

const ChatPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Chat with Rafiki AI | Your AI Guidance Counselor</title>
      </Helmet>
      
      <h1 className="text-3xl font-semibold mb-6 text-center">Chat with Rafiki</h1>
      <p className="text-center text-gray-600 mb-8">
        Ask Rafiki about career guidance, academic advice, or wellbeing support.
      </p>
      
      <div className="max-w-4xl mx-auto">
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatPage;
