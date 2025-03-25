
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import { signOut } from "@/services/supabase";
import { toast } from "sonner";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

interface NavbarUserMenuProps {
  currentUser: SupabaseUser;
}

const NavbarUserMenu: React.FC<NavbarUserMenuProps> = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    } finally {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline-block">
          {currentUser.email?.split('@')[0] || 'User'}
        </span>
      </Button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <Link
              to="/dashboard"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarUserMenu;
