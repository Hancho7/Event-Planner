import React from 'react';

const Tab = ({ title, active, onClick }) => {
  return (
    <div
      className={`hover:cursor-pointer p-2 ${active ? 'font-bold border-b-2 border-b-[#1F2937]' : ''}`}
      onClick={onClick}
    >
      <div className="tab-content">
        {title}
      </div>
      {active && <span className="badge">{/* badge content */}</span>}
    </div>
  );
};

const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-1 mb-12 border-2 w-fit mx-auto rounded bg-white">
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
          <Tab
            title={tab.title}
            active={index === activeTab}
            onClick={() => onChange(index)}
          />
          {index < tabs.length - 1 && (
            <div className="border-l-2 h-6 border-gray-300 mx-2"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Tabs;
