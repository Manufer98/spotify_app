import React from "react";
import Top5sCards from "../Top5s/Top5sCards";

const Home = () => {
  return (
    <div className="home_container">
      <div className="home_image_container">
        <img
          src="https://cdn.getcrowder.com/images/1678708868669-null-main.jpeg"
          alt=""
        />
      </div>
      <h3>Your Tops</h3>

      <div className="home_grid">
        <Top5sCards />
      </div>
    </div>
  );
};

export default Home;
