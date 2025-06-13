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
import cityData from "../config/cityData.json";
import "react-tooltip/dist/react-tooltip.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapChart = () => {
  const [geoData, setGeoData] = useState(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const loadMap = async () => {
      const res = await fetch(geoUrl);
      const topoJson = await res.json();
      const countries = feature(topoJson, topoJson.objects.countries).features;
      setGeoData(countries);
    };

    loadMap();

    const zoomTimer = setTimeout(() => setZoom(1.5), 300);
    return () => clearTimeout(zoomTimer);
  }, []);

  return (
    <div className="relative w-full h-[100vh] bg-[#0b1f2a] overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 150 }}
        width={980}
        height={520}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup zoom={zoom} center={[0, 20]}>
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
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
          )}

          {cityData.map((city) => (
            <Marker key={city.id} coordinates={city.coords}>
              <circle
                r={6}
                fill="#f87171"
                stroke="#ffffff"
                strokeWidth={1}
                data-tooltip-id="map-tooltip"
                data-tooltip-content={`${city.name}: ${city.data.at(-1)}`}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      <Tooltip id="map-tooltip" place="top" className="z-50" />

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
        <button
          onClick={() => setZoom((prev) => Math.min(prev + 0.5, 4))}
          className="bg-white text-black p-2 rounded-full shadow hover:bg-gray-200"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => setZoom((prev) => Math.max(prev - 0.5, 1))}
          className="bg-white text-black p-2 rounded-full shadow hover:bg-gray-200"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MapChart;
