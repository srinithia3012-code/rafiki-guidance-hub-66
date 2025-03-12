
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { User as FirebaseUser } from "firebase/auth";
import { signOut } from "@/services/firebase";
import { toast } from "sonner";

interface NavbarUserMenuProps {
  currentUser: FirebaseUser;
}

const NavbarUserMenu: React.FC<NavbarUserMenuProps> = ({ currentUser }) => {
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full h-9 w-9 p-0">
          <Avatar className="h-9 w-9">
            <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.displayName || "User"} />
            <AvatarFallback className="bg-rafiki-100 text-rafiki-700">
              {currentUser.displayName
                ? currentUser.displayName.charAt(0).toUpperCase()
                : currentUser.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm">{currentUser.displayName || "User"}</p>
            <p className="text-xs text-muted-foreground">{currentUser.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserMenu;
