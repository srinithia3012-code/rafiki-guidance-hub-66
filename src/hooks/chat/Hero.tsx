
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, Sparkles, ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rafiki-50/50 to-white pointer-events-none" />
      
      {/* Background blur elements */}
      <div className="absolute top-20 -left-10 w-72 h-72 bg-rafiki-200/30 rounded-full filter blur-3xl opacity-70 animate-pulse-soft" />
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-blue-200/20 rounded-full filter blur-3xl opacity-60 animate-float" />
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-rafiki-100/40 rounded-full filter blur-3xl opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start space-y-8 animate-fade-up">
            <div className="inline-flex items-center rounded-full bg-rafiki-50 px-3 py-1 text-sm font-medium text-rafiki-600 ring-1 ring-inset ring-rafiki-200">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              <span>AI-powered guidance for students</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block">Your personal AI</span>
              <span className="block text-rafiki-600">guidance counselor</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Rafiki AI combines artificial intelligence with expert guidance to help university students navigate academics, career planning, and emotional wellbeing.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-rafiki-600 hover:bg-rafiki-700 text-white shadow-md hover:shadow-lg transition-all px-6"
              >
                <Link to="/chat">
                  <MessageSquare className="h-5 w-5 mr-2" /> 
                  Chat with Rafiki
                </Link>
              </Button>
              
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-rafiki-200 text-rafiki-800 hover:bg-rafiki-50 px-6"
              >
                <Link to="/career">
                  Learn More <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 bg-rafiki-100 rounded-full filter blur-2xl opacity-70 animate-pulse-soft" />
            </div>
            
            {/* Chat UI illustration */}
            <div className="relative glass-card rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 max-w-md mx-auto transform transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
              <div className="bg-gradient-to-r from-rafiki-600 to-rafiki-700 text-white p-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">R</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Rafiki AI</p>
                    <p className="text-xs text-white/80">Online</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white">
                <div className="flex mb-4">
                  <div className="w-8 h-8 bg-rafiki-100 text-rafiki-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">R</span>
                  </div>
                  <div className="ml-3 bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-xs">
                    <p className="text-sm">
                      Hi there! I'm Rafiki, your AI guidance counselor. How can I help you today?
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end mb-4">
                  <div className="mr-3 bg-rafiki-50 p-3 rounded-lg rounded-tr-none max-w-xs">
                    <p className="text-sm">
                      I'm feeling stressed about my upcoming exams. Any advice?
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">U</span>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  <div className="w-8 h-8 bg-rafiki-100 text-rafiki-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">R</span>
                  </div>
                  <div className="ml-3 bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-xs">
                    <p className="text-sm">
                      That's completely understandable. Exam stress is common. Here are some evidence-based strategies that might help:
                    </p>
                    <ul className="text-sm list-disc ml-4 mt-2 space-y-1">
                      <li>Break your study sessions into 25-minute chunks with short breaks</li>
                      <li>Practice deep breathing exercises when feeling overwhelmed</li>
                      <li>Ensure you're getting enough sleep the week before exams</li>
                    </ul>
                  </div>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-3 pr-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-rafiki-500 focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-rafiki-500 text-white p-1.5 rounded-full">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
