import tableData from "../../mock-data/detailsChartTableData.json";

const DetailsFooter = () => {
  return (
    <div className="bg-[#132935] rounded-lg p-4  overflow-hidden">
      <table className="min-w-full text-left text-sm text-white">
        <tbody>
          {tableData.map((row, idx) => (
            <tr key={idx} className="border-b border-[#22313a] last:border-b-0">
              <td className="py-2 pr-6 font-medium whitespace-nowrap">
                {row.label}
              </td>
              {row.values.map((val, i) => (
                <td key={i} className="py-2 px-4 text-right whitespace-nowrap">
                  {val.toLocaleString()}
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
