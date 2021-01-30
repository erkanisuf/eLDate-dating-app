import React from "react";
import { Carousel } from "antd";
import "./Home.css";
import { Link } from "react-router-dom";
import LatestProfiles from "./LatestProfiles";
import { RightCircleOutlined, HeartOutlined } from "@ant-design/icons"; // ANT
const Home = () => {
  return (
    <div className="HomePageContainer">
      <div className="carouselDIV">
        <Carousel autoplay>
          <div className="contentStyle">
            <h1>
              <HeartOutlined
                spin={true}
                style={{
                  color: "pink",
                  marginBottom: "0",
                }}
              />
              Join the community!
            </h1>
          </div>
          <div className="contentStyle">
            <h5>
              Search! Match! Date!{" "}
              <HeartOutlined
                spin={true}
                style={{
                  color: "pink",
                  marginBottom: "0",
                }}
              />
            </h5>
          </div>
        </Carousel>
      </div>
      <div className="signUpNow">
        <h1>Join us now !</h1>
        <button>
          <Link to="./register">
            <RightCircleOutlined /> Sign up{" "}
          </Link>
        </button>
      </div>
      <div className="latestUsers">
        <h1>Newest members!</h1>
        <LatestProfiles />
      </div>
    </div>
  );
};

export default Home;
