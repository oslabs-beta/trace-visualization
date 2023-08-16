import { DataObject } from "./Types";
import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface Props {
  stackData: DataObject;
  allData: DataObject[];
}

const History = ({ stackData, allData }: Props) => {
  const Row = ({ row }: { row: DataObject; index: number }) => {
    const [open, setOpen] = useState(false);
    const { route, date } = row.data;

    return (
      <>
        <React.Fragment>
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row" align="left">
              {date}
            </TableCell>
            <TableCell align="left">{route}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    History Requests
                  </Typography>
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
                          {JSON.stringify(row.data.requestPayload)}
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
                          {row.data.httpMethod}
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
                          {row.data.route}
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
                          {row.data.sqlQuery}
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
                          {JSON.stringify(row.data.responseData)}
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
                          {row.data.statusCode}
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
                          {row.data.executionTime}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      </>
    );
  };

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
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Time Stamp
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Route
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData.map((row, index) => (
              <Row row={row} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default History;
