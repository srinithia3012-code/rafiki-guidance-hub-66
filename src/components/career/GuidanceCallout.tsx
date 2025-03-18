
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GuidanceCallout: React.FC = () => {
  return (
    <div className="mt-12 bg-gray-50 p-6 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="bg-purple-100 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Need personalized career guidance?</h2>
          <p className="text-gray-600 mb-4">
            Our AI assistant can provide tailored advice based on your individual career goals, interests, and skills.
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/chat">Chat with Rafiki AI</Link>
            </Button>
            <Button variant="outline">Schedule Career Counseling</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidanceCallout;
