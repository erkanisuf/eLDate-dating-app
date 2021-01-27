import React, { useState } from "react";
import Axios from "axios";
const FormData = require("form-data");
const Myalbum = () => {
  const [image, setImage] = useState({ file: "" });
  const onChangeImage = (e) => {
    setImage({ file: e.target.files });
  };
  const form = new FormData();
  for (const key of Object.keys(image.file)) {
    form.append("albumImage", image.file[key]);
  }

  const changeProfileImage = (e) => {
    e.preventDefault();

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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div style={{ backgroundColor: "green" }}>
        <form onSubmit={changeProfileImage}>
          <input
            type="file"
            name="albumImage"
            onChange={onChangeImage}
            multiple
          />
          <input type="submit" value="upload" />
        </form>
      </div>
    </div>
  );
};

export default Myalbum;
