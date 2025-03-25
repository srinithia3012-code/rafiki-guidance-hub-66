
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
    <div className="mb-8 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/10 text-white">
      <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
      <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => handleMoodSelection(rating)}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
              moodRating === rating 
                ? "bg-white text-purple-900 scale-110 shadow-md" 
                : "bg-purple-800/50 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
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
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/10">
          <p className="text-sm text-white/90 mb-3">
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
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                asChild
              >
                <Link to={resource.link}>{resource.title}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="mt-3 text-sm text-white/70 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <span>Your mood data is private and only used to provide personalized support.</span>
        {user && (
          <Button variant="link" size="sm" className="text-purple-200 p-0 h-auto">View Mood History</Button>
        )}
      </div>
    </div>
  );
};

export default MoodTracking;
