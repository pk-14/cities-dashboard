"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import DetailsChart from "./DetailsChart";
import SideBar from "./SideBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DetailsHeader from "./DetailsHeader";
import DetailsFooter from "./DetailsFooter";

const DetailsPage = () => {
  const { cityId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen bg-[#0b1f2a] text-white flex flex-col">
      <div className="flex flex-grow overflow-hidden relative">
        <SideBar cityId={cityId} sidebarOpen={sidebarOpen} />
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="absolute top-4 left-80 z-20 bg-cyan-400 p-1 shadow transition-all duration-300 hover:bg-cyan-200 cursor-pointer text-black"
          style={{ left: sidebarOpen ? "20rem" : "3rem" }}
          title={sidebarOpen ? "Collapse" : "Expand"}
        >
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
        <div className="flex flex-col flex-1">
          <DetailsHeader />
          <DetailsChart />
          <DetailsFooter />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
