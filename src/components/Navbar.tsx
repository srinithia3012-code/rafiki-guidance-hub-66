
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { auth } from "@/services/firebase";
import { User as FirebaseUser } from "firebase/auth";
import { toast } from "sonner";
import AuthModal from "./AuthModal";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import NavbarUserMenu from "./navbar/NavbarUserMenu";
import MobileMenu from "./navbar/MobileMenu";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

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
      await auth.signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur shadow-sm py-3" : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <NavLinks />

          {/* User Menu or Sign In Button */}
          <div className="flex items-center gap-2 md:gap-4 z-50">
            {currentUser ? (
              <NavbarUserMenu currentUser={currentUser} />
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
      <MobileMenu
        isOpen={mobileMenuOpen}
        currentUser={currentUser}
        onSignIn={() => setAuthModalOpen(true)}
        onSignOut={handleSignOut}
        onMenuClose={closeMobileMenu}
      />

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
