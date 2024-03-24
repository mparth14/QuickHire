import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box } from "@material-ui/core";
import ServiceOrdersPlaced from "./ServiceOrdersPlaced";
import ServiceOrdersReceived from "./ServiceOrdersReceived";

function Orders() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ padding: "0 2rem" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered>
        <Tab
          label="Service Placed"
          id="full-width-tab-0"
          aria-controls="full-width-tabpanel-0"
        />
        <Tab
          label="Service Received"
          id="full-width-tab-1"
          aria-controls="full-width-tabpanel-1"
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ServiceOrdersPlaced />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ServiceOrdersReceived />
      </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ backgroundColor: "#e0e0e0" }}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default Orders;
