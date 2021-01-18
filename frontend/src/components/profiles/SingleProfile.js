import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Chat from "../messages/Chat";
import "antd/dist/antd.css";
import "./SingleProfile.css";
import moment from "moment";
//ANT
import { Descriptions, Divider, Image, Badge } from "antd";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
//
const SingleProfile = () => {
  const params = useParams();
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/profiles/allprofiles/${params.id}`,
    })
      .then((res) => {
        console.log(res);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);
  console.log(profile, "profzjjjjjjjjjjjj");
  if (!profile.length) return <h1>Loading...</h1>;
  else
    return (
      <div className="myGrid">
        {/* /*                         IMAGES */}
        <div
          className="imageGridEl"
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",

            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Image width={500} src={profile[0].images[0]} />
          <div>
            <Image.PreviewGroup>
              <Image
                width={200}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <Image
                width={200}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              />
            </Image.PreviewGroup>
          </div>
        </div>
        {/* /*                        END IMAGE */}
        {/* /*                         DESCRIPTIONS */}
        <div className="descriptions">
          {/* <Chat sendTo={profile[0].userlog_id} /> */}
          {/* <p type="vertical" style={{ color: "red" }}>
            {profile[0].fullname}
          </p>

          <p type="vertical" style={{ color: "red" }}>
            {profile[0].nickname}
          </p>

          <p type="vertical" style={{ color: "red" }}>
            {profile[0].city}
          </p> */}
          <Descriptions title="Profile Info" layout="vertical" bordered>
            <Descriptions.Item label="Nickname">
              {profile[0].nickname}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {profile[0].fullname}
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              {moment(profile[0].age, "YYYYMMDD").fromNow(true)}
            </Descriptions.Item>

            <Descriptions.Item label="City" span={2}>
              {profile[0].city}
            </Descriptions.Item>

            <Descriptions.Item label="Country">
              {profile[0].country}
            </Descriptions.Item>

            <Descriptions.Item label="Genre">
              {profile[0].sex === "Male" ? (
                <span>
                  <ManOutlined /> Male
                </span>
              ) : profile[0].sex === "Woman" ? (
                <span>
                  <ManOutlined /> Woman
                </span>
              ) : (
                "Other"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Weight">
              {profile[0].weight}
            </Descriptions.Item>

            <Descriptions.Item label="Height">
              {profile[0].height}
            </Descriptions.Item>

            <Descriptions.Item label="Interested in" span={3}>
              {profile[0].searching}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <Badge status="processing" text={profile[0].relationship} />
            </Descriptions.Item>
            <Descriptions.Item label="About me" span={3}>
              {profile[0].description}
            </Descriptions.Item>
          </Descriptions>
        </div>
        {/* /*                       END  DESCRIPTIONS */}
      </div>
    );
};

export default SingleProfile;
