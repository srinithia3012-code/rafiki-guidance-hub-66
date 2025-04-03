import React from "react";
import { Link } from "react-router-dom";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { LogOut, User, LayoutDashboard } from "lucide-react";

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
    <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden">
      <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white shadow-xl z-40 flex flex-col overflow-y-auto">
        <div className="flex flex-col p-6 space-y-4">
          {currentUser ? (
            <div className="p-4 bg-gray-50 rounded-lg mb-2">
              <div className="flex items-center gap-3">
                <div className="bg-rafiki-100 rounded-full p-2">
                  <User className="h-5 w-5 text-rafiki-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {currentUser.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                onSignIn();
                onMenuClose();
              }}
              className="w-full py-3 rounded-md bg-rafiki-600 text-white font-medium"
            >
              Sign In
            </button>
          )}

          <nav className="flex flex-col space-y-3 mt-4">
            {currentUser && (
              <Link
                to="/dashboard"
                className="p-3 hover:bg-gray-50 rounded-md flex items-center gap-2"
                onClick={onMenuClose}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}
            <Link
              to="/"
              className="p-3 hover:bg-gray-50 rounded-md"
              onClick={onMenuClose}
            >
              Home
            </Link>
            <Link
              to="/chat"
              className="p-3 hover:bg-gray-50 rounded-md"
              onClick={onMenuClose}
            >
              Chat
            </Link>
            <Link
              to="/career"
              className="p-3 hover:bg-gray-50 rounded-md"
              onClick={onMenuClose}
            >
              Career
            </Link>
            <Link
              to="/wellbeing"
              className="p-3 hover:bg-gray-50 rounded-md"
              onClick={onMenuClose}
            >
              Wellbeing
            </Link>
          </nav>

          {currentUser && (
            <button
              onClick={() => {
                onSignOut();
                onMenuClose();
              }}
              className="flex items-center gap-2 p-3 text-red-500 hover:bg-red-50 rounded-md mt-auto"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
