/**
 * @Author Yashkumar Khorja
 * ServiceOrdersView component renders the orders placed and received by and to logged in user.
 * @param {Object} user - User object containing user details.
 * @param {boolean} onload - Flag indicating whether the component is loaded.
 * @returns {JSX.Element} - The rendered JSX element.
 */

import React, { useEffect, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box } from "@material-ui/core";
import ServiceOrdersPlaced from "./ServiceOrdersPlaced";
import ServiceOrdersReceived from "./ServiceOrdersReceived";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Orders({ user, onload }) {
  const [value, setValue] = useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Redirect to login page if user is not logged in
  useEffect(() => {
    if (!user && onload) {
      history.push("/login");
    }
  }, [onload, user, history]);

  return (
    <div style={{ padding: "0 2rem", minHeight: "51vh" }}>
      {/* Tabs for switching between orders placed and received */}
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
        <ServiceOrdersPlaced user={user} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ServiceOrdersReceived user={user} />
      </TabPanel>
    </div>
  );
}

// Function to render the tab panel content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default Orders;
