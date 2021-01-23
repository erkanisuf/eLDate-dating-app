import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom"; //Router
import { Input, Button, DatePicker } from "antd"; //ANT
import moment from "moment";
export const RegistrationForm = () => {
  const history = useHistory();
  const [error, setError] = useState([]);
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
        console.log(res, "GOOD REG");
        if (res.status === 200) {
          setForm({
            email: "",
            password: "",
            passwordConfirmation: "",
            username: "",
            age: "",
          });
          history.push("/updatemyprofile");
        }
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
        setError(error.response.data.errors);
      });
  };
  console.log(error);

  return (
    <div
      style={{
        backgroundColor: "pink",
        margin: "0 auto",
        display: "flex",
        width: "70%",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label>
          email
          <Input
            placeholder="Email adress"
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Username
          <Input
            placeholder="Username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <Input
            placeholder="password"
            type="text"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Confirm password
          <Input
            placeholder="Confirm password"
            type="text"
            name="passwordConfirmation"
            value={form.passwordConfirmation}
            onChange={handleChange}
          />
        </label>

        <label>
          What year are you born?
          <DatePicker
            placeholder="What year are you born.."
            type="date"
            name="age"
            onChange={(e) =>
              setForm({ ...form, age: moment(e).format("YYYY-MM-DD") })
            }
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {error.length
        ? error.map((el, index) => {
            return (
              <p style={{ color: "red" }} key={index}>
                {el.param} :{el.msg}
              </p>
            );
          })
        : ""}
    </div>
  );
};

export default RegistrationForm;
