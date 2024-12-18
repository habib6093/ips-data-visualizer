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

interface DataPoint {
  dm: number[];
  dq0: number[];
}

const DMvsDQ0Chart: React.FC = () => {
  const [chartData, setChartData] = useState<DataPoint>({
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
      <h2>dm vs dq0 Chart</h2>
      <Line
        data={{
          labels: chartData.dm, // X-axis labels (dm values)
          datasets: [
            {
              label: "dq0",
              data: chartData.dq0, // Y-axis values
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
              text: "dm vs dq0",
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

export default DMvsDQ0Chart;
