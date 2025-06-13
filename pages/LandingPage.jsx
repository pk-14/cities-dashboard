import React from "react";
import Navbar from "../components/Navbar";
import MapChart from "../components/MapChart";

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <MapChart className="flex-grow" />
    </div>
  );
};

export default LandingPage;
