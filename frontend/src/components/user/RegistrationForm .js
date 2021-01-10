import React, { useState } from "react";
import Axios from "axios";
export const RegistrationForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    age: "",
  });
  const handleChange = (event) => {
    console.log(event.target.name);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        email: form.email,
        password: form.password,
        username: form.username,
        age: form.age,
      },
      withCredentials: true,
      url: "http://localhost:4000/users/newuser",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  };
  return (
    <div style={{ backgroundColor: "pink" }}>
      <form onSubmit={handleSubmit}>
        <label>
          email
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          username
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </label>
        <label>
          password
          <input
            type="text"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <label>
          age
          <input
            type="text"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default RegistrationForm;
