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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toast } from "react-toastify";
import { CONFIG } from "../../config";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
  const [iconColors, setIconColors] = useState(
    Array(props.cardData.length).fill("#000000")
  );

  const cardData = props.cardData;
  const user = props.user;
  const onload = props.onload;
  const [wishlistServices, setWishlistServices] = useState([]);
  const history = useHistory();
  console.log({ cardData }, { user }, { wishlistServices });

  useEffect(() => {
    const getWishlistedServices = async () => {
      const response = await fetch(
        `${CONFIG.BASE_PATH}wishlist?email=${user.email}`
      );
      const data = await response.json(); // Assuming the response is JSON
      setWishlistServices(data);
    };
    getWishlistedServices();
  }, [user]); // Only fetch wishlist services when user email changes

  const isWishlisted = (id, index) => {
    console.log("ID: " + id);
    console.log(wishlistServices);
    for (let i = 0; i < wishlistServices.length; i++) {
      console.log(wishlistServices[i].id);
      if (wishlistServices[i]._id == id) {
        iconColors[index] = "#FF5555";
        return true;
      }
    }
    iconColors[index] = "#000000";
    return false;
  };

  const toggleIconColor = (index, data) => {
    console.log("Toggle called");
    if (!user) {
      toast.error("Please login first");
      return;
    }
    const newIconColors = [...iconColors]; // Create a copy of iconColors array
    newIconColors[index] =
      newIconColors[index] === "#000000" ? "#FF5555" : "#000000"; // Toggle icon color
    const updateDB = async (color) => {
      console.log(color);
      if (color === "#000000") {
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
        } else {
          toast.error("Failed to update your wishlist.");
        }
      } else {
        // Add
        console.log("Add service to wishlist.");
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
        } else {
          toast.error("Failed to update your wishlist.");
        }
      }
    };
    updateDB(newIconColors[index]);
    setIconColors(newIconColors);
  };

  return (
    <div style={{ justifyContent: "center" }}>
      <Grid container spacing={5} className={classes.gridContainer}>
        {cardData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Link
              key={index}
              to={`/services/${data._id}`}
              className="category-link-deco"
            >
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia className={"media"} image={data.image} />
                  <FavoriteIcon
                    className={classes.heartIcon}
                    style={{
                      color: isWishlisted(data._id || data.id, index)
                        ? "#FF5555"
                        : "#000000",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleIconColor(index, data);
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
