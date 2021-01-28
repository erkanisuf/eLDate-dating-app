import React from "react";
import { Carousel } from "antd";
import "./Home.css";

const Home = () => {
  return (
    <div className="HomePageContainer">
      <div className="carouselDIV">
        <Carousel autoplay>
          <div>
            <h1 className="contentStyle">Join the community!</h1>
          </div>
          <div>
            <h1 className="contentStyle">Search!</h1>
          </div>
          <div>
            <h1 className="contentStyle">Match!</h1>
          </div>
          <div>
            <h1 className="contentStyle">Date!</h1>
          </div>
        </Carousel>
      </div>
      <div className="signUpNow"></div>
      <div className="latestUsers"></div>
    </div>
  );
};

export default Home;
