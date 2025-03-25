
import React from "react";
import { Link } from "react-router-dom";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { signOut } from "@/services/supabase";
import { toast } from "sonner";

interface NavLinksProps {
  currentUser: SupabaseUser | null;
}

const NavLinks: React.FC<NavLinksProps> = ({ currentUser }) => {
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  const links = [
    { name: "Home", href: "/", showWhenLoggedIn: false },
    { name: "Dashboard", href: "/dashboard", showWhenLoggedIn: true },
    { name: "Chat", href: "/chat", showWhenLoggedIn: true, showAlways: true },
    { name: "Career", href: "/career", showWhenLoggedIn: true, showAlways: true },
    { name: "Wellbeing", href: "/wellbeing", showWhenLoggedIn: true, showAlways: true },
  ];

  const visibleLinks = links.filter(link => {
    if (currentUser && link.name === "Home") return false;
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

      {currentUser ? (
        <Button 
          variant="outline" 
          onClick={handleSignOut}
          className="ml-4"
        >
          Sign Out
        </Button>
      ) : (
        <Button 
          asChild 
          className="ml-4 bg-rafiki-600 hover:bg-rafiki-700"
        >
          <Link to="/dashboard">Sign In</Link>
        </Button>
      )}
    </nav>
  );
};

export default NavLinks;
