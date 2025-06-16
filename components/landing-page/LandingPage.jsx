import React from "react";
import MapChart from "./map-chart/MapChart";
import WidgetContainer from "./city-widget/WidgetContainer";

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      <MapChart />
      <div className="absolute top-4 left-6 z-30 text-white text-lg font-semibold px-2 py-2">
        Hello User,
      </div>
      <WidgetContainer />
    </div>
  );
};

export default LandingPage;
