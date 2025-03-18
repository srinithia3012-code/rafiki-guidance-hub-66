
import React from "react";
import { MessageSquare, Brain, Heart } from "lucide-react";
import QuickAccessCard from "./QuickAccessCard";

const QuickAccessSection = () => {
  const quickAccessItems = [
    {
      icon: MessageSquare,
      iconColor: "text-blue-500",
      title: "AI Chat",
      description: "Get instant answers to your questions",
      content: "Chat with Rafiki AI for personalized advice, academic guidance, and emotional support.",
      linkTo: "/chat",
      linkText: "Start Chatting"
    },
    {
      icon: Brain,
      iconColor: "text-purple-500",
      title: "Career Guidance",
      description: "Explore career paths tailored to you",
      content: "Discover career opportunities, get course recommendations, and connect with mentors.",
      linkTo: "/career",
      linkText: "Explore Careers"
    },
    {
      icon: Heart,
      iconColor: "text-red-500",
      title: "Wellbeing Support",
      description: "Resources for your mental health",
      content: "Access stress management tools, mood tracking, and professional mental health resources.",
      linkTo: "/wellbeing",
      linkText: "Support Me"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {quickAccessItems.map((item, index) => (
        <QuickAccessCard
          key={index}
          icon={item.icon}
          iconColor={item.iconColor}
          title={item.title}
          description={item.description}
          content={item.content}
          linkTo={item.linkTo}
          linkText={item.linkText}
        />
      ))}
    </div>
  );
};

export default QuickAccessSection;
