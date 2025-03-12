
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, User, LogOut, LayoutDashboard, MessageSquare, Briefcase, Heart } from "lucide-react";
import AuthModal from "./AuthModal";
import { auth, getCurrentUser, signOut } from "@/services/firebase";
import { User as FirebaseUser } from "firebase/auth";
import { toast } from "sonner";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
    { name: "Chat", path: "/chat", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
    { name: "Career", path: "/career", icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { name: "Wellbeing", path: "/wellbeing", icon: <Heart className="h-4 w-4 mr-2" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur shadow-sm py-3" : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 z-50">
            <div className="bg-gradient-to-r from-rafiki-500 to-rafiki-700 text-white rounded-lg w-8 h-8 flex items-center justify-center font-bold text-lg">
              R
            </div>
            <span className="font-display text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rafiki-700 to-rafiki-900">
              Rafiki AI
            </span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* User Menu or Sign In Button - Updated for better positioning */}
          <div className="flex items-center gap-2 md:gap-4 z-50">
            {currentUser ? (
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
            ) : (
              <Button
                onClick={() => setAuthModalOpen(true)}
                className="bg-rafiki-600 hover:bg-rafiki-700 text-white text-sm px-3 py-1 h-9"
                size="sm"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-16 pb-6 px-4 md:hidden animate-fade-in overflow-y-auto">
          <nav className="flex flex-col space-y-4 mt-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMobileMenu}
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
            
            {!currentUser && (
              <Button
                onClick={() => {
                  setAuthModalOpen(true);
                  closeMobileMenu();
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
                  handleSignOut();
                  closeMobileMenu();
                }}
                variant="outline"
                className="w-full mt-4"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            )}
          </nav>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
