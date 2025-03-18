
import React from "react";
import { Briefcase, BookOpen, Brain, Heart, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Career Guidance",
    description: "Get AI-powered recommendations for career paths based on your interests, strengths, and academic background.",
    icon: Briefcase,
    color: "from-blue-400 to-blue-600",
    link: "/career"
  },
  {
    title: "Academic Planning",
    description: "Receive personalized study plans, course recommendations, and learning resources tailored to your goals.",
    icon: BookOpen,
    color: "from-emerald-400 to-emerald-600",
    link: "/chat?category=academic"
  },
  {
    title: "Emotional Support",
    description: "Access 24/7 AI counseling for stress, anxiety, and other emotional challenges common among students.",
    icon: Heart,
    color: "from-red-400 to-red-600",
    link: "/wellbeing"
  },
  {
    title: "Mental Wellness",
    description: "Learn evidence-based techniques for managing stress, improving focus, and maintaining mental health.",
    icon: Brain,
    color: "from-purple-400 to-purple-600",
    link: "/wellbeing"
  },
  {
    title: "Community Support",
    description: "Connect with peers facing similar challenges and share experiences in moderated group discussions.",
    icon: Users,
    color: "from-amber-400 to-amber-600",
    link: "/wellbeing?tab=community"
  },
  {
    title: "24/7 Availability",
    description: "Receive instant support whenever you need it, regardless of time zones or schedules.",
    icon: Clock,
    color: "from-teal-400 to-teal-600",
    link: "/chat"
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="features">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-rafiki-50/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-rafiki-50/40 to-transparent pointer-events-none" />
      <div className="absolute -left-32 top-1/4 w-64 h-64 bg-rafiki-100/50 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -right-32 bottom-1/4 w-64 h-64 bg-blue-100/30 rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Support for Your Academic Journey
          </h2>
          <p className="text-lg text-gray-600">
            Rafiki AI offers a suite of tools designed to support every aspect of your university experience, from academics to wellbeing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link 
              to={feature.link} 
              key={index}
              className="block transition-transform duration-300 hover:translate-y-[-8px]"
            >
              <div className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group h-full flex flex-col border border-gray-100">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-5 rounded-bl-full`} />
                
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-r ${feature.color} shadow-md mb-4`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                
                <p className="text-gray-600 text-sm flex-grow">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
