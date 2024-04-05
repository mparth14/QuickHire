import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import "./SubServiceCard.css";
import { Link } from "react-router-dom";

import InfoCard from "./InfoCard/InfoCard";
import { Grid } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { toast } from "react-toastify";
import { CONFIG } from "../../config";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import RatingPopup from "../../utils/RatingDialogPopUp.js";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "10px",
    paddingRight: "10px",
    alignItems: "center",
    alignContent: "center",
  },
  card: {
    minWidth: "300px",
    borderRadius: "10px",
    margin: "10px",
    height: "480px",
    position: "relative",
  },
  heartIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "6px",
    borderRadius: "100px",
    cursor: "pointer",
  },
}));

export default function SubServiceCard(props) {
  const classes = useStyles();
  const cardData = props.cardData;
  const user = props.user;
  const [wishlistServices, setWishlistServices] = useState([]);
  const history = useHistory();
  console.log({ cardData }, { user }, { wishlistServices });
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (!user) {
      setWishlistServices([]);
      return;
    }
    const getWishlistedServices = async () => {
      console.log(user);
      const response = await fetch(
        `${CONFIG.BASE_PATH}wishlist?email=${user.email}`
      );
      const data = await response.json();
      setWishlistServices(data);
    };
    getWishlistedServices();
  }, [user]);

  const isWishlisted = (id) => {
    return wishlistServices.some((service) => service._id === id);
  };

  const toggleIconColor = async (id, data) => {
    console.log("Toggle called");
    if (!user) {
      toast.error("Please login first");
      return;
    }
    const updateDB = async (color) => {
      console.log(color);
      if (color === "#FF5555") {
        // Remove
        console.log("Remove service from wishlist.");
        const dataToSend = {
          email: user.email,
          id: data.id,
        };
        const response = await fetch(`${CONFIG.BASE_PATH}wishlist`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
        if (response.status === 200) {
          toast.success("Removed from your wishlist!");
          console.log(wishlistServices);
          // Make a copy of the current state
          const updatedWishlist = [...wishlistServices];

          // Find the index of the service with the matching id
          const indexToRemove = updatedWishlist.findIndex(
            (service) => service._id === data.id
          );

          // If the service is found, remove it from the copied array
          if (indexToRemove !== -1) {
            updatedWishlist.splice(indexToRemove, 1);

            // Set the state with the modified array
            setWishlistServices(updatedWishlist);
          } else {
            // Handle the case where the service is not found
            console.error("Service not found in wishlist.");
          }

          console.log(wishlistServices);
        } else {
          toast.error("Failed to update your wishlist.");
        }
      } else {
        // Add
        console.log("Add service to wishlist.");
        console.log("ADDED; ", data);
        console.log("ADDED; ", user);
        const dataToSend = {
          email: user.email,
          id: data.id,
        };
        const response = await fetch(`${CONFIG.BASE_PATH}wishlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
        if (response.status === 200) {
          toast.success("Added to your wishlist!");
          setWishlistServices((prevState) => prevState.concat(data));
          console.log("adeddddd: ", wishlistServices);
        } else {
          toast.error("Failed to update your wishlist.");
        }
        window.location.reload();
      }
    };
    const color = isWishlisted(id) ? "#FF5555" : "#000000";
    await updateDB(color);
  };

  console.log(cardData);

  return (
    <div style={{ justifyContent: "center" }}>
      <Grid container spacing={5} className={classes.gridContainer}>
        {cardData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Link
              key={index}
              to={`/services/${data.id}`}
              className="category-link-deco"
            >
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia className={"media"} image={data.image} />
                  <FavoriteIcon
                    className={classes.heartIcon}
                    style={{
                      color: isWishlisted(data.id) ? "#FF5555" : "#000000",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleIconColor(data.id, data);
                    }}
                  />
                  <CardContent>
                    <InfoCard cardInfo={data} />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
