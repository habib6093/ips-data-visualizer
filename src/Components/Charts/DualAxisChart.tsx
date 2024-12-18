import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const DualAxisChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    dm: [],
    do: [],
    dq0: [],
    cq0: [],
  });

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

  return (
    <div style={{ width: "800px", margin: "0 auto" }}>
      <h2>Dual Axis Chart with Two X-Axes</h2>
      <Line
        data={{
          labels: chartData.dm, // Primary X-axis (dm)
          datasets: [
            {
              label: "dm vs dq0",
              data: chartData.dq0,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              yAxisID: "y", // Primary Y-axis
              xAxisID: "x", // Primary X-axis
            },
            {
              label: "do vs cq0",
              data: chartData.cq0,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              yAxisID: "y1", // Secondary Y-axis
              xAxisID: "x1", // Secondary X-axis
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Dual X-Axis and Y-Axis Chart",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "dm",
              },
              position: "bottom",
            },
            x1: {
              title: {
                display: true,
                text: "do",
              },
              position: "top",
              grid: {
                drawOnChartArea: false,
              },
            },
            y: {
              type: "linear",
              display: true,
              position: "left",
              title: {
                display: true,
                text: "dq0",
              },
            },
            y1: {
              type: "linear",
              display: true,
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
              title: {
                display: true,
                text: "cq0",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DualAxisChart;
