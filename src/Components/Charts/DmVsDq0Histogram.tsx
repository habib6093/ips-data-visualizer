import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  dm: number[];
  dq0: number[];
}

const DmVsDq0Histogram: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    dm: [],
    dq0: [],
  });

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/DataFiles/particledata.json`)
      .then((response) => response.json())
      .then((data) => {
        const binParams = data.intervalparams[0].binparams;
        const parsedData = {
          dm: binParams.map((item: any) => item.dm),
          dq0: binParams.map((item: any) => item.dq0),
        };

        setChartData(parsedData);
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  return (
    <div style={{ width: "800px", margin: "0 auto" }}>
      <h2>Histogram of dm vs dq0</h2>
      <Bar
        data={{
          labels: chartData.dm,
          datasets: [
            {
              label: "dq0",
              data: chartData.dq0,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
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
              text: "dm vs dq0 Histogram",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "dm",
              },
            },
            y: {
              title: {
                display: true,
                text: "dq0",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DmVsDq0Histogram;
