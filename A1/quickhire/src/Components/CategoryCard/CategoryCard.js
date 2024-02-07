import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import "./CategoryCard.css";
import websiteImg from "../../assets/websitejpg.jpg";
import mobileImg from "../../assets/mobile.png";
import softwareImg from "../../assets/software.png"
import desktopImg from "../../assets/desktop.jpg"


const useStyles = makeStyles({
  card: {
    width: "345px",
    borderRadius: "10px",
    margin: "10px",
  },
});

const cardData = [
  {
    title: "Websites",
    content: ["Website Development", "Website SEO", "Shopify"],
    image: websiteImg 
  },
  {
    title: "App Development",
    content: ["Desktop Game", "Chatbot Development", "Telegram Bots"],
    image: desktopImg
  },
  {
    title: "Mobile Apps",
    content: ["Android App", "iOS App", "App Maintenance"],
    image: mobileImg 
  },
  {
    title: "Software Development",
    content: ["AI Development", "Scripting", "Browser Extensions"],
    image: softwareImg 
  },
  {
    title: "Mobile Apps",
    content: ["Android App", "iOS App", "App Maintenance"],
    image: mobileImg 
  },
  {
    title: "Full Stack Development",
    content: ["Android App", "iOS App", "App Maintenance"],
    image: websiteImg 
  },
  {
    title: "Cybersecurity",
    content: ["Cloud", "iOS App", "App Maintenance"],
    image: mobileImg 
  },
  {
    title: "Miscellaneous",
    content: ["Electronic engineering", "iOS App", "App Maintenance"],
    image: desktopImg 
  },
];

export default function MediaCard() {
  const classes = useStyles();

  return (
    <div>
      <div className='card-design'>
        {cardData.map((data, index) => (
          <Link to="/subcategory" className="link-deco">
          <Card key={index} className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={"media"}
                image={data.image}
                title={data.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.title}
                </Typography>
                <Typography>
                  <ul>
                    {data.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Link>
        ))}
      </div>
      </div>
  );
}
