import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import "./Blog.css";
import websiteImg from "../../assets/websitejpg.jpg";
import desktopImg from "../../assets/desktop.jpg"
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles({
  card: {
    width: "450px",
    borderRadius: "10px",
    marginTop: "20px",
    marginLeft: "20px"
  },
});

const cardData = [
  {
    title: "How to find a web developer in 2024?",
    image: websiteImg,
    content: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation ...",
  },
  {
    title: "How to use ChatGPT?",
    content: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation ...",
    image: desktopImg
  },
];

export default function Blog() {
  const classes = useStyles();

  return (
    <div>
        <h2 className='blog-h2'>Blog and Posts</h2>
        <div className='blog-card'>
        {cardData.map((data, index) => (
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
                        {data.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
            </CardActions>
            </CardActionArea>
            </Card>
        ))}
        </div>
    </div>
  );
}
