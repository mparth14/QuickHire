/**
 * @Author Hiteshkumar Gupta
 * Hero component displaying the main hero section of the landing page.
 * @returns {JSX.Element} The rendered JSX element.
 */

import React from "react";
import { Parallax } from "react-parallax";
import "./Hero.css";
import rightImg from "./hero-assets/10353047.png";
import bgImg from "./hero-assets/hero-bg.png";
import Type from "../../../CommonComponents/Header/Type";


const Hero = () => {
  return (
    <div>
      <Parallax bgImage={bgImg} strength={800}>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text-container">
              <p className="hero-title">QuickHire</p>
              <p className="hero-type-effect-heading">One Stop Solution for</p>
              <p className="hero-type-effect"><Type/></p>
              <button className="hero-button">Let's Share Talent!</button>
              {/* <p className="hero-subtitle">Let's Share Talent!</p> */}
            </div>
            <div className="image-container">
              <img src={rightImg} alt="Floating Image" />
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Hero;
