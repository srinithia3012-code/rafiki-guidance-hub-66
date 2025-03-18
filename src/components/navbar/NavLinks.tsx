
import React from "react";
import { Link } from "react-router-dom";

const NavLinks: React.FC = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chat" },
    { name: "Career", href: "/career" },
    { name: "Wellbeing", href: "/wellbeing" },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {links.map((link) => (
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
