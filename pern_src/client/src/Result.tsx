import React from "react";
import { Typography, Box } from "@mui/material";
import { DataObject } from "./Types";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

interface Props {
  stackData: DataObject;
}
const Result = ({ stackData }: Props) => {
  const stackDataArray = Object.entries(stackData);
  const keyValue = Object.entries(stackDataArray[0][1]);

  return (
    <>
      <TableContainer
        sx={{
          maxHeight: "43vh",
          maxWidth: "auto",
          overflow: "auto",
          wordBreak: "break-word",
        }}
        component={Paper}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} size="medium">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: "200px",
                  fontWeight: "bold",
                  wordWrap: "break-word",
                }}
                align="left"
              >
                Metrics
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Data
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ border: 0 }}>
              <TableCell component="th" scope="row">
                Request Payload
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ overflowWrap: "break-word", overflow: "auto" }}
              >
                {JSON.stringify(stackData.data.requestPayload)}
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: 0 }}>
              <TableCell component="th" scope="row">
                HTTP Method
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ overflowWrap: "break-word", overflow: "auto" }}
              >
                {stackData.data.httpMethod}
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: 0 }}>
              <TableCell component="th" scope="row">
                Route
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ overflowWrap: "break-word", overflow: "auto" }}
              >
                {stackData.data.route}
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: 0 }}>
              <TableCell component="th" scope="row">
                SQL Query
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ overflowWrap: "break-word", overflow: "auto" }}
              >
                {stackData.data.sqlQuery}
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: 0 }}>
              <TableCell component="th" scope="row">
                Response Data
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ overflowWrap: "break-word", overflow: "auto" }}
              >
                {JSON.stringify(stackData.data.responseData)}
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: 0 }}>
              <TableCell component="th" scope="row">
                Status Code
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ overflowWrap: "break-word", overflow: "auto" }}
              >
                {stackData.data.statusCode}
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: 0 }}>
              <TableCell component="th" scope="row">
                Execution Time
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                sx={{ overflowWrap: "break-word", overflow: "auto" }}
              >
                {stackData.data.executionTime}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Result;
