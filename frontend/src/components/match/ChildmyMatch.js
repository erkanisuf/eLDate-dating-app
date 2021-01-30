import React, { useState, useEffect } from "react";
import Axios from "axios";
import Chat from "../messages/Chat";
import { Avatar, Button, Modal, Spin } from "antd"; // ANT
import { Link } from "react-router-dom"; // ROUTEr
import { WechatOutlined } from "@ant-design/icons"; // ANT ICONS

const ChildmyMatch = ({ matchID }) => {
  const [profile, setProfile] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false); // ANT MODAL toggle
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/profiles/allprofiles/${matchID}`,
    })
      .then((res) => {
        if (res.status === 200) {
          setProfile(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [matchID]);
  console.log("WTF IS THIS HIST", profile);

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
  // If got covnersation

  if (profile === null) {
    return <Spin size="large" />;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: window.innerWidth <= 768 ? "95%" : "80%",
        margin: "5px",
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <Link to={`/allprofiles/${profile[0].profile_id}`}>
        <div
          style={{
            flex: "3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Avatar
            style={{ border: "1px solid #003a8c", marginRight: "10px" }}
            size={180}
            src={
              profile[0].images.length
                ? profile[0].images[0]
                : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
            }
          />
          <h2 style={{ color: " #8bc6ec", fontWeight: 700 }}>
            {profile[0].fullname}
          </h2>
        </div>
      </Link>
      <div className="buttonsBox" style={{ flex: 1 }}>
        <Button
          type="primary"
          onClick={showModal}
          className="btnCHatStart"
          icon={<WechatOutlined style={{ fontSize: "55px" }} />}
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

export default ChildmyMatch;
