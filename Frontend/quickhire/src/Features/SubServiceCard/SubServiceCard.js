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
    return wishlistServices.some(service => service._id === id);
  };

  const toggleIconColor = async (id, data) => {
    console.log("Toggle called");
    if (!user) {
      toast.error("Please login first");
      return;
    }
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
          setWishlistServices(prevState => prevState.filter(service => service._id !== data._id));
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
          setWishlistServices(prevState => [...prevState, data]);
        } else {
          toast.error("Failed to update your wishlist.");
        }
      }
    };
    const color = isWishlisted(id) ? "#000000" : "#FF5555";
    await updateDB(color);
  };

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
                      color: isWishlisted(data._id || data.id) ? "#FF5555" : "#000000",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleIconColor(data._id || data.id, data);
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
