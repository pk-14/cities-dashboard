"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Filter, Mail } from "lucide-react";
import sideBarConfig from "../../../configurations/sideBarConfig.json";

const SideBar = ({ sidebarOpen, onItemSelect, cityData }) => {
  const statusTabs = sideBarConfig.statusTabs;
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("BACKLOG");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const filteredItems = cityData.filter((item) => item.status === selectedTab);

  useEffect(() => {
    if (filteredItems.length > 0 && !selectedItemId) {
      const firstItem = filteredItems[0];
      setSelectedItemId(firstItem.id);
      if (onItemSelect) {
        onItemSelect(firstItem.chartData, firstItem);
      }
    }
  }, [filteredItems, selectedItemId, onItemSelect]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleItemClick = (id) => {
    setSelectedItemId(id);
    const clickedItem = cityData.find((item) => item.id === id);
    if (clickedItem && onItemSelect) {
      onItemSelect(clickedItem.chartData, clickedItem);
    }
  };

  return (
    <div
      className={`transition-all duration-300 bg-[#0f2a35] border-r border-gray-700 overflow-y-auto ${
        sidebarOpen ? "lg:w-80 md:w-30" : "ld:w-12 md:w-12"
      }`}
    >
      {sidebarOpen && (
        <>
          <header className="p-4 flex items-center justify-between">
            <div className="flex md:flex-col lg:flex-row items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="px-3 py-1 rounded text-sm cursor-pointer"
              >
                <ArrowLeft />
              </button>
              <h1 className="text-xl font-semibold">Sample Stack</h1>
            </div>
          </header>

          <div className="p-2">
            <div className="flex justify-between items-center mb-2 border-b border-gray-600 md:border-none lg:border-solid">
              <div className="flex md:flex-col lg:flex-row gap-4 uppercase mt-2">
                {statusTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`flex gap-2 cursor-pointer ${
                      selectedTab === tab
                        ? "text-cyan-400 border-b-2 border-cyan-400 pb-2"
                        : "text-gray-400"
                    }`}
                  >
                    <p className="font-bold text-[10px]">{tab}</p>
                    <p className="text-gray-400 text-[10px]">
                      ({cityData.filter((d) => d.status === tab).length})
                    </p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 text-sm font-bold text-cyan-300 mb-1 text-[12px]">
              Filter
              <Filter className="w-4 h-4 text-cyan-400" title="Filter" />
            </div>
          </div>

          <div className="px-2 py-1 space-y-2">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`relative flex gap-2 items-start border border-black hover:border-cyan-400 rounded p-2 text-sm bg-white/5 cursor-pointer transition-all duration-200 ${
                  selectedItemId === item.id
                    ? "border-cyan-400 bg-white/10"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleSelect(item.id);
                  }}
                  className="form-checkbox mt-1 h-4 w-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-0"
                />
                <div className="flex-1">
                  <div className="flex gap-2 mb-1 flex-wrap">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center border border-black bg-white text-black font-bold uppercase text-xs px-2 py-0.5 rounded-sm"
                        style={{
                          fontFamily: "Arial Narrow, Arial, sans-serif",
                          letterSpacing: "0.02em",
                        }}
                      >
                        <span className="mr-1">↑</span>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div>{item.name}</div>
                </div>
                <Mail
                  className="absolute top-2 right-2 w-4 h-4 text-cyan-400 hover:text-cyan-300 md:hidden"
                  title="Send Email"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
