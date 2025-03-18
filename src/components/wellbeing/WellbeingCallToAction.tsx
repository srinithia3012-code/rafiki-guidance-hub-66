
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WellbeingCallToAction: React.FC = () => {
  return (
    <div className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-lg text-white shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Need personalized wellbeing guidance?</h2>
          <p className="text-white/80 mb-4">
            Our AI assistant can provide tailored advice for your specific mental health and wellbeing concerns.
          </p>
          <div className="flex gap-3">
            <Button asChild className="bg-white text-purple-700 hover:bg-white/90">
              <Link to="/chat">Chat with Rafiki AI</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20">
              <Link to="/wellbeing#resources">Find Support Resources</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellbeingCallToAction;
