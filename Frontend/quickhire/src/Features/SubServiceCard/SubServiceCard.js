import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import "./SubServiceCard.css";
import InfoCard from "./InfoCard/InfoCard"
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  gridContainer:{
    paddingLeft: "10px",
    paddingRight: "10px",
    alignItems: "center",
    alignContent: "center"

  },
  card: {
    minWidth: '300px', // Default width
    borderRadius: '10px',
    margin: '10px',
    height: "530px"
  },
}));

export default function SubServiceCard(props) {
  const classes = useStyles();
  const cardData = props.cardData;

  return (
    <div style={{justifyContent: "center"}}>
      <Grid container spacing={5} className={classes.gridContainer}>
      {cardData.map((data, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card key={index} className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={"media"}
              image={data.image}
            />
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
