import React, { useState } from "react";
import "./Filter.css";
import { Radio, Slider, Button, Modal } from "antd";
const Filters = ({ filterProfiles }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal
  const [filter, setFilter] = useState({
    theyAre: "Male",
    theyLook: "Woman",
    relationshipStatus: "Single",
    ageFrom: 18,
    ageTo: 30,
    heightFrom: 170,
    heightTo: 200,
    weightFrom: 50,
    weightTo: 180,
  });
  const onChangeTheyAre = (e) => {
    console.log(e.target.value);
    setFilter({ ...filter, theyAre: e.target.value });
  };

  const onChangeTheyLook = (e) => {
    console.log(e.target.value);
    setFilter({ ...filter, theyLook: e.target.value });
  };
  const onChangeTheirStatus = (e) => {
    console.log(e.target.value);
    setFilter({ ...filter, relationshipStatus: e.target.value });
  };

  const options = [
    { label: "Male", value: "Male" },
    { label: "Woman", value: "Woman" },
    { label: "Other", value: "Other" },
  ];
  const optionsrelation = [
    { label: "Single", value: "Single" },
    { label: "In relationship", value: "In relationship" },
    { label: "Married", value: "Married" },
    { label: "Other", value: "Other" },
  ];

  //Slider
  const onChangeAge = (e) => {
    console.log(e);
    setFilter({ ...filter, ageFrom: e[0], ageTo: e[1] });
  };
  const onChangeHeight = (e) => {
    console.log(e);
    setFilter({ ...filter, heightFrom: e[0], heightTo: e[1] });
  };
  const onChangeWeight = (e) => {
    console.log(e);
    setFilter({ ...filter, heightFrom: e[0], heightTo: e[1] });
  };
  // MODAL
  const showModal = () => {
    setIsModalVisible(true);
  };

  const submitFilterAndClose = () => {
    filterProfiles(filter);
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.log(filter);
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Select Filters
      </Button>
      <Modal
        title="Please check all fields!"
        visible={isModalVisible}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
      >
        <div className="filtersGroup">
          <p>Choose profiles genre</p>
          <Radio.Group
            options={options}
            onChange={onChangeTheyAre}
            value={filter.theyAre}
            optionType="button"
          />
          <p>They are in to?</p>
          <Radio.Group
            options={options}
            onChange={onChangeTheyLook}
            value={filter.theyLook}
            optionType="button"
          />
          <p>Their relationship status?</p>
          <Radio.Group
            options={optionsrelation}
            onChange={onChangeTheirStatus}
            value={filter.relationshipStatus}
            optionType="button"
          />
          <p>Age Range</p>
          <Slider
            min={18}
            range
            defaultValue={[filter.ageFrom, filter.ageTo]}
            onChange={onChangeAge}
          />
          <p>Height Range(cm) </p>
          <Slider
            max={200}
            min={150}
            range={true}
            defaultValue={[filter.heightFrom, filter.heightTo]}
            onChange={onChangeHeight}
          />
          <p>Weight Range(kg)</p>
          <Slider
            max={200}
            min={40}
            range={true}
            defaultValue={[filter.weightFrom, filter.weightTo]}
            onChange={onChangeWeight}
          />
          <Button type="primary" onClick={submitFilterAndClose}>
            Submit Filters
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Filters;
