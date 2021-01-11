import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
export const EditProfile = () => {
  const [form, setForm] = useState({
    fullname: "",
    nickname: "",
    description: "",
    sex: "",
    phone: "",
    relationship: "",
    searching: "",
    height: "",
    weight: "",
    city: "",
    country: "",
    age: "",
  });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios({
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: {
        fullname: form.fullname,
        nickname: form.nickname,
        description: form.description,
        sex: form.sex,
        relationship: form.relationship,
        searching: form.searching,
        height: form.height === "" ? null : form.height,
        weight: form.weight === "" ? null : form.weight,
        city: form.city,
        country: form.country,
        age: form.age === "" ? null : form.age,
      },
      withCredentials: true,
      url: "http://localhost:4000/users/updateprofile",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: "http://localhost:4000/users/getuser",
    })
      .then((res) => {
        const {
          fullname,
          nickname,
          description,
          sex,
          relationship,
          searching,
          height,
          phone,
          weight,
          city,
          country,
          age,
        } = res.data.data;
        setForm({
          fullname,
          nickname,
          description,
          sex,
          relationship,
          searching,
          height: height === null ? "" : height,
          phone: phone === null ? "" : phone,
          weight: weight === null ? "" : weight,
          city,
          country,
          age: age === null ? "" : moment(age).format("YYYY-MM-DD"),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(form);
  return (
    <div
      style={{
        backgroundColor: "green",
        display: "flex",
        width: "150px",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label>
          fullname
          <input
            type="text"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
          />
        </label>
        <label>
          sex
          <input
            type="text"
            name="sex"
            value={form.sex}
            onChange={handleChange}
          />
        </label>
        <label>
          nickname
          <input
            type="text"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
          />
        </label>
        <label>
          description
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <label>
          relationship
          <input
            type="text"
            name="relationship"
            value={form.relationship}
            onChange={handleChange}
          />
        </label>

        <label>
          searching
          <input
            type="text"
            name="searching"
            value={form.searching}
            onChange={handleChange}
          />
        </label>
        <label>
          height
          <input
            type="text"
            name="height"
            value={form.height}
            onChange={handleChange}
          />
        </label>
        <label>
          weight
          <input
            type="text"
            name="weight"
            value={form.weight}
            onChange={handleChange}
          />
        </label>
        <label>
          city
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
        </label>
        <label>
          country
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
          />
        </label>
        <label>
          age
          <input
            type="date"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Edit" />
      </form>
    </div>
  );
};

export default EditProfile;
