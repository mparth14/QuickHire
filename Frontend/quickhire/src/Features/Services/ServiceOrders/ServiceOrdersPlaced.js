/**
 * @Author Yashkumar Khorja
 * ServiceOrdersPlaced component renders the orders placed by the logged in user.
 * @param {Object} user - User object containing user details.
 * @returns {JSX.Element} - The rendered JSX element.
 */

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Button,
  Container,
  Grid,
  Typography,
  AccordionActions,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";
import { CONFIG } from "../../../config";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

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

function ServiceOrdersPlaced({ user }) {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const response = await fetch(
          `${CONFIG.BASE_PATH}${CONFIG.ORDERS_PATH}buyer/${user._id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const responseData = await response.json();
        setOrders(responseData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getAllServices();
  }, [token, user]);

  const onServiceTitleClick = (e, order) => {
    e.stopPropagation();
    history.push(`/services/${order.service._id}`);
  };

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
                  src={order.service.imgUrl}
                  alt={order.service.title}
                  className={classes.serviceImage}
                />
              </Grid>
              <Grid item className={classes.orderDetails}>
                <Typography
                  variant="h5"
                  onClick={(e) => onServiceTitleClick(e, order)}
                  className={classes.serviceTitle}>
                  {order.service.title}
                </Typography>
                <Typography>CAD$ {order.service.price}/hr</Typography>
                <Typography>Order Placed: {order.date}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container alignItems="center">
              <Typography variant="body1">
                {order.service?.description}
              </Typography>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h5" style={{ marginTop: "1rem" }}>
                  Seller
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={order.buyer.photoUrl}
                    alt={order.buyer.first_name}
                    style={{ width: "2rem", height: "2rem" }}
                  />
                  <Typography style={{ marginLeft: "5px" }}>
                    {order.buyer.first_name}
                  </Typography>
                </div>
              </div>
            </Grid>
          </AccordionDetails>
          <AccordionActions>
            <Button
              variant="contained"
              // onClick={handleSubmitFeedback}
              style={{ color: "#fff", backgroundColor: "#000" }}>
              Give Service Review
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
    </Container>
  );
}

export default ServiceOrdersPlaced;
