const DetailsFooter = ({ chartData }) => {
  if (!chartData) return null;

  const historicalData = chartData.historical;
  const forecastData = chartData.forecast;

  const allQuarters = [...historicalData, ...forecastData];

  const tableData = [
    {
      label: "AI Forecast",
      color: "text-sky-400",
      values: allQuarters.map((q) => q.ai),
    },
    {
      label: "Final Forecast",
      color: "text-[#f6e96b]",
      values: allQuarters.map((q) => q.final),
    },
    {
      label: "Consumption",
      color: "text-green-500",
      values: allQuarters.map((q) => q.consumption || q.previous),
    },
  ];

  return (
    <div className="bg-[#132935] p-4 overflow-hidden">
      <table className="min-w-full text-left text-sm text-white">
        <thead>
          <tr className="border-b border-[#22313a]">
            <th className="py-2 pr-6 font-medium">Metric</th>
            {allQuarters.map((quarter, idx) => (
              <th key={idx} className="py-2 px-4 text-right font-medium">
                {quarter.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, idx) => (
            <tr
              key={idx}
              className={`border-b border-[#22313a] last:border-b-0 ${row.color}`}
            >
              <td className="py-2 pr-6 font-medium whitespace-nowrap">
                {row.label}
              </td>
              {row.values.map((val, i) => (
                <td key={i} className="py-2 px-4 text-right whitespace-nowrap">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsFooter;
