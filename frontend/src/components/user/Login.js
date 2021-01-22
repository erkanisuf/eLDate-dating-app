import React, { useState } from "react";
import Axios from "axios";

//ANT
import { Input, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FacebookOutlined,
  LoginOutlined,
} from "@ant-design/icons";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const faceboookLogin = () => {
    window.location = "http://localhost:4000/users/auth/facebook";
  };
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
      },
      withCredentials: true,
      url: "http://localhost:4000/users/login",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        // console.log(error.response.status); // 401
        // console.log(error.response.data.message);
        console.log(error.response.data);
      });
  };
  return (
    <div style={{ width: "80%", textAlign: "left" }}>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <Input
            style={{ borderRadius: "15px" }}
            placeholder="Your login email"
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <Input.Password
            placeholder="Write password"
            style={{ borderRadius: "15px" }}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            type="text"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
      </form>
      <div style={{ margin: "5px" }}>
        <Button
          icon={<LoginOutlined />}
          className="loginBtn"
          onClick={handleSubmit}
        >
          Log in
        </Button>
        <Button
          icon={<FacebookOutlined />}
          className="facebookBtn"
          onClick={faceboookLogin}
        >
          Facebook login
        </Button>
        <div style={{ textAlign: "center" }}>
          <span className="register">Register/</span>{" "}
          <span className="register">Forgot password?</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
