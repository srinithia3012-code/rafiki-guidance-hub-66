
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MoodTrackingProps {
  moodRating: number | null;
  setMoodRating: (rating: number) => void;
  resources: any[];
  user: any;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({ 
  moodRating, 
  setMoodRating, 
  resources, 
  user 
}) => {
  const handleMoodSelection = (rating: number) => {
    setMoodRating(rating);
    
    if (user) {
      console.log("Would save mood rating to Supabase:", { userId: user.id, rating, timestamp: new Date() });
    }
  };

  return (
    <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
      <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => handleMoodSelection(rating)}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
              moodRating === rating 
                ? "bg-purple-600 text-white scale-110 shadow-md" 
                : "bg-white text-gray-700 hover:bg-purple-100"
            }`}
          >
            {rating === 1 && "😔"}
            {rating === 2 && "😕"}
            {rating === 3 && "😐"}
            {rating === 4 && "🙂"}
            {rating === 5 && "😄"}
          </button>
        ))}
      </div>
      {moodRating && resources.length > 0 && (
        <div className="bg-white p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-3">
            {moodRating < 3 
              ? "I'm sorry you're not feeling great today. Here are some resources that might help:" 
              : moodRating === 3 
              ? "Thanks for sharing how you're feeling. Here are some ways to boost your mood:" 
              : "Great to hear you're doing well! Here are some ways to maintain your positive mood:"}
          </p>
          <div className="flex flex-wrap gap-2">
            {resources.map((resource, index) => (
              <Button 
                key={index} 
                size="sm" 
                variant="outline"
                asChild
              >
                <Link to={resource.link}>{resource.title}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="mt-3 text-sm text-gray-500 flex justify-between items-center">
        <span>Your mood data is private and only used to provide personalized support.</span>
        {user && (
          <Button variant="link" size="sm" className="text-purple-600">View Mood History</Button>
        )}
      </div>
    </div>
  );
};

export default MoodTracking;
