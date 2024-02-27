import React from "react";
import PopularServices from "./PopularServices";
import Hero from "./Hero/Hero";
import AboutUs from "./AboutUs";
import CategorySection from "./CategoriesSection";
import JoinNowSection from "./JoinNowSection";

function LandingPage() {
  return (
    <div>
      <Hero />
      <PopularServices />
      <AboutUs />
      <CategorySection/>
      <JoinNowSection/>
    </div>
  );
}

export default LandingPage;
