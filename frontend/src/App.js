import React, { useState, useEffect } from "react";
import "./App.css";
import Cookies from "js-cookie";
import Axios from "axios";
import RegistrationForm from "./components/user/RegistrationForm ";
function App() {
  const [form, setForm] = useState({ email: "", password: "" });
  const faceboookLogin = () => {
    window.location = "http://localhost:4000/users/auth/facebook";
  };
  const handleChange = (event) => {
    console.log(event.target.name);
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  console.log(form);

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        email: form.email,
        password: form.password,
      },
      withCredentials: true,
      url: "http://localhost:4000/users/login",
    })
      .then((res) => {
        console.log(res);
        Cookies.set("logedin", res.data.success);
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data.message);
        Cookies.remove("logedin");
      });
  };

  const fetchMe = () => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: "http://localhost:4000/users/profile",
    }).then((res) => console.log(res));
  };

  const cookieget = () => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: "http://localhost:4000/getcookie",
    }).then((res) => console.log(res));
  };

  const logout = () => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: "http://localhost:4000/users/logout",
    }).then((res) => console.log(res));
  };
  console.log(Cookies.get("token"));
  return (
    <div className="App">
      <button onClick={faceboookLogin}>Facebook login</button>
      <button onClick={fetchMe}>Profile</button>
      <button onClick={cookieget}>Cookie</button>
      <button onClick={logout}>logout</button>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <RegistrationForm />
    </div>
  );
}

export default App;
