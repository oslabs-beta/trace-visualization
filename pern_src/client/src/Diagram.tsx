import React, { useEffect } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { DataObject } from "./Types";
import SequenceDiagram from "./SequenceDiagram";
import DatabaseDiagram from "./DatabaseDiagram";
import isValidUri from "./utils/validateUri";
import getTableData from "./services/databaseService";
import queryParser from "./services/queryParserService";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  stackData: DataObject;
}

const Diagram = ({ stackData }: Props) => {
  const [value, setValue] = React.useState("1");
  const [pgUri, setPgUri] = React.useState("");
  const [tables, setTables] = React.useState({});
  const [queryInfo, setQueryInfo] = React.useState({});

  //This useEffect generates all the tables from the SQL database of the associated URI
  useEffect(() => {
    const fetchData = async () => {
      if (isValidUri(pgUri)) {
        const data = await getTableData(pgUri);
        setTables(data);
      }
    };

    fetchData();
  }, [pgUri]);

  //This useEffect parses through the SQL query recently emitted
  useEffect(() => {
    const fetchQueryData = async () => {
      if (stackData.data.sqlQuery) {
        const queryData = await queryParser(stackData.data.sqlQuery);
        setQueryInfo(queryData);
      }
    };
    fetchQueryData();
  }, [stackData.data.sqlQuery]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPgUri(event.currentTarget.value);
  };

  return (
    <>
      <Box sx={{ display: "flex", height: "50vh" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingBottom: "10px",
            marginTop: "10px",
          }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                "@media (min-width: 600px)": {
                  flexDirection: "row",
                },
              }}
            >
              <TabList
                onChange={handleChange}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  "@media (max-width: 600px)": {
                    flexDirection: "column",
                  },
                }}
              >
                <Tab sx={{ pr: 4 }} label="Sequence Diagram" value="1" />
                <Tab sx={{ pr: 4 }} label="Database Diagram" value="2" />
              </TabList>
              <TextField
                variant="outlined"
                sx={{ flex: 1, maxWidth: 325, marginBottom: "10px" }}
                label="PG URI"
                onChange={handleInput}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                "@media (min-width: 600px)": {
                  flexDirection: "row",
                },
              }}
            >
              <TabPanel value="1" sx={{ flex: 1, padding: 1 }}>
                <SequenceDiagram stackData={stackData} />
              </TabPanel>
              <TabPanel value="2" sx={{ flex: 1, padding: 1 }}>
                <DatabaseDiagram tables={tables} queryInfo={queryInfo} />
              </TabPanel>
            </Box>
          </TabContext>
        </Container>
      </Box>
    </>
  );
};

export default Diagram;
