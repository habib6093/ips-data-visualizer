import React, { useEffect, useState } from "react";
import "./ParticleTable.css";

type ParticleData = {
  sv: number;
  d10_q0: number;
  d10_q2: number;
  d10_q3: number;
  d32: number;
  d50_q0: number;
  d50_q2: number;
  d50_q3: number;
  d90_q0: number;
  d90_q2: number;
  d90_q3: number;
};

const ParticleTable: React.FC = () => {
  const [data, setData] = useState<ParticleData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/DataFiles/particledata.json`);
        const json = await response.json();
        const { intervalparams } = json;
        setData({
          sv: intervalparams[0]?.sv || 0,
          d10_q0: intervalparams[0]?.d10_q0 || 0,
          d10_q2: intervalparams[0]?.d10_q2 || 0,
          d10_q3: intervalparams[0]?.d10_q3 || 0,
          d32: intervalparams[0]?.d32 || 0,
          d50_q0: intervalparams[0]?.d50_q0 || 0,
          d50_q2: intervalparams[0]?.d50_q2 || 0,
          d50_q3: intervalparams[0]?.d50_q3 || 0,
          d90_q0: intervalparams[0]?.d90_q0 || 0,
          d90_q2: intervalparams[0]?.d90_q2 || 0,
          d90_q3: intervalparams[0]?.d90_q3 || 0,
        });
      } catch (error) {
        console.error("Failed to fetch particle data", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading data...</div>;
  }

  const convertToMicrometers = (value: number): number => value * 1e6;
  const convertFromMicrometers = (value: number): number => value / 1e6;
  const { sv, d10_q0, d10_q2, d10_q3, d32, d50_q0, d50_q2, d50_q3, d90_q0, d90_q2, d90_q3 } = data;

  const tableRows = [
    { category: "Specific Surface (sv)", value: convertFromMicrometers(sv) },
    { category: "Sauter Diameter (d32)", value: convertToMicrometers(d32) },
    { category: "10th Percentile (d10_q0)", value: convertToMicrometers(d10_q0) },
    { category: "10th Percentile (d10_q2)", value: convertToMicrometers(d10_q2) },
    { category: "10th Percentile (d10_q3)", value: convertToMicrometers(d10_q3) },
    { category: "50th Percentile (d50_q0)", value: convertToMicrometers(d50_q0) },
    { category: "50th Percentile (d50_q2)", value: convertToMicrometers(d50_q2) },
    { category: "50th Percentile (d50_q3)", value: convertToMicrometers(d50_q3) },
    { category: "90th Percentile (d90_q0)", value: convertToMicrometers(d90_q0) },
    { category: "90th Percentile (d90_q2)", value: convertToMicrometers(d90_q2) },
    { category: "90th Percentile (d90_q3)", value: convertToMicrometers(d90_q3) },
  ];

  return (
    <div className="particle-container">
      <h2>Particle Data Table</h2>
      <table className="particle-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Value (μm)</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, index) => (
            <React.Fragment key={index}>
              {}
              {index === 2 || index === 5 || index === 8 ? (
                <tr>
                  <td colSpan={2} className="section-header" />
                </tr>
              ) : null}
              {}
              <tr className={index % 2 === 0 ? "even" : "odd"}>
                <td>{row.category}</td>
                <td>{row.value}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticleTable;
