import "./Home.css";
import React from "react";
import Top5Card from "./Top5Card";

const Home = () => {
  return (
    <div className="home_container">
      <div className="home_image_container">
        <img
          className="rosalia"
          src="https://cdn.getcrowder.com/images/1678708868669-null-main.jpeg"
          alt=""
        />
      </div>
      <h3>Your Tops</h3>

      <div className="home_grid">
        <Top5Card />
      </div>
    </div>
  );
};

export default Home;
