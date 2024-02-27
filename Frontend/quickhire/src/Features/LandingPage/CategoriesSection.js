import React, { useState } from "react";
import { Container, Paper, Typography, makeStyles } from "@material-ui/core";
import writingLogo from "../../assets/writing.png";
import writingColorLogo from "../../assets/writingColor.png";
import programmingLogo from "../../assets/programming.png";
import programmingColorLogo from "../../assets/programmingColor.png";
import photographyLogo from "../../assets/photography.png";
import photographyColorLogo from "../../assets/photographyColor.png";
import videoLogo from "../../assets/video.png";
import videoColorLogo from "../../assets/videoColor.png";
import marketingLogo from "../../assets/marketing.png";
import marketingColorLogo from "../../assets/marketingColor.png";

const useStyles = makeStyles((theme) => ({
  categoryPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
    },
    width: "150px",
    height: "200px",
    margin: theme.spacing(2),
    border: "none",
    boxShadow: "none",
  },
  categoryImage: {
    width: "100%",
    height: "auto",
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  categoryName: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    borderBottom: "1px solid blue",
    transition: "border-bottom 0.3s",
    borderBottomWidth: "1px",
    height: "40px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "14px",
    fontWeight: "bold",
    "&:hover": {
      borderBottomWidth: "2px",
    },
  },
  hoveredCategory: {
    borderBottomWidth: "2px",
  },
  categoriesHeading: {
    marginBottom: "1rem",
  },
  categoriesContainer: {
    marginBottom: "3rem",
    marginTop: "3rem",
    padding: "0",
    width: "100%",
  },
}));

const categories = [
  {
    name: "Writing",
    image: writingLogo,
    hoverImage: writingColorLogo,
  },
  {
    name: "Programming",
    image: programmingLogo,
    hoverImage: programmingColorLogo,
  },
  {
    name: "Photography",
    image: photographyLogo,
    hoverImage: photographyColorLogo,
  },
  {
    name: "Video and Animation",
    image: videoLogo,
    hoverImage: videoColorLogo,
  },
  {
    name: "Digital Marketing",
    image: marketingLogo,
    hoverImage: marketingColorLogo,
  },
];

const CategorySection = () => {
  const classes = useStyles();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <Container maxWidth="false" className={classes.categoriesContainer}>
      <Typography variant="h4" className={classes.categoriesHeading}>
        Categories
      </Typography>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {categories.map((category, index) => (
          <Paper
            key={index}
            className={`${classes.categoryPaper} ${
              hoveredCategory === category ? classes.hoveredCategory : ""
            }`}
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}>
            <img
              src={
                hoveredCategory === category
                  ? category.hoverImage
                  : category.image
              }
              alt={category.name}
              className={classes.categoryImage}
            />
            <Typography
              variant="h6"
              className={`${classes.categoryName} ${
                hoveredCategory === category ? classes.hoveredCategory : ""
              }`}>
              {category.name}
            </Typography>
          </Paper>
        ))}
      </div>
    </Container>
  );
};

export default CategorySection;
