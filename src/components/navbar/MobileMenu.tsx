
import React from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import NavLinks from "./NavLinks";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface MobileMenuProps {
  isOpen: boolean;
  currentUser: SupabaseUser | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onMenuClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  currentUser,
  onSignIn,
  onSignOut,
  onMenuClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 bg-white pt-16 pb-6 px-4 md:hidden animate-fade-in overflow-y-auto">
      <NavLinks isMobile={true} onItemClick={onMenuClose} />
      
      {!currentUser && (
        <Button
          onClick={() => {
            onSignIn();
            onMenuClose();
          }}
          className="w-full bg-rafiki-600 hover:bg-rafiki-700 text-white mt-4"
        >
          <User className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      )}
      
      {currentUser && (
        <Button
          onClick={() => {
            onSignOut();
            onMenuClose();
          }}
          variant="outline"
          className="w-full mt-4"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      )}
    </div>
  );
};

export default MobileMenu;
