import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core";
import { getAllPlacedServiceOrders } from "./serviceOrdersSlice";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  order: {
    minWidth: "35vw",
    margin: "2rem",
  },
  "@media screen and (max-width:500px)": {
    order: {
      minWidth: "65vw",
    },
  },
}));

function ServiceOrdersPlaced() {
  const classes = useStyles();
  const placedOrders = useSelector(getAllPlacedServiceOrders);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: "0 2rem",
      }}>
      {placedOrders.map((order) => (
        <Card className={classes.order}>
          <CardContent style={{ textAlign: "left" }}>
            <Typography variant="h4">{order.title}</Typography>
            <Typography variant="h6">
              {order.category}
              {" > "}
              {order.subCategory}
            </Typography>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
              }}>
              <AccountCircle />
              <Typography variant="h6">{order.user}</Typography>
            </div>

            <Typography style={{ marginTop: "1rem" }}>
              Price: {order.price}
            </Typography>
            <Typography>"Placed On:" {order.date}</Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              style={{ backgroundColor: "#000", color: "#fff" }}>
              Give Feedback
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default ServiceOrdersPlaced;
