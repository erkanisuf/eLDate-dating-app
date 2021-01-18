import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import Chat from "../messages/Chat";
import "antd/dist/antd.css";
import "./SingleProfile.css";
import moment from "moment";
import { usenullOrEmpty } from "../../CustomHook/chekifNull";
import { useDispatch } from "react-redux";
//ANT
import { Descriptions, Image, Badge, Modal, Button } from "antd";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
//
const SingleProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // ANT MODAL toggle
  const dispatch = useDispatch(); // Redux
  const history = useHistory(); // Router
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
  console.log(profile, "SingleProfile");

  const tryStartConversation = (profile) => {
    // dispatch({
    //   type: "PUSH_TO_MY_CONVERSATIONS_NODB",
    //   action: {
    //     fullname: profile[0].fullname,
    //     user_id: profile[0].userlog_id,
    //     images: profile[0].images,
    //     conversation_id: 696969,
    //   },
    // });

    history.push("/mymessages");
  };
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

            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Image width={500} src={usenullOrEmpty(profile[0].images[0])} />
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
                  <ManOutlined /> Male
                </span>
              ) : profile[0].sex === "Woman" ? (
                <span>
                  <WomanOutlined /> Woman
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
              <Badge status="processing" text={profile[0].relationship} />
            </Descriptions.Item>
            <Descriptions.Item label="About me" span={3}>
              {profile[0].description}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Chat sendTo={profile[0].userlog_id} />
        </Modal>
        {/* /*                       END  DESCRIPTIONS */}
      </div>
    );
};

export default SingleProfile;
