import React from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RocketIcon, BookOpen, Brain, MessageSquare, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <Features />
        
        {/* How It Works Section */}
        <section className="py-24 bg-rafiki-50/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rafiki-100/40 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center rounded-full bg-rafiki-100 px-3 py-1 text-sm font-medium text-rafiki-800 mb-4">
                <RocketIcon className="h-3.5 w-3.5 mr-1.5" />
                <span>Simple process</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How Rafiki AI Works For You
              </h2>
              <p className="text-lg text-gray-600">
                Our AI-powered platform makes it easy to get the guidance you need, exactly when you need it.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-rafiki-100 rounded-full flex items-center justify-center text-rafiki-800 font-bold text-xl z-10">
                  1
                </div>
                <div className="bg-white rounded-xl p-6 pt-8 shadow-md h-full relative z-0 border border-gray-100">
                  <BookOpen className="h-8 w-8 text-rafiki-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Choose Your Focus Area</h3>
                  <p className="text-gray-600">
                    Select the type of guidance you need—academic planning, career advice, emotional support, or general guidance.
                  </p>
                </div>
              </div>
              
              <div className="relative mt-8 md:mt-12">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-rafiki-100 rounded-full flex items-center justify-center text-rafiki-800 font-bold text-xl z-10">
                  2
                </div>
                <div className="bg-white rounded-xl p-6 pt-8 shadow-md h-full relative z-0 border border-gray-100">
                  <MessageSquare className="h-8 w-8 text-rafiki-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Chat with Rafiki AI</h3>
                  <p className="text-gray-600">
                    Engage in a natural conversation with our AI assistant that understands your unique needs and situation.
                  </p>
                </div>
              </div>
              
              <div className="relative mt-8 md:mt-24">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-rafiki-100 rounded-full flex items-center justify-center text-rafiki-800 font-bold text-xl z-10">
                  3
                </div>
                <div className="bg-white rounded-xl p-6 pt-8 shadow-md h-full relative z-0 border border-gray-100">
                  <Brain className="h-8 w-8 text-rafiki-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Get Personalized Guidance</h3>
                  <p className="text-gray-600">
                    Receive tailored advice, resources, and action plans based on evidence-based practices and your specific goals.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Button 
                asChild
                size="lg" 
                className="bg-rafiki-600 hover:bg-rafiki-700 text-white shadow-md hover:shadow-lg transition-all px-8"
              >
                <Link to="/chat">
                  Start Your Journey
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 mb-4">
                  <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                  <span>Benefits of Rafiki AI</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Students Trust Rafiki AI
                </h2>
                
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">24/7 Accessibility</h3>
                      <p className="text-gray-600 mt-1">Get guidance anytime, anywhere—no appointments or wait times.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Personalized Support</h3>
                      <p className="text-gray-600 mt-1">Advice tailored to your unique situation, goals, and challenges.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Evidence-Based Guidance</h3>
                      <p className="text-gray-600 mt-1">Recommendations grounded in research and best practices.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Complete Privacy</h3>
                      <p className="text-gray-600 mt-1">Confidential conversations with no judgment or bias.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-2xl overflow-hidden shadow-xl relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-rafiki-600/20 to-rafiki-900/20 group-hover:opacity-75 transition-opacity duration-300" />
                
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" 
                  alt="Students collaborating" 
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    asChild
                    className="bg-white text-rafiki-800 hover:bg-white/90"
                    size="lg"
                  >
                    <Link to="/career">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-rafiki-600 to-rafiki-800 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your University Experience?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Join thousands of students who are using Rafiki AI to navigate their academic journey with confidence.
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-white text-rafiki-800 hover:bg-white/90 px-8"
            >
              <Link to="/chat">
                Get Started Free
              </Link>
            </Button>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-white rounded-lg w-8 h-8 flex items-center justify-center font-bold text-lg text-rafiki-600">
                    R
                  </div>
                  <span className="text-xl font-semibold">Rafiki AI</span>
                </div>
                <p className="text-gray-400 mb-4 max-w-md">
                  Empowering university students with AI-driven guidance for academic, career, and personal success.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Features</h3>
                <ul className="space-y-2">
                  <li><Link to="/career" className="text-gray-400 hover:text-white transition-colors">Career Guidance</Link></li>
                  <li><Link to="/chat" className="text-gray-400 hover:text-white transition-colors">AI Chat</Link></li>
                  <li><Link to="/wellbeing" className="text-gray-400 hover:text-white transition-colors">Mental Wellbeing</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Rafiki AI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
