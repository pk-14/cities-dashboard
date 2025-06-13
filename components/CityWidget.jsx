"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const CityWidget = ({ city }) => {
  const router = useRouter();

  const chartData = city.data.map((value, index) => ({ x: index, value }));
  const forecast = city.forecast || Math.floor(Math.random() * 100) + 1;
  const trendUp = chartData.at(-1).value >= chartData[0].value;

  return (
    <>
      <style>
        {`
          #city-widget::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            padding: 1px;
            background: linear-gradient(180deg, #4a00e0, #00ff87);
            -webkit-mask: 
              linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            height: 4px;
            width: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: #00ff87;
            border-radius: 8px;
          }

          ::-webkit-scrollbar-track {
            background: transparent;
          }

          /* Firefox */
          * {
            scrollbar-width: thin;
            scrollbar-color: #00ff87 transparent;
          }
        `}
      </style>
      <div
        id="city-widget"
        onClick={() => router.push(`/details/${city.id}`)}
        className="relative min-w-[180px] max-w-[180px] min-h-[192px] max-h-[192px] m-2 cursor-pointer backdrop-blur-xs bg-white/5 rounded-lg flex flex-col justify-between transition-all px-4 py-3"
      >
        <div className="text-sm font-semibold text-white mb-1 mt-2">
          {city.name}
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-300">Forecast</div>
          <div className="flex gap-4 items-center">
            <div className="text-base font-bold text-white">
              {Math.floor(chartData.at(-1).value)}M
            </div>
            <ResponsiveContainer width="100%" height={30}>
              <LineChart
                data={chartData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <span
              className={`text-sm ${
                trendUp ? "text-green-400" : "text-red-400"
              }`}
            >
              {trendUp ? "↑" : "↓"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="text-xs text-gray-300">Forecast</div>
          <div className="flex gap-4 items-center">
            <div className="text-base font-bold text-white">{forecast}%</div>
            <ResponsiveContainer width="100%" height={30}>
              <LineChart
                data={chartData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <span
              className={`text-sm ${
                forecast >= 50 ? "text-green-400" : "text-red-400"
              }`}
            >
              {forecast >= 50 ? "↑" : "↓"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CityWidget;
