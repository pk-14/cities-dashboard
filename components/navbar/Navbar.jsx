import React from "react";
import { Menu, Globe, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-black text-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6" />
        <h1 className="text-xl font-bold">Inventory Dashboard</h1>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <Globe className="w-5 h-5" />
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <span>User</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
