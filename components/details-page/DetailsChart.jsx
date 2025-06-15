"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import mockChartData from "../../mock-data/chartData.json";

const DetailsChart = () => {
  return (
    <div className="flex-1 p-6">
      <div className="bg-[#132935] rounded-lg p-4 h-[calc(100vh-16rem)] shadow">
        <h2 className="text-md mb-4">Historical vs Forecast</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockChartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2c3e50" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip wrapperClassName="!text-xs !bg-black !rounded" />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="ai"
              stroke="#38bdf8"
              strokeWidth={2}
              name="AI Forecast"
            />
            <Line
              type="monotone"
              dataKey="final"
              stroke="#10b981"
              strokeWidth={2}
              name="Final Forecast"
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="#f87171"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Prev Quarter"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DetailsChart;
