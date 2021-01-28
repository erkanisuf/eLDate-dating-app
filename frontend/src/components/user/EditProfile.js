import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import UploadImage from "./UploadImage";
import Myalbum from "./Myalbum";
// ANT
import { Input, Button, Modal, Select, DatePicker, Tabs } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useLocation, useHistory } from "react-router-dom"; // ROUTER
//REDUX
import { useSelector, useDispatch } from "react-redux";

export const EditProfile = () => {
  const location = useLocation(); //ROUTER

  const history = useHistory(); // ROUTER
  const { Option } = Select;
  const [tablevel, setTabLevel] = useState(1); // ANT TABS
  const { TabPane } = Tabs; // ANT
  const { TextArea } = Input; // ANT
  const [isModalVisible, setIsModalVisible] = useState(
    location.pathname === "/updatemyprofile" ? true : false
  ); // ANT MODAL toggle
  const dispatch = useDispatch(); //REDUX
  const myprofileREDUX = useSelector((state) => state.myProfileReducer); // REDUX
  const [error, setError] = useState([]);

  const [form, setForm] = useState({
    fullname: myprofileREDUX.fullname,
    nickname: myprofileREDUX.nickname,
    description: myprofileREDUX.description,
    sex: myprofileREDUX.sex,
    phone: myprofileREDUX.phone,
    relationship: myprofileREDUX.relationship,
    searching: myprofileREDUX.searching,
    height: myprofileREDUX.height,
    weight: myprofileREDUX.weight,
    city: myprofileREDUX.city,
    country: myprofileREDUX.country,
    age: myprofileREDUX.age,
  });
  console.log("age", typeof myprofileREDUX.age);
  useEffect(() => {
    setForm({
      fullname: myprofileREDUX.fullname,
      nickname: myprofileREDUX.nickname,
      description: myprofileREDUX.description,
      sex: myprofileREDUX.sex,
      phone: myprofileREDUX.phone,
      relationship: myprofileREDUX.relationship,
      searching: myprofileREDUX.searching,
      height: myprofileREDUX.height,
      weight: myprofileREDUX.weight,
      city: myprofileREDUX.city,
      country: myprofileREDUX.country,
      age: myprofileREDUX.age,
    });
    setError([]);
  }, [myprofileREDUX]);

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
        if (res.status === 200) {
          dispatch({ type: "RE_TRIGGER" });
          setIsModalVisible(false);
          if (location.pathname === "/updatemyprofile") {
            history.push("/");
            console.log("WTF IS GOING ON");
          }
        }
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data, "errors");
        setError(error.response.data);
      });
  };

  // ANT MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // ANT TAB
  function callback(key) {
    console.log(key);
    setTabLevel(key);
  }
  return (
    <div style={{ marginTop: "25px" }}>
      <Button
        type="primary"
        onClick={showModal}
        className="btnSettings"
        icon={
          <SettingOutlined style={{ fontSize: "25px", cursor: "Pointer" }} />
        }
      ></Button>
      <p
        onClick={showModal}
        style={{
          color: "grey",
          fontWeight: "600",
          marginTop: "5px",
          cursor: "Pointer",
        }}
      >
        Edit Profile
      </p>

      <Modal
        title={`Fill the details and then Save changes!`}
        visible={isModalVisible}
        okButtonProps={{ style: { display: "none" } }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tabs defaultActiveKey={tablevel} onChange={callback}>
          <TabPane tab="Profile Details" key="1">
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                width: "80%",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <label>
                Fullname
                <Input
                  placeholder="First and Second name"
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                />
              </label>
              <label>
                Genre
                <Input.Group compact>
                  <Select
                    style={{ width: "100%" }}
                    name="sex"
                    placeholder="First and Second name"
                    defaultValue={form.sex}
                    value={form.sex}
                    onChange={(e) => {
                      setForm({ ...form, sex: e });
                    }}
                  >
                    <Option value="Male">Male</Option>
                    <Option value="Woman">Woman</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Input.Group>
              </label>
              <label>
                Nickname
                <Input
                  type="text"
                  name="nickname"
                  value={form.nickname}
                  onChange={handleChange}
                />
              </label>
              <label>
                About me
                <TextArea
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </label>
              <label>
                Relationship
                <Input.Group compact>
                  <Select
                    style={{ width: "100%" }}
                    name="relationship"
                    placeholder="Relationship status"
                    defaultValue={form.relationship}
                    value={form.relationship}
                    onChange={(e) => {
                      setForm({ ...form, relationship: e });
                    }}
                  >
                    <Option value="Single">Single</Option>
                    <Option value="In relationship">In relationship</Option>
                    <Option value="Married">Married</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Input.Group>
              </label>
              <label>
                Interested in
                <Input.Group compact>
                  <Select
                    style={{ width: "100%" }}
                    name="searching"
                    placeholder="Looking for ...."
                    defaultValue={form.searching}
                    value={form.searching}
                    onChange={(e) => {
                      setForm({ ...form, searching: e });
                    }}
                  >
                    <Option value="Male">Male</Option>
                    <Option value="Woman">Woman</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Input.Group>
              </label>

              <label>
                Height
                <Input
                  type="text"
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                />
              </label>
              <label>
                Weight
                <Input
                  type="text"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                />
              </label>
              <label>
                City
                <Input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
              </label>
              <label>
                Country
                <Input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                />
              </label>
              <label>
                Year when im born
                <p>
                  Your current age:{" "}
                  {moment(myprofileREDUX.age, "YYYYMMDD").fromNow(true)}
                </p>
                <DatePicker
                  type="date"
                  name="age"
                  // onChange={handleChange}
                  onChange={(e) =>
                    setForm({ ...form, age: moment(e).format("YYYY-MM-DD") })
                  }
                />
              </label>
              <Button
                type="submit"
                value="Save"
                className="btnsave"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </form>
            {error.errors &&
              error.errors.map((el, index) => {
                return (
                  <div key={index} style={{ color: "red" }}>
                    {el.param} : {el.msg}
                  </div>
                );
              })}
          </TabPane>
          <TabPane tab="Pictures managment" key="2">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <h2 style={{ textAlign: "center" }}>Profile Picture</h2>
              <UploadImage />
              <h2 style={{ textAlign: "center" }}>Albums Photo</h2>
              <Myalbum />
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default EditProfile;
