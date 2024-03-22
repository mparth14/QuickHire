import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import "./SubServiceCard.css";
import InfoCard from "./InfoCard/InfoCard"

const useStyles = makeStyles({
  card: {
    width: "345px",
    borderRadius: "10px",
    margin: "10px"
  },
});

export default function SubServiceCard(props) {
  const classes = useStyles();
  const cardData = props.cardData;

  return (
    <div className='sub-card-design'>
      {cardData.map((data, index) => (
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
      ))}
    </div>
  );
}
