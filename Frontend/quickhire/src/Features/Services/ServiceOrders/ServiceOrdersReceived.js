/**
 * @Author Yashkumar Khorja
 * ServiceOrdersReceived component renders the orders received to the logged in user.
 * @param {Object} user - User object containing user details.
 * @returns {JSX.Element} - The rendered JSX element.
 */

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";
import { CONFIG } from "../../../config";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

// Define styles using makeStyles hook
const useStyles = makeStyles((theme) => ({
  order: {
    marginBottom: theme.spacing(2),
    borderRadius: "1rem",
    "&.MuiAccordion-root:before": {
      opacity: 0,
    },
  },
  serviceImage: {
    width: "8rem",
    height: "8rem",
    borderRadius: "5px",
    marginRight: theme.spacing(2),
  },
  orderDetails: {
    flexGrow: 1,
  },
  sellerDetails: {
    marginTop: theme.spacing(2),
  },
  serviceTitle: {
    color: "rgb(63, 81, 181)",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function ServiceOrdersReceived({ user }) {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const history = useHistory();

  // Fetch orders when component mounts
  useEffect(() => {
    const getAllServices = async () => {
      try {
        const response = await fetch(
          `${CONFIG.BASE_PATH}${CONFIG.ORDERS_PATH}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const responseData = await response.json();
        setOrders(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getAllServices();
  }, [token, user]);

  const onServiceTitleClick = (e, order) => {
    e.stopPropagation();
    history.push(`/services/${order.service[0]._id}`);
  };

  // Render loading spinner if data is loading
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "5rem",
        }}>
        <CircularProgress />
        <Typography>Fetching Orders...</Typography>
      </div>
    );
  }

  if (!loading && orders.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <img
          src="https://icons.veryicon.com/png/o/application/map-app/no-order-3.png"
          alt="No orders"
          style={{ width: "20rem", height: "20rem" }}
        />
        <Typography variant="h5">No orders found!</Typography>
      </div>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom></Typography>
      {orders.map((order, index) => (
        <Accordion key={index} className={classes.order}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`order-details-${index}`}
            id={`order-summary-${index}`}>
            <Grid container alignItems="center">
              <Grid item>
                <img
                  src={order.service[0].imgUrl}
                  alt={order.service[0].title}
                  className={classes.serviceImage}
                />
              </Grid>
              <Grid item className={classes.orderDetails}>
                <Typography
                  variant="h5"
                  onClick={(e) => onServiceTitleClick(e, order)}
                  className={classes.serviceTitle}>
                  {order.service[0].title}
                </Typography>
                <Typography>${order.service[0].price} per hour</Typography>
                <Typography>Order Placed: {order.createdAt}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container alignItems="center">
              <Typography variant="body1">
                {order.service?.[0]?.description}
              </Typography>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h5" style={{ marginTop: "1rem" }}>
                  Buyer
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={order?.user?.photoUrl}
                    alt={order?.user?.first_name}
                    style={{ width: "2rem", height: "2rem" }}
                  />
                  <Typography style={{ marginLeft: "5px" }}>
                    {order?.user?.first_name}
                  </Typography>
                </div>
              </div>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <Typography variant="h4" align="center" gutterBottom></Typography>
    </Container>
  );
}

export default ServiceOrdersReceived;
