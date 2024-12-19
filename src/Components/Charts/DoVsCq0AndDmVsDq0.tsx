import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  dm: number[];
  do: number[];
  dq0: number[];
  cq0: number[];
}

const DualAxisDynamicChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    dm: [],
    do: [],
    dq0: [],
    cq0: [],
  });

  const [isBarChart, setIsBarChart] = useState(true)

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/DataFiles/particledata.json`)
      .then((response) => response.json())
      .then((data) => {
        const binParams = data.intervalparams[0].binparams;

        const parsedData = {
          dm: binParams.map((item: any) => item.dm),
          do: binParams.map((item: any) => item.do),
          dq0: binParams.map((item: any) => item.dq0),
          cq0: binParams.map((item: any) => item.cq0),
        };

        setChartData(parsedData);
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Dual Axis Chart with Toggle Option",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "dm",
        },
        position: "bottom" as const,
      },
      x1: {
        title: {
          display: true,
          text: "do",
        },
        position: "top" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "dq0",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "cq0",
        },
      },
    },
  };

  return (
    <div style={{ width: "800px", margin: "0 auto" }}>
      <h2>Dual Axis Chart with Toggle Option</h2>
      <button
        onClick={() => setIsBarChart(!isBarChart)}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
          background: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Toggle {isBarChart ? "Line" : "Bar"} Chart for dm vs dq0
      </button>
      <Chart
        type="bar"
        data={{
          labels: chartData.dm,
          datasets: [
            {
              label: "dm vs dq0",
              data: chartData.dq0,
              type: isBarChart ? "bar" : "line",
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: isBarChart
                ? "rgba(255, 99, 132, 0.5)"
                : "rgba(255, 99, 132, 0.2)",
              yAxisID: "y",
              xAxisID: "x",
            },
            {
              label: "do vs cq0",
              data: chartData.cq0,
              type: "line",
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              yAxisID: "y1",
              xAxisID: "x1",
            },
          ],
        }}
        options={commonOptions}
      />
    </div>
  );
};

export default DualAxisDynamicChart;
