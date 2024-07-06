import React from "react";

const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 8 }).map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
