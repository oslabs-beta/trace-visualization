import React from "react";
import Diagram from "../Diagram";
import Dashboard from "../Dashboard";
import { Box, Typography } from "@mui/material";
import { DataObject } from "../Types";

interface Props {
  stackData: DataObject;
  allData: DataObject[];
}

const Webview = ({ stackData, allData }: Props) => {
  return (
    <>
      <Box sx={{ background: "#EEEEEE", maxWidth: "auto" }}>
        <Diagram stackData={stackData} />
        <Dashboard stackData={stackData} allData={allData} />
      </Box>
    </>
  );
};

export default Webview;
