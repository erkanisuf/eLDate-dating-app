import React, { useState } from "react";
import "./RegForm.css";
import Axios from "axios";
import { useParams } from "react-router-dom"; // ROUTER
//ANT
import { Input } from "antd";
const ResetPassword = () => {
  const location = useParams(); //ROUTER

  const [form, setForm] = useState({ password: "", passwordConfirmation: "" });
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
        password: form.password,
        passwordConfirmation: form.passwordConfirmation,
      },
      withCredentials: true,
      url: `https://dateappeldate.herokuapp.com/users/resetpassword/${location.id}`,
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
    <div style={{ margin: "0 auto", height: "350px", width: "100%" }}>
      <form onSubmit={handleSubmit} className="regForm">
        <label>
          New Password
          <Input.Password
            placeholder="password"
            type="text"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Confirm new password
          <Input.Password
            placeholder="Confirm password"
            type="text"
            name="passwordConfirmation"
            value={form.passwordConfirmation}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Save new password" />
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

export default ResetPassword;
