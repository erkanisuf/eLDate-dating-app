import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Image, message, Button } from "antd"; //ANT
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons"; // ANT
const FormData = require("form-data");

const Myalbum = () => {
  const [myalbum, setMyalbum] = useState([]);
  const [loading, setLoading] = useState(false); // Loading upload
  const [deleteLoading, setDeleteLoading] = useState(false); // loading when delete
  const [profileLoading, setProfileLoading] = useState(false); // loading when make profil pic

  const [image, setImage] = useState({ file: "" });
  console.log("albm", image);
  const onChangeImage = (e) => {
    const thearrimg = e.target.files;

    [...thearrimg].map((el) => beforeUpload(el));

    setImage({ file: e.target.files });
  };
  const form = new FormData();
  for (const key of Object.keys(image.file)) {
    form.append("albumImage", image.file[key]);
  }

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
  const changeProfileImage = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios({
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: form,
      withCredentials: true,
      url: "http://localhost:4000/pictures/addtoalbum",
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setLoading(false);
          message.success("Sucsessfuly added !");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/users/getmyalbum`,
    })
      .then((res) => {
        if (res.status === 200) {
          setMyalbum(res.data.data.album);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading, deleteLoading, profileLoading]);

  const deleteAlbumItem = (param) => {
    setDeleteLoading(true);
    Axios({
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      data: { deleteItem: param },
      withCredentials: true,
      url: `http://localhost:4000/pictures/deletealbumitem`,
    })
      .then((res) => {
        if (res.status === 200) {
          setDeleteLoading(false);
          message.success("Sucsessfuly Deleted !");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const albumToProfile = (param) => {
    setProfileLoading(true);
    Axios({
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: { profileItem: param },
      withCredentials: true,
      url: `http://localhost:4000/pictures/albumtoProfile`,
    })
      .then((res) => {
        if (res.status === 200) {
          setProfileLoading(false);
          message.success(
            "Sucsessfuly added Profile Picture, refresh to see changes !"
          );
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          marginBottom: "10px",
        }}
      >
        <form
          onSubmit={changeProfileImage}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <input
            type="file"
            name="albumImage"
            onChange={onChangeImage}
            multiple
          />
          <Button
            icon={loading ? <LoadingOutlined /> : <PlusOutlined />}
            onClick={changeProfileImage}
          >
            Upload
          </Button>
        </form>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Image.PreviewGroup>
          {myalbum.length && myalbum != null
            ? myalbum.map((el, index) => {
                return (
                  <div
                    key={el}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "5px",
                      width: window.innerWidth <= 768 ? 95 : 100,
                    }}
                  >
                    <Image width={100} height={100} src={el} />{" "}
                    <Button
                      onClick={() => deleteAlbumItem(el)}
                      style={{
                        margin: "5px",
                        borderRadius: "5px",
                      }}
                      icon={
                        deleteLoading ? <LoadingOutlined /> : <DeleteOutlined />
                      }
                      danger
                    >
                      delete
                    </Button>
                    <Button
                      onClick={() => albumToProfile(el)}
                      style={{
                        borderRadius: "5px",
                      }}
                      icon={
                        deleteLoading ? <LoadingOutlined /> : <UserOutlined />
                      }
                      type="primary"
                    >
                      profile
                    </Button>
                  </div>
                );
              })
            : "You dont have any photos yet !"}
        </Image.PreviewGroup>
      </div>
    </div>
  );
};

export default Myalbum;
