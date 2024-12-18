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
  do: number[];
  cq0: number[];
}

const DoVsCq0Chart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    do: [],
    cq0: [],
  });

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/DataFiles/particledata.json`)
      .then((response) => response.json())
      .then((data) => {
        const binParams = data.intervalparams[0].binparams;
        const parsedData = {
          do: binParams.map((item: any) => item.do),
          cq0: binParams.map((item: any) => item.cq0),
        };

        setChartData(parsedData);
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  return (
    <div style={{ width: "800px", margin: "0 auto" }}>
      <h2>do vs cq0 Chart</h2>
      <Line
        data={{
          labels: chartData.do,
          datasets: [
            {
              label: "cq0",
              data: chartData.cq0,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
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
              text: "do vs cq0",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "do",
              },
            },
            y: {
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

export default DoVsCq0Chart;
