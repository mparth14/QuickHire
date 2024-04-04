import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import "./SubCategoryCard.css";
import { CONFIG } from "../../config";
import { Grid } from "@material-ui/core";

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
  },
}));

export default function SubCategoryCard() {
  const classes = useStyles();
  const { name } = useParams();
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${CONFIG.BASE_PATH}categories`);
        const data = await response.json();
        console.log(data);
        if (data.success) {
          let updatedCardData = [];
          if (name) {
            const categoryData = data.data.find(
              (category) => category.name.toLowerCase() === name.toLowerCase()
            );
            if (categoryData) {
              updatedCardData = categoryData.subcategories.map(
                (subcategory) => ({
                  title: subcategory.name,
                  content: subcategory.services,
                  image: subcategory.url,
                })
              );
            } else {
              console.error("Selected category not found:", name);
            }
          } else {
            updatedCardData = data.data.flatMap((category) =>
              category.subcategories.map((subcategory) => ({
                title: subcategory.name,
                content: subcategory.services,
                image: subcategory.url,
              }))
            );
          }
          setCardData(updatedCardData);
        } else {
          console.error("Error fetching data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);

  const pathname = window.location.pathname;
  const categoryFromURL = decodeURIComponent(pathname.split("/").pop());

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "20px",
        }}>
        <h2
          className="topic"
          style={{
            textTransform: "capitalize",
            marginTop: "20px",
            color: "#3f51b5",
          }}>
          Explore {categoryFromURL}
        </h2>
      </div>
      <div style={{ justifyContent: "center" }}>
        <Grid container spacing={5} className={classes.gridContainer}>
          {cardData.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Link
                key={index}
                to={`/${CONFIG.SUB_CATEGORY}${name}?service=${encodeURIComponent(
                  data.title
                )}`}
                className="category-link-deco">
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
            </Grid>
          ))}
        </Grid>
        </div>
    </div>
  );
}
