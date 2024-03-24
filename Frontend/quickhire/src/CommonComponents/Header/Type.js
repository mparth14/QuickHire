import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Website Designer",
          "Video Editor",
          "SEO",
          "Software Developer",
          "Content Creator",
          "EVERYONE!"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 5,
      }}
    />
  );
}

export default Type;
