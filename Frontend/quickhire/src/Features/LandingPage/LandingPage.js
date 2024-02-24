import React from "react";
import PopularServices from "./PopularServices";
import Hero from "./Hero/Hero";
import AboutUs from "./AboutUs";

function LandingPage() {
  return (
    <div>
      <Hero />
      <PopularServices />
      <AboutUs />
    </div>
  );
}

export default LandingPage;
