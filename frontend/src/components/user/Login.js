import React, { useState } from "react";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux"; //REDUX
//ANT
import { Input, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FacebookOutlined,
  LoginOutlined,
} from "@ant-design/icons";
const Login = ({ closeNav }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const faceboookLogin = () => {
    window.location = "https://dateappeldate.herokuapp.com/users/auth/facebook";
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
      url: "https://dateappeldate.herokuapp.com/users/login",
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          dispatch({ type: "CHECK_IF_LOGGED_IN", action: true });
          dispatch({ type: "RE_TRIGGER" });
          setError("");
          history.push("/");
        }
      })
      .catch((error) => {
        // console.log(error.response.status); // 401
        // console.log(error.response.data.message);
        // if (error.response.data.message) {
        //   setError(error.response.data.message);
        // } else if (error.response.data.errors[0].msg) {
        //   setError(error.response.data.errors[0].msg);
        // }
        console.log(error);
        // console.log("xD", error.response.data.errors.errors[0].msg);
      });
  };

  return (
    <div
      style={{
        width: "80%",
        textAlign: "left",
        marginTop: window.innerWidth <= 768 ? "100px" : "",
      }}
    >
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
        {error && <p style={{ color: "red" }}>{error}</p>}
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
          <span className="register">
            {" "}
            <Link to="/register" style={{ color: "black" }} onClick={closeNav}>
              Register/
            </Link>
          </span>{" "}
          <span className="register">
            {" "}
            <Link
              to="/forgotpassword"
              style={{ color: "black" }}
              onClick={closeNav}
            >
              Forgot Password?
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
