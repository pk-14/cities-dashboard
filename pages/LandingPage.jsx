import React from "react";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h2 className="text-lg font-semibold">Landing Page</h2>
        {/* Map and City Widgets will go here */}
      </div>
    </div>
  );
};

export default LandingPage;
