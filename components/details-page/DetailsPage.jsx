"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DetailsChart from "./DetailsChart";
import SideBar from "./SideBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DetailsHeader from "./DetailsHeader";
import DetailsFooter from "./DetailsFooter";
import cityStackedData from "../../mock-data/cityData.json";

const DetailsPage = () => {
  const { cityId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedChartData, setSelectedChartData] = useState(null);
  const [selectedStack, setSelectedStack] = useState(null);
  const [cityStacks, setCityStacks] = useState([]);

  useEffect(() => {
    let cityData;
    cityStackedData.map((city) => {
      if (city.id === cityId) {
        cityData = city;
      }
    });
    if (cityData?.stacks?.length > 0) {
      const firstStack = cityData.stacks[0];
      setCityStacks(cityData.stacks);
      setSelectedChartData(firstStack.chartData);
      setSelectedStack(firstStack);
    }
  }, [cityId]);

  const handleItemSelect = (chartData, stack) => {
    setSelectedChartData(chartData);
    setSelectedStack(stack);
  };

  return (
    <div className="h-screen bg-[#0b1f2a] text-white flex flex-col">
      <div className="flex flex-grow overflow-hidden relative">
        <SideBar
          cityId={cityId}
          sidebarOpen={sidebarOpen}
          cityData={cityStacks}
          onItemSelect={handleItemSelect}
        />
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="absolute top-4 left-80 z-20 bg-cyan-400 p-1 shadow transition-all duration-300 hover:bg-cyan-200 cursor-pointer text-black"
          style={{ left: sidebarOpen ? "20rem" : "3rem" }}
          title={sidebarOpen ? "Collapse" : "Expand"}
        >
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
        <div className="flex flex-col flex-1">
          <DetailsHeader selectedStack={selectedStack} />
          <DetailsChart chartData={selectedChartData} />
          <DetailsFooter chartData={selectedChartData} />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
