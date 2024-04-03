/**
 * @Author Hiteshkumar Gupta
 * Component for displaying sub-service cards.
 * @param {Object} props - The props object.
 * @param {Array} props.cardData - Array of sub-service data.
 * @returns {JSX.Element} - The rendered JSX element.
 */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./SubServiceCard.css";
import InfoCard from "./InfoCard/InfoCard";
import { Grid } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "10px",
    paddingRight: "10px",
    alignItems: "center",
    alignContent: "center",
  },
  card: {
    minWidth: "300px", // Default width
    borderRadius: "10px",
    margin: "10px",
    height: "530px",
    position: "relative", // Position relative for overlaying
  },
  heartIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 1, // Ensure the heart icon appears above the CardMedia
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Red color for the heart icon
    padding: "6px",
    borderRadius: "100px",
    cursor: "pointer",
  },
}));

export default function SubServiceCard(props) {
  const classes = useStyles();
  const [iconColors, setIconColors] = useState(Array(props.cardData.length).fill("#fff")); // Array of icon colors

  const cardData = props.cardData;
  const user = props.user;
  const onload = props.onload;

  const toggleIconColor = (index) => {
    const newIconColors = [...iconColors]; // Create a copy of iconColors array
    newIconColors[index] = newIconColors[index] === "#fff" ? "#f44336" : "#fff"; // Toggle icon color
    setIconColors(newIconColors); // Update icon colors state
  };
  console.log(user);
  console.log(onload);

  return (
    <div style={{ justifyContent: "center" }}>
      <Grid container spacing={5} className={classes.gridContainer}>
        {cardData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={"media"} image={data.image} />
                {!user && onload ? 
                (
                  <FavoriteBorderIcon
                    className={classes.heartIcon}
                    onClick={() => alert("Login required")}
                  />
                ): (
                  iconColors[index] === "#fff" ? (
                    <FavoriteBorderIcon
                      className={classes.heartIcon}
                      onClick={() => toggleIconColor(index)}
                    />
                  ) : (
                    <FavoriteIcon
                      className={classes.heartIcon}
                      style={{ color: iconColors[index] }}
                      onClick={() => toggleIconColor(index)}
                    />
                  )
                )}
                <CardContent>
                  <InfoCard cardInfo={data} />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
