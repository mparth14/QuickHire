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
    background: "transparent",
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
    fontSize: "18px",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "900",
  },
  categoriesContainer: {
    marginBottom: "3rem",
    marginTop: "3rem",
    padding: "18px",
    background: "rgb(248,248,248)",
    background:
      "linear-gradient(162deg, rgba(248, 248, 248, 1) 0%, rgb(190 220 235) 94%);",
    borderRadius: "10px",
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
    name: "Video Editing",
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
    <Container className={classes.categoriesContainer} maxWidth="false"
    >
      <Typography
        variant="h4"
        className={classes.categoriesHeading}
        style={{ marginTop: "18px" }}>
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
