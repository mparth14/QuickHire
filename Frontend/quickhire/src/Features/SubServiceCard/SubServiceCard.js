import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import "./SubServiceCard.css";
import { Link } from 'react-router-dom';

import InfoCard from "./InfoCard/InfoCard";
import { Grid } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toast } from "react-toastify";

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
  const [iconColors, setIconColors] = useState(Array(props.cardData.length).fill("#fff"));

  const cardData = props.cardData;
  const user = props.user;
  const onload = props.onload;

  const toggleIconColor = (index) => {
    if (!user) {
      toast.error("Please login first"); // Display toast message if user is not logged in
      return;
    }
    const newIconColors = [...iconColors]; // Create a copy of iconColors array
    newIconColors[index] = newIconColors[index] === "#fff" ? "#f44336" : "#fff"; // Toggle icon color
    setIconColors(newIconColors); // Update icon colors state
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
                  {iconColors[index] === "#fff" ? (
                    <FavoriteBorderIcon
                      className={classes.heartIcon}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleIconColor(index);
                      }}
                    />
                  ) : (
                    <FavoriteIcon
                      className={classes.heartIcon}
                      style={{ color: iconColors[index] }}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleIconColor(index);
                      }}
                    />
                  )}
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
