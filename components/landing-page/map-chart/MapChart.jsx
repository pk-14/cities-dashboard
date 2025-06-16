"use client";

import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { feature } from "topojson-client";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import cityData from "../../../mock-data/cityData.json";
import topoJson from "../../../mock-data/countriesData.json";

const MapChart = () => {
  const [geoData, setGeoData] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [showCities, setShowCities] = useState(false);

  useEffect(() => {
    const loadMap = async () => {
      const countries = feature(topoJson, topoJson.objects.countries).features;
      setGeoData(countries);
    };

    loadMap();

    let currentZoom = 1;
    const maxZoom = 1.5;
    const step = 0.05;
    const interval = setInterval(() => {
      currentZoom += step;
      setZoom((prev) => {
        if (prev >= maxZoom) {
          clearInterval(interval);
          setShowCities(true);
          return maxZoom;
        }
        return currentZoom;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[100vh] bg-[#0b1f2a] overflow-hidden">
      <ComposableMap
        className="cursor-grab w-full h-full"
        projection="geoMercator"
        projectionConfig={{ scale: 150 }}
      >
        <ZoomableGroup
          zoom={zoom}
          center={[0, 20]}
          translateExtent={[
            [-1000, -500],
            [1000, 800],
          ]}
        >
          {geoData && (
            <Geographies geography={{ features: geoData }}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#3b6e75"
                    stroke="#1a2e35"
                    strokeWidth={0.25}
                    className="outline-none hover:outline-none focus:outline-none active:outline-none"
                  />
                ))
              }
            </Geographies>
          )}

          {showCities &&
            cityData.map((city) => (
              <Marker key={city.id} coordinates={city.coords}>
                <circle
                  r={6 / zoom}
                  fill="#f87171"
                  stroke="#ffffff"
                  strokeWidth={1 / zoom}
                  tabIndex={-1}
                  className="outline-none cursor-pointer"
                  data-tooltip-id="map-tooltip"
                  data-tooltip-content={`${city.name}: ${city.data.at(-1)}`}
                />
              </Marker>
            ))}
        </ZoomableGroup>
      </ComposableMap>

      <Tooltip id="map-tooltip" place="top" className="z-50 text-sm" />

      <div className="absolute bottom-20 right-4 flex gap-2 z-20">
        <button
          onClick={() => setZoom((prev) => Math.min(prev + 0.5, 4))}
          className="bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 cursor-pointer"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => setZoom((prev) => Math.max(prev - 0.5, 1))}
          className="bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 cursor-pointer"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MapChart;
