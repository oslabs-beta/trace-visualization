import React from "react";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import Result from "./Result";
import Performance from "./Performance";
import { DataObject } from "./Types";

interface Props {
  stackData: DataObject;
  allData: DataObject[];
}

const Dashboard = ({ stackData, allData }: Props) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
                <Tab sx={{ pr: 4 }} label="Results" value="1" />
                <Tab sx={{ pr: 4 }} label="Performance" value="2" />
                <Tab sx={{ pr: 4 }} label="History" value="3" />
              </TabList>
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
              <TabPanel value="1" sx={{ flex: 1, padding: 0 }}>
                <Result stackData={stackData} />
              </TabPanel>
              <TabPanel value="2" sx={{ flex: 1, padding: 0 }}>
                <Performance stackData={stackData} allData={allData} />
              </TabPanel>
              <TabPanel value="3" sx={{ flex: 1, padding: 0 }}>
                <Typography>History Under Construction</Typography>
              </TabPanel>
            </Box>
          </TabContext>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
