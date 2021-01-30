import React, { useState } from "react";
import Axios from "axios";
import { message, Button, Avatar } from "antd"; // ANT
import { useSelector } from "react-redux"; // REDUX
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"; // ANT
import "antd/dist/antd.css";
const FormData = require("form-data");

const UploadImage = () => {
  const [image, setImage] = useState({ file: "" });
  const myprofileREDUX = useSelector((state) => state.myProfileReducer);
  const onChangeImage = (e) => {
    console.log(e.target.files[0]);
    beforeUpload(e.target.files[0]);
    setImage({ file: e.target.files });
  };

  ////ANT DESIGN STATES
  const [loading, setLoading] = useState(false);
  const [imageUrl, setimageUrl] = useState(
    myprofileREDUX.images.length
      ? myprofileREDUX.images[0]
      : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
  );
  //////
  const form = new FormData();
  form.append("profileImage", image.file[0]);

  const changeProfileImage = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios({
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: form,
      withCredentials: true,
      url: "https://dateappeldate.herokuapp.com/pictures/addprofilepicture",
    })
      .then((res) => {
        console.log(res);
        //res.data.data[0].images[0]
        if (res.status === 200) {
          setLoading(false);
          setimageUrl(res.data.data[0].images[0]);
          message.success("Profile picture changed!");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error.response.status === 500);
        message.error("You can only upload JPG/PNG file!");
        message.error("Image must smaller than 2MB!");
      });
  };

  // FORM ANT DESIGN

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  return (
    <div
      style={{
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: window.innerWidth <= 768 ? "column" : "row",

        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        marginBottom: "25px",

        paddingBottom: "25px",
      }}
    >
      <div>
        <Avatar
          style={{ border: "1px solid #003a8c" }}
          size={130}
          src={imageUrl}
        />
      </div>
      <form
        onSubmit={changeProfileImage}
        style={{
          width: "70%",
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "5px",
          height: "70%",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          marginTop: window.innerWidth <= 768 ? "25px" : "",
        }}
      >
        <input type="file" name="profileImage" onChange={onChangeImage} />
        <Button
          type="primary"
          icon={loading ? <LoadingOutlined /> : <PlusOutlined />}
          onClick={changeProfileImage}
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default UploadImage;
