/**
 * @Author Yashkumar Khorja
 * ServiceOrdersPlaced component renders the orders placed by the logged in user.
 * @param {Object} user - User object containing user details.
 * @returns {JSX.Element} - The rendered JSX element.
 */
import React, { useEffect, useState } from "react";
import RatingPopup from "../../../utils/RatingDialogPopUp";
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
  CircularProgress,
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
    width: "6rem",
    height: "6rem",
    borderRadius: "5px",
    marginRight: theme.spacing(2),
  },
  orderDetails: {
    flexGrow: 1,
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
  const [serviceId, setServiceID] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const history = useHistory();

  // Fetch orders when component mounts
  useEffect(() => {
    const getAllServices = async () => {
      try {
        const response = await fetch(
          `${CONFIG.BASE_PATH}${CONFIG.ORDERS_PATH}${user._id}`,
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

  const handleOpenPopup = (e, id) => {
    e.stopPropagation();
    setServiceID(id);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const onServiceTitleClick = (e, serviceId) => {
    e.stopPropagation();
    history.push(`/services/${serviceId}`);
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
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Typography style={{ fontWeight: "700" }}>Order ID:</Typography>
                <Typography>{order._id}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography style={{ fontWeight: "700" }}>
                  Total Price:
                </Typography>
                <Typography>${order.totalPrice} per hour</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography style={{ fontWeight: "700" }}>
                  Placed On:
                </Typography>
                <Typography>
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography style={{ fontWeight: "700" }}>
                  Total Items:
                </Typography>
                <Typography>{order.service.length}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} direction="column">
              {order.service.map((service, serviceIndex) => (
                <Grid item key={serviceIndex}>
                  <Grid container alignItems="flex-start">
                    <Grid item xs={12} sm={2}>
                      <img
                        src={service.imgUrl}
                        alt={service.title}
                        className={classes.serviceImage}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography
                        variant="h6"
                        className={classes.serviceTitle}
                        onClick={(e) => onServiceTitleClick(e, service._id)}>
                        {service.title}
                      </Typography>
                      <Typography>${service.price} per hour</Typography>
                      <Button
                        variant="outlined"
                        onClick={(e) => handleOpenPopup(e, service._id)}
                        style={{ color: "#fff", backgroundColor: "#000" }}>
                        Give Service Review
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="h5">Seller</Typography>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={service.seller.photoUrl}
                            alt={service.seller.first_name}
                            style={{ width: "2rem", height: "2rem" }}
                          />
                          <Typography style={{ marginLeft: "5px" }}>
                            {service.seller.first_name}
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
          {/* <AccordionActions>
            <Button
              variant="contained"
              onClick={(e) => handleOpenPopup(e, order.service._id)}
              style={{ color: "#fff", backgroundColor: "#000" }}>
              Give Service Review
            </Button>
          </AccordionActions> */}
        </Accordion>
      ))}
      <Typography variant="h4" align="center" gutterBottom></Typography>
      {showPopup && (
        <RatingPopup
          serviceID={serviceId}
          user={user}
          onClose={handleClosePopup}
        />
      )}
    </Container>
  );
}

export default ServiceOrdersPlaced;
