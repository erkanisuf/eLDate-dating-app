import React from "react";
import { useSelector } from "react-redux";
//ANT DESIGN
import { Avatar, Typography, Divider } from "antd";

const Myprofile = () => {
  const { Title, Text } = Typography; // ANT DESIGN
  const myprofileREDUX = useSelector((state) => state.myProfileReducer);

  return (
    <div>
      <Avatar
        style={{ border: "1px solid #003a8c" }}
        size={130}
        src={
          myprofileREDUX.images.length
            ? myprofileREDUX.images[0]
            : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
        }
      />
      <Divider style={{ width: "80%" }} />
      <Text type="secondary">Logged in as</Text>
      <Title style={{ marginTop: "0" }} level={4}>
        {myprofileREDUX.fullname}
      </Title>
    </div>
  );
};

export default Myprofile;
