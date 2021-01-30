import React, { useState } from "react";
import "./RegForm.css";
import Axios from "axios";
//ANT
import { Input } from "antd";
const ForgotPassword = () => {
  const [form, setForm] = useState({ email: "" });
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    Axios({
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: {
        email: form.email,
      },
      withCredentials: true,
      url: "https://dateappeldate.herokuapp.com/users/forgotpassword",
    })
      .then((res) => {
        if (res.status === 200) {
          setError([]);
          setSuccess(res.data.message);
        }
      })
      .catch((error) => {
        setSuccess("");
        if (error.response.data.message) {
          setError(error.response.data.message);
        } else if (error.response.data.errors) {
          setError(error.response.data.errors);
        }
      });
  };
  return (
    <div style={{ margin: "0 auto", height: "200px", width: "100%" }}>
      <form onSubmit={handleSubmit} className="regForm">
        <label>
          Write your email adress:
          <Input
            style={{ borderRadius: "15px" }}
            placeholder="Your login email"
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
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
      {success ? (
        <p style={{ color: "green", fontWeight: "600", margin: "5px" }}>
          {success}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default ForgotPassword;
