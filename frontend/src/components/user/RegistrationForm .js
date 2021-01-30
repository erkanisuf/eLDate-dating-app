import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom"; //Router
import { Input, DatePicker } from "antd"; //ANT
import { useDispatch } from "react-redux"; //REDUX
import moment from "moment";
import "./RegForm.css";
export const RegistrationForm = () => {
  const dispatch = useDispatch(); // REDUX
  const history = useHistory(); // ROUTER
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
      url: "https://dateappeldate.herokuapp.com/users/newuser",
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
          dispatch({ type: "CHECK_IF_LOGGED_IN", action: true });
          dispatch({ type: "RE_TRIGGER" });
          setError([]);
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
    <div style={{ margin: "0 auto", height: "700px", width: "100%" }}>
      <form onSubmit={handleSubmit} className="regForm ">
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
          Full name
          <Input
            placeholder="First and Second name"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <Input.Password
            placeholder="password"
            type="text"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Confirm password
          <Input.Password
            placeholder="Confirm password"
            type="text"
            name="passwordConfirmation"
            value={form.passwordConfirmation}
            onChange={handleChange}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column" }}>
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
