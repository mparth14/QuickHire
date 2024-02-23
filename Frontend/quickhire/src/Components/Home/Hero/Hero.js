import React from 'react';
import { Parallax } from "react-parallax";
import "./Hero.css";
import rightImg from "./hero-assets/10353047.png"
import bgImg from "../Hero/hero-assets/hero-bg.png"

const Hero = () => {
  return (
    <div>
        <Parallax bgImage={bgImg} strength={800}>
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-text-container">
                        <h1 className="hero-title">QuickHire</h1>
                        <p className='hero-subtitle'>Let's Share Talent!</p>
                        <button className='hero-button'>Get Started</button>
                    </div>
                    <div className="image-container">
                        <img src={rightImg} alt="Floating Image" />
                    </div>
                </div>
            </div>
            
        </Parallax>
    </div>
  );
}

export default Hero;
