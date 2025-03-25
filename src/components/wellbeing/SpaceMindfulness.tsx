
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getNasaApod, getRandomSpacePrompt, NasaApodResponse } from "@/services/nasa";
import { ExternalLink, RefreshCw, Info } from "lucide-react";

const SpaceMindfulness: React.FC = () => {
  const [apodData, setApodData] = useState<NasaApodResponse | null>(null);
  const [mindfulnessPrompt, setMindfulnessPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const fetchApodData = async () => {
    setIsLoading(true);
    const data = await getNasaApod();
    setApodData(data);
    setMindfulnessPrompt(getRandomSpacePrompt());
    setIsLoading(false);
  };

  const refreshPrompt = () => {
    setMindfulnessPrompt(getRandomSpacePrompt());
  };

  useEffect(() => {
    fetchApodData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[50vh] md:h-[60vh] bg-slate-200 animate-pulse flex items-center justify-center rounded-xl mb-8">
        <p className="text-slate-500">Loading cosmic imagery...</p>
      </div>
    );
  }

  if (!apodData) {
    return null;
  }

  const isVideo = apodData.media_type === "video";

  return (
    <div className="relative h-[50vh] md:h-[60vh] rounded-xl overflow-hidden mb-8 shadow-xl">
      {isVideo ? (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center">
          <p className="text-white mb-4">Today's astronomy picture is a video</p>
          <Button asChild variant="outline" className="bg-black/50 text-white border-white">
            <a href={apodData.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Watch Video <ExternalLink size={16} />
            </a>
          </Button>
        </div>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${apodData.url})` }}
          aria-label={apodData.title}
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
        <div className="glass-panel p-5 rounded-lg backdrop-blur-md bg-black/40 text-white max-w-2xl mx-auto w-full">
          <p className="font-medium text-xl italic mb-4 text-center">{mindfulnessPrompt}</p>
          <div className="flex flex-wrap justify-between gap-2">
            <Button 
              onClick={refreshPrompt} 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
            >
              <RefreshCw size={16} className="mr-2" /> New prompt
            </Button>
            <Button 
              onClick={() => setShowDetails(!showDetails)} 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Info size={16} className="mr-2" /> 
              {showDetails ? "Hide details" : "Image details"}
            </Button>
          </div>
        </div>
      </div>
      
      {showDetails && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md p-4 text-white transform transition-transform duration-300 ease-in-out">
          <h3 className="font-bold mb-1">{apodData.title}</h3>
          <p className="text-sm text-gray-300 mb-2">
            {apodData.date} {apodData.copyright ? `© ${apodData.copyright}` : ""}
          </p>
          <p className="text-sm max-h-24 overflow-y-auto">{apodData.explanation}</p>
          <div className="mt-2">
            <Button asChild variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/20">
              <a 
                href={isVideo ? apodData.url : apodData.hdurl || apodData.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                View {isVideo ? "Video" : "Full Resolution"} <ExternalLink size={14} />
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceMindfulness;
