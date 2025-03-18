
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
      <Card className="overflow-hidden mb-8">
        <CardContent className="p-0">
          <div className="h-72 bg-slate-200 animate-pulse flex items-center justify-center">
            <p className="text-slate-500">Loading cosmic imagery...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!apodData) {
    return null;
  }

  // Only show video thumbnail if media type is video
  const isVideo = apodData.media_type === "video";

  return (
    <Card className="overflow-hidden mb-8 shadow-md">
      <CardContent className="p-0">
        <div className="relative">
          {isVideo ? (
            <div className="relative bg-black h-72 flex items-center justify-center">
              <p className="text-white mb-2">Today's astronomy picture is a video</p>
              <Button asChild variant="outline" className="bg-black/50 text-white border-white">
                <a href={apodData.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Watch Video <ExternalLink size={16} />
                </a>
              </Button>
            </div>
          ) : (
            <div 
              className="h-72 bg-cover bg-center" 
              style={{ backgroundImage: `url(${apodData.url})` }}
              aria-label={apodData.title}
            >
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-lg italic">{mindfulnessPrompt}</p>
              <div className="flex justify-between items-center">
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
        </div>
        
        {showDetails && (
          <div className="p-4 bg-gray-50">
            <h3 className="font-bold mb-1">{apodData.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {apodData.date} {apodData.copyright ? `© ${apodData.copyright}` : ""}
            </p>
            <p className="text-sm">{apodData.explanation}</p>
            <div className="mt-2">
              <Button asChild variant="outline" size="sm">
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
      </CardContent>
    </Card>
  );
};

export default SpaceMindfulness;
