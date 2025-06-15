"use client";

import React from "react";
import widgetConfig from "../../configurations/widgetConfig.json";
import cityData from "../../mock-data/cityData.json";
import CityWidget from "./CityWidget";

const WidgetContainer = () => {
  const { alignment, cities } = widgetConfig;
  const filteredCities = cityData.filter((c) => cities.includes(c.name));

  const isHorizontal = alignment === "top" || alignment === "bottom";

  const containerClass = isHorizontal
    ? "flex overflow-x-auto scrollbar-hide"
    : "flex flex-col overflow-y-auto scrollbar-hide";

  const positionClass = {
    top: "top-10 left-0 right-0 px-4 py-2",
    bottom: "bottom-30 left-0 right-0 px-4 py-2",
    left: "top-10 bottom-0 left-0 px-2 py-4",
    right: "top-0 bottom-0 right-20 px-2 py-4",
  }[alignment];

  return (
    <div className={`absolute z-30 ${positionClass} max-h-full max-w-full`}>
      <div className={`${containerClass}  p-2 max-h-full max-w-full`}>
        {filteredCities.map((city) => (
          <CityWidget key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
};

export default WidgetContainer;
