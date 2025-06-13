import React from "react";
import Navbar from "../components/Navbar";
import MapChart from "../components/MapChart";
import WidgetContainer from "../components/WidgetContainer";

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      <div className="shrink-0">
        <Navbar />
      </div>
      <div className="flex-grow relative">
        <MapChart />
        <div className="absolute top-4 left-6 z-30 text-white text-lg font-semibold px-2 py-2">
          Hello User,
        </div>
        <WidgetContainer />
      </div>
    </div>
  );
};

export default LandingPage;
