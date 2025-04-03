import React from "react";
import { Link } from "react-router-dom";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface NavLinksProps {
  currentUser: SupabaseUser | null;
}

const NavLinks: React.FC<NavLinksProps> = ({ currentUser }) => {
  const links = [
    { name: "Home", href: "/", showWhenLoggedIn: false },
    { name: "Dashboard", href: "/dashboard", showWhenLoggedIn: true },
    { name: "Chat", href: "/chat", showWhenLoggedIn: true, showAlways: true },
    { name: "Career", href: "/career", showWhenLoggedIn: true, showAlways: true },
    { name: "Wellbeing", href: "/wellbeing", showWhenLoggedIn: true, showAlways: true },
  ];

  const visibleLinks = links.filter(link => {
    if (link.showAlways) return true;
    return currentUser ? link.showWhenLoggedIn : !link.showWhenLoggedIn;
  });

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {visibleLinks.map((link) => (
        <Link
          key={link.name}
          to={link.href}
          className="text-gray-700 hover:text-rafiki-600 font-medium transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
