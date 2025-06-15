import { AlertTriangle, Copy, Flag } from "lucide-react";

const DetailsHeader = ({ selectedStack }) => {
  if (!selectedStack) return null;

  return (
    <div className="flex items-center bg-[#132935] px-6 py-3 rounded-t-lg shadow w-full">
      <div className="flex items-center gap-3 flex-1 min-w-0 pl-10">
        <AlertTriangle size={18} className="text-yellow-400 mr-1" />
        <span className="font-semibold text-white truncate">
          {selectedStack.name}
        </span>
        <span className="text-xs text-gray-400 ml-2">Stack Id:</span>
        <span className="text-xs text-gray-200 ml-1">
          {selectedStack.stackId}
        </span>
        <button className="ml-1 p-1 hover:bg-[#164055] rounded transition">
          <Copy size={14} className="text-gray-400" />
        </button>
      </div>

      <div className="flex gap-2 bg-[#183848] px-6 py-2 rounded justify-start">
        <div className="flex flex-col items-center min-w-[90px]">
          <span className="text-[10px] text-gray-400 tracking-widest">
            FORECAST ACC.
          </span>
          <span className="text-lg text-white font-semibold leading-none">
            {selectedStack.metrics.forecastAccuracy}%
          </span>
        </div>
        <div className="flex flex-col items-center min-w-[90px]">
          <span className="text-[10px] text-gray-400 tracking-widest">
            FORECAST STAB.
          </span>
          <span className="text-lg text-white font-semibold leading-none">
            {selectedStack.metrics.forecastStability}%
          </span>
        </div>
      </div>

      <div className="flex-1 flex justify-end">
        <Flag size={20} className="text-gray-400" />
      </div>
    </div>
  );
};

export default DetailsHeader;
