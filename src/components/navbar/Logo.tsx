
import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 z-50">
      <div className="bg-gradient-to-r from-rafiki-500 to-rafiki-700 text-white rounded-lg w-8 h-8 flex items-center justify-center font-bold text-lg">
        R
      </div>
      <span className="font-display text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rafiki-700 to-rafiki-900">
        Rafiki AI
      </span>
    </Link>
  );
};

export default Logo;
