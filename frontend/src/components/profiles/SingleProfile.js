import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Chat from "../messages/Chat";
import "antd/dist/antd.css";
import "./SingleProfile.css";
import moment from "moment";
import { usenullOrEmpty } from "../../CustomHook/chekifNull";

//ANT

import { Descriptions, Image, Badge, Modal, Button } from "antd";
import {
  ManOutlined,
  WomanOutlined,
  WechatOutlined,
  HeartOutlined,
} from "@ant-design/icons";
//

const SingleProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // ANT MODAL toggle

  const params = useParams(); //Router
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

  // ANT MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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

            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ borderBottom: "1px solid #E99AF2", padding: "15px" }}>
            <Image width={300} src={usenullOrEmpty(profile[0].images[0])} />
          </div>

          <div style={{ borderBottom: "1px solid #E99AF2c", padding: "15px" }}>
            <Image.PreviewGroup>
              <Image
                width={75}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <Image
                width={75}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              />
              <Image
                width={75}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              />
              <Image
                width={75}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              />
            </Image.PreviewGroup>
          </div>
        </div>
        {/* /*                        END IMAGE */}
        {/* /*                         DESCRIPTIONS */}
        <div className="descriptions">
          <Descriptions title="Profile Info" layout="vertical" bordered>
            <Descriptions.Item label="Nickname">
              {usenullOrEmpty(profile[0].nickname)}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {usenullOrEmpty(profile[0].fullname)}
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              {moment(profile[0].age, "YYYYMMDD").fromNow(true)}
            </Descriptions.Item>

            <Descriptions.Item label="City" span={2}>
              {usenullOrEmpty(profile[0].city)}
            </Descriptions.Item>

            <Descriptions.Item label="Country">
              {usenullOrEmpty(profile[0].country)}
            </Descriptions.Item>

            <Descriptions.Item label="Genre">
              {profile[0].sex === "Male" ? (
                <span>
                  <ManOutlined
                    style={{
                      color: "blue",
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  />{" "}
                  Male
                </span>
              ) : profile[0].sex === "Woman" ? (
                <span>
                  <WomanOutlined
                    style={{
                      color: "#9e3571",
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  />{" "}
                  Woman
                </span>
              ) : (
                "Other"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Weight">
              {usenullOrEmpty(profile[0].weight)}
            </Descriptions.Item>

            <Descriptions.Item label="Height">
              {usenullOrEmpty(profile[0].height)}
            </Descriptions.Item>

            <Descriptions.Item label="Interested in" span={3}>
              {profile[0].searching}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <Badge
                status={
                  profile[0].relationship === "single"
                    ? "success"
                    : profile[0].relationship === "Married"
                    ? "error"
                    : profile[0].relationship === "In relationship"
                    ? "error"
                    : profile[0].relationship === "Other"
                    ? "warning"
                    : "default"
                }
                text={profile[0].relationship}
              />
            </Descriptions.Item>
            <Descriptions.Item label="About me" span={3}>
              {profile[0].description}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className="buttonsBox">
          <Button
            type="primary"
            onClick={showModal}
            className="btnCHatStart"
            icon={<WechatOutlined style={{ fontSize: "55px" }} />}
          ></Button>
          <Button
            type="primary"
            className="btnMatchStart"
            icon={<HeartOutlined style={{ fontSize: "55px" }} />}
          ></Button>
          <Modal
            title={`Send a message if you wanta to start conversation with: ${profile[0].fullname}`}
            visible={isModalVisible}
            okButtonProps={{ style: { display: "none" } }}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Chat sendTo={profile[0].userlog_id} />
          </Modal>
        </div>
      </div>
    );
};

export default SingleProfile;
