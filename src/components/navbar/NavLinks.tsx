
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, MessageSquare, Briefcase, Heart } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface NavLinksProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isMobile = false, onItemClick }) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { name: "Home", path: "/", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
    { name: "Chat", path: "/chat", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { name: "Career", path: "/career", icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { name: "Wellbeing", path: "/wellbeing", icon: <Heart className="h-4 w-4 mr-2" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-4 mt-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={onItemClick}
            className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all ${
              isActive(item.path)
                ? "text-rafiki-700 bg-rafiki-50"
                : "text-gray-700 hover:text-rafiki-600 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
            isActive(item.path)
              ? "text-rafiki-700 bg-rafiki-50"
              : "text-gray-700 hover:text-rafiki-600 hover:bg-gray-100"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
