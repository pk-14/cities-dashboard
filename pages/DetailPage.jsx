"use client";
import React from "react";
import { useRouter } from "next/navigation";

const DetailPage = ({ cityId }) => {
  const router = useRouter();

  return (
    <div className="p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        Back
      </button>
      <h2 className="text-lg font-semibold">Details for City: {cityId}</h2>
      {/* Sidebar, Chart, and Table will go here */}
    </div>
  );
};

export default DetailPage;
