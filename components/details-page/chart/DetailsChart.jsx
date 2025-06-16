"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useRef, useEffect } from "react";

const DetailsChart = ({ chartData }) => {
  const [showAI, setShowAI] = useState(true);
  const [showFinal, setShowFinal] = useState(true);
  const [showConsumption, setShowConsumption] = useState(true);
  const chartContainerRef = useRef(null);
  const [dividerHeight, setDividerHeight] = useState(0);

  const historicalData = chartData?.historical || [];
  const forecastData = [
    { name: "", ai: null, final: null, previous: null },
    ...(chartData?.forecast || []),
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0b1f2a] border border-cyan-400 text-xs text-white p-2 rounded shadow-md">
          <div className="font-semibold mb-1">{label}</div>
          {payload.map((entry, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-1">
              <span
                className={
                  entry.name === "AI Forecast"
                    ? "text-sky-400"
                    : entry.name === "Final Forecast"
                    ? "text-emerald-400"
                    : entry.name === "Consumption"
                    ? "text-green-500"
                    : "text-red-400"
                }
              >
                ●
              </span>
              <span>{entry.name}:</span>
              <span className="font-mono">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (chartContainerRef.current) {
      setDividerHeight(chartContainerRef.current.offsetHeight - 30);
    }
  }, []);

  const allYValues = [
    ...historicalData.flatMap((d) => [d.ai, d.final, d.consumption]),
    ...forecastData.flatMap((d) => [d.ai, d.final, d.previous]),
  ];

  const maxY = Math.max(...allYValues, 1000);
  const yAxisDomain = [0, Math.ceil(maxY / 100) * 100];

  return (
    <div className="flex-1 pt-2 pb-2">
      <div className="bg-black p-4 h-[calc(100vh-16rem)] shadow flex flex-col">
        <div className="flex-1 relative flex" ref={chartContainerRef}>
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-end gap-2 mb-1">
              <span className="text-[#bcbcbc] text-xs font-medium tracking-wide mr-2">
                HISTORICAL
              </span>
            </div>
            <div className="flex gap-6 mb-2 items-center">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showAI}
                  onChange={() => setShowAI((v) => !v)}
                  className="sr-only peer"
                />
                <span
                  className={`w-7 h-4 flex items-center rounded-full p-0.5 duration-200 relative
                    ${
                      showAI
                        ? "bg-[#4d4c4c] border border-[#4d4c4c]"
                        : "bg-[#222] border border-[#444]"
                    }
                    `}
                >
                  <span
                    className={`h-3 w-3 rounded-full shadow-md transform duration-200
                      ${
                        showAI
                          ? "bg-white translate-x-2.5"
                          : "bg-[#ccc] translate-x-0"
                      }`}
                  />
                </span>
                <span className="w-1 h-4 bg-sky-400 rounded-sm mx-1" />
                <span className="text-[#bcbcbc] text-xs font-medium tracking-wide">
                  AI FORECAST
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showFinal}
                  onChange={() => setShowFinal((v) => !v)}
                  className="sr-only peer"
                />
                <span
                  className={`w-7 h-4 flex items-center rounded-full p-0.5 duration-200 relative
                    ${
                      showFinal
                        ? "bg-[#4d4c4c] border border-[#4d4c4c]"
                        : "bg-[#222] border border-[#444]"
                    }
                   `}
                >
                  <span
                    className={`h-3 w-3 rounded-full shadow-md transform duration-200
                      ${
                        showFinal
                          ? "bg-white translate-x-2.5"
                          : "bg-[#ccc] translate-x-0"
                      }`}
                  />
                </span>
                <span className="w-1 h-4 bg-[#f6e96b] rounded-sm mx-1" />
                <span className="text-[#bcbcbc] text-xs font-medium tracking-wide">
                  FINAL FORECAST
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showConsumption}
                  onChange={() => setShowConsumption((v) => !v)}
                  className="sr-only peer"
                />
                <span
                  className={`w-7 h-4 flex items-center rounded-full p-0.5 duration-200 relative
                    ${
                      showConsumption
                        ? "bg-[#4d4c4c] border border-[#4d4c4c]"
                        : "bg-[#222] border border-[#444]"
                    }
                   `}
                >
                  <span
                    className={`h-3 w-3 rounded-full shadow-md transform duration-200
                      ${
                        showConsumption
                          ? "bg-white translate-x-2.5"
                          : "bg-[#ccc] translate-x-0"
                      }`}
                  />
                </span>
                <span className="w-1 h-4 bg-green-500 rounded-sm mx-1" />
                <span className="text-[#bcbcbc] text-xs font-medium tracking-wide">
                  CONSUMPTION
                </span>
              </label>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={historicalData}
                margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  vertical={true}
                  horizontal={false}
                  stroke="#fff"
                  strokeDasharray="0"
                />
                <XAxis
                  dataKey="name"
                  stroke="#fff"
                  tick={{ fill: "#fff", fontSize: 12 }}
                />
                <YAxis
                  stroke="#fff"
                  tick={{ fill: "#fff", fontSize: 12 }}
                  domain={yAxisDomain}
                  label={{
                    value: "CONSUMPTION (FT, THOUSANDS)",
                    angle: -90,
                    position: "insideLeft",
                    offset: 10,
                    style: { fill: "#fff", fontSize: 10, dy: 50 },
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                {showAI && (
                  <Line
                    type="monotone"
                    dataKey="ai"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    name="AI Forecast"
                    dot={false}
                  />
                )}
                {showFinal && (
                  <Line
                    type="monotone"
                    dataKey="final"
                    stroke="#f6e96b"
                    strokeWidth={2}
                    name="Final Forecast"
                    dot={false}
                  />
                )}
                {showConsumption && (
                  <Line
                    type="monotone"
                    dataKey="consumption"
                    stroke="#22c55e"
                    strokeWidth={2}
                    name="Consumption"
                    dot={false}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              height: dividerHeight,
              width: 0,
              borderLeft: "2px dotted #bcbcbc",
              opacity: 0.7,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col">
              <div className="flex items-center justify-start gap-2 mb-1">
                <span className="text-[#bcbcbc] text-xs font-medium tracking-wide ml-2">
                  FORECAST
                </span>
              </div>
              <div className="flex gap-6 mb-2 items-center pl-2">
                <div className="flex items-center gap-2">
                  <svg width="24" height="8">
                    <line
                      x1="0"
                      y1="4"
                      x2="24"
                      y2="4"
                      stroke="#38bdf8"
                      strokeWidth="3"
                      strokeDasharray="4 4"
                    />
                  </svg>
                  <span className="text-sky-400 text-xs font-medium tracking-wide">
                    AI Forecast
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <svg width="24" height="8">
                    <line
                      x1="0"
                      y1="4"
                      x2="24"
                      y2="4"
                      stroke="#f6e96b"
                      strokeWidth="3"
                      strokeDasharray="4 4"
                    />
                  </svg>
                  <span className="text-[#f6e96b] text-xs font-medium tracking-wide">
                    Final Forecast
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="24" height="8">
                    <line
                      x1="0"
                      y1="4"
                      x2="24"
                      y2="4"
                      stroke="#22c55e"
                      strokeWidth="3"
                      strokeDasharray="2 2"
                    />
                  </svg>
                  <span className="text-green-500 text-xs font-medium tracking-wide">
                    Consumption Forecast
                  </span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={forecastData}
                margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  vertical={true}
                  horizontal={false}
                  stroke="#fff"
                  strokeDasharray="0"
                />
                <XAxis
                  dataKey="name"
                  stroke="#fff"
                  tick={{ fill: "#fff", fontSize: 12 }}
                  axisLine={true}
                  tickLine={true}
                  hide={false}
                  padding={{ right: 30 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="ai"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  name="AI Forecast"
                  dot={true}
                  strokeDasharray="4 4"
                  yAxisId={0}
                />
                <Line
                  type="monotone"
                  dataKey="final"
                  stroke="#f6e96b"
                  strokeWidth={2}
                  name="Final Forecast"
                  dot={true}
                  strokeDasharray="4 4"
                  yAxisId={0}
                />
                <Line
                  type="monotone"
                  dataKey="previous"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Consumption Forecast"
                  dot={true}
                  strokeDasharray="2 2"
                  yAxisId={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsChart;
