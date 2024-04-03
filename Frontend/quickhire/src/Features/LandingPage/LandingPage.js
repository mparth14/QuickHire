import React from "react";
import PopularServices from "./PopularServices";
import Hero from "./Hero/Hero";
import AboutUs from "./AboutUs";
import CategorySection from "./CategoriesSection";
import JoinNowSection from "./JoinNowSection";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  aboutUs: {
    padding: "0 3rem",
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <div>
      <Hero />
      <div className={classes.aboutUs}>
        <div style={{marginTop: "0px"}}></div>
        <PopularServices />
        <AboutUs />
        <CategorySection />
        <JoinNowSection />
      </div>
    </div>
  );
}

export default LandingPage;
