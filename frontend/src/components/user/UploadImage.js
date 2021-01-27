import React, { useEffect, useState } from "react";
import Axios from "axios";
const FormData = require("form-data");
const UploadImage = () => {
  const [image, setImage] = useState({ file: "" });
  const onChangeImage = (e) => {
    setImage({ file: e.target.files });
  };
  const form = new FormData();
  form.append("profileImage", image.file[0]);
  console.log(form, "form");
  console.log(image.file[0], "sate");

  const changeProfileImage = (e) => {
    e.preventDefault();

    Axios({
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: form,
      withCredentials: true,
      url: "http://localhost:4000/pictures/addprofilepicture",
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div style={{ backgroundColor: "red" }}>
        <form onSubmit={changeProfileImage}>
          <input type="file" name="profileImage" onChange={onChangeImage} />
          <input type="submit" value="upload" />
        </form>
      </div>
    </div>
  );
};

export default UploadImage;
