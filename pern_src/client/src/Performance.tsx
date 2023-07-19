import { DataObject } from "./Types";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

interface Props {
  stackData: DataObject;
  allData: DataObject[];
}

const Performance = ({ stackData, allData }: Props) => {
  const executionTime = stackData.data.executionTime;
  const requestPayload = JSON.stringify(stackData.data.requestPayload);
  const httpMethod = stackData.data.httpMethod;
  const route = stackData.data.route;
  const sqlQuery = stackData.data.sqlQuery;
  const responseData = JSON.stringify(stackData.data.responseData);
  const statusCode = stackData.data.statusCode;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  const [executionTimeData, setExecutionTimeData] = useState<{
    [key: string]: number;
  }>({});

  const labels = allData.map((el) => {
    // traverse through allData
    // check if route exists in an element in allData array
    // if so, take existing execution time of matching route and add it with new execution time
    let url = new URL("/", el.data.route);
    let urlCount = url.origin.length;
    let split = el.data.route.split("");
    let updatedRoute = split.slice(urlCount).join("");
    return updatedRoute;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Execution Time",
        data: allData.map((el) => {
          const executionTime = el.data.executionTime;
          const numberfy = Number(executionTime.replace("s", ""));
          return numberfy;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    const newData: { [key: string]: { sum: number; count: number } } = {};
    labels.forEach((label, index) => {
      if (!newData[label]) {
        newData[label] = {
          sum: data.datasets[0].data[index],
          count: 1,
        };
      } else {
        newData[label] = {
          sum: newData[label].sum + data.datasets[0].data[index],
          count: newData[label].count + 1,
        };
      }
    });
    const averageData: { [key: string]: number } = {};
    for (const [label, { sum, count }] of Object.entries(newData)) {
      averageData[label] = sum / count;
    }
    setExecutionTimeData(averageData);
  }, [allData]);

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default Performance;
