import React from "react";
import PopularServices from "./PopularServices";
import Hero from "./Hero/Hero";
import AboutUs from "./AboutUs";
import CategorySection from "./CategoriesSection";
import JoinNowSection from "./JoinNowSection";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  aboutUs: {
    padding: "0 4rem",
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <div>
      <Hero />
      <div className={classes.aboutUs}>
        <PopularServices />
        <AboutUs />
        <CategorySection />
        <JoinNowSection />
      </div>
    </div>
  );
}

export default LandingPage;
