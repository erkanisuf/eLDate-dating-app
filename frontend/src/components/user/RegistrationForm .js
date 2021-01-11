import React, { useState, useEffect } from "react";
import Axios from "axios";
export const RegistrationForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    username: "",
    age: "",
  });
  const handleChange = (event) => {
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
        passwordConfirmation: form.passwordConfirmation,
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

  useEffect(() => {
    function getAge() {
      var today = new Date();
      var birthDate = new Date(form.age);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      console.log(age);
      return age;
    }
    getAge();
  }, [form.age]);
  console.log(form.age);
  return (
    <div
      style={{
        backgroundColor: "pink",
        display: "flex",
        width: "150px",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
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
          passwordConfirmation
          <input
            type="text"
            name="passwordConfirmation"
            value={form.passwordConfirmation}
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default RegistrationForm;
