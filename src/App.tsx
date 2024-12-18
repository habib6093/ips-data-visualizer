import React, { useState } from "react";
import DualAxisChart from "./Components/Charts/DualAxisChart";
import DMvsDQ0Chart from "./Components/Charts/DMvsDQ0Chart";
import DoVsCq0Chart from "./Components/Charts/DoVsCq0Chart";
import DmVsDq0Histogram from "./Components/Charts/DmVsDq0Histogram";
import ParticleTable from "./Components/Charts/ParticleTable";
import "./App.css";

type Tab = {
  id: string;
  label: string;
  component: JSX.Element;
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("DualAxisChart");

  const tabs: Tab[] = [
    { id: "DualAxisChart", label: "Dual Axis Chart", component: <DualAxisChart /> },
    { id: "DMvsDQ0Chart", label: "Dm vs Dq0 Chart", component: <DMvsDQ0Chart /> },
    { id: "DoVsCq0Chart", label: "Do vs Cq0 Chart", component: <DoVsCq0Chart /> },
    { id: "DmVsDq0Histogram", label: "Dm Vs Dq0 Histogram", component: <DmVsDq0Histogram /> },
    { id: "ParticleTable", label: "Particle Table", component: <ParticleTable /> },
  ];

  const renderTabContent = () => {
    const activeTabInfo = tabs.find((tab) => tab.id === activeTab);
    return activeTabInfo ? activeTabInfo.component : null;
  };

  return (
    <div>
      <br />
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : "inactive"}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default App;
