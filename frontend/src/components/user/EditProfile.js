import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
// ANT
import { Input, Button, Modal, Select } from "antd";
import { SettingOutlined } from "@ant-design/icons";
//REDUX
import { useSelector } from "react-redux";

export const EditProfile = () => {
  const { Option } = Select;
  const { TextArea } = Input; // ANT
  const [isModalVisible, setIsModalVisible] = useState(false); // ANT MODAL toggle
  const myprofileREDUX = useSelector((state) => state.myProfileReducer); // REDUX
  const [error, setError] = useState([]);
  console.log("erra", error);
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
  console.log("formSEX", form);
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
        setIsModalVisible(false);
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

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        className="btnSettings"
        icon={
          <SettingOutlined style={{ fontSize: "25px", cursor: "Pointer" }} />
        }
      ></Button>
      <p style={{ color: "grey", fontWeight: "600", marginTop: "5px" }}>
        Edit Profile
      </p>

      <Modal
        title={`Fill the details and then Save changes!`}
        visible={isModalVisible}
        okButtonProps={{ style: { display: "none" } }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: "flex",
            width: "80%",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit}>
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
              nickname
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
              relationship
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
              searching
              <Input
                type="text"
                name="searching"
                value={form.searching}
                onChange={handleChange}
              />
            </label>
            <label>
              height
              <Input
                type="text"
                name="height"
                value={form.height}
                onChange={handleChange}
              />
            </label>
            <label>
              weight
              <Input
                type="text"
                name="weight"
                value={form.weight}
                onChange={handleChange}
              />
            </label>
            <label>
              city
              <Input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </label>
            <label>
              country
              <Input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
              />
            </label>
            <label>
              age
              <Input
                type="date"
                name="age"
                value={form.age}
                onChange={handleChange}
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
                  {el.msg}
                </div>
              );
            })}
        </div>
      </Modal>
    </div>
  );
};

export default EditProfile;
