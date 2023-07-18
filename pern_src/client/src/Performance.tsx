import { DataObject } from "./Types";
import Chart from "chart.js/auto";

interface Props {
  stackData: DataObject;
  allData: DataObject[];
}

const Performance = ({ stackData, allData }: Props) => {
  const executionTime = stackData.data.executionTime;
  // console.log(allData);
  // console.log("first:", allData[0].data.executionTime);

  return (
    <>
      <div>{executionTime ? executionTime : "run request"}</div>
    </>
  );
};

export default Performance;
