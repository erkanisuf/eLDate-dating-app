import React, { useState, useMemo, useEffect } from "react";
import Axios from "axios";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import "./MatchPage.css";
import { Button, Alert, Spin } from "antd";
import {
  HeartTwoTone,
  FrownOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import moment from "moment"; // moment
function MatchPage() {
  const [db, setDB] = useState([]);

  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState(); //Right or Left
  const [msg, setMsg] = useState(""); // Name of profile

  const [retrigger, setReTrigger] = useState(false);
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: "https://dateappeldate.herokuapp.com/matches/profiles",
    })
      .then((res) => {
        setDB(res.data);
        setCharacters(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, [retrigger]);

  const insertInMatches = (param) => {
    Axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        shown_user: param,
      },
      withCredentials: true,
      url: "https://dateappeldate.herokuapp.com/matches/insertmatch",
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const childRefs = useMemo(
    () =>
      Array(characters.length)
        .fill(0)
        .map((i) => React.createRef()),
    [characters.length]
  );
  const swiped = (direction, name) => {
    setLastDirection(direction);
    if (direction === "right") setMsg(`${name} Match request`);
  };

  const outOfFrame = (userlog_id, index) => {
    insertInMatches(userlog_id);
    const copy = [...characters];
    copy.splice(index, 1);
    setCharacters(copy);
  };

  const swipe = (dir, index) => {
    setLastDirection(dir);

    const msgcopy = [...characters];
    const copy = [...characters];
    copy.splice(index, 1);
    setCharacters(copy);
    insertInMatches(msgcopy[index].userlog_id);
    if (dir === "right") setMsg(`${msgcopy[index].fullname} Match request`);
  };

  if (!characters.length) {
    return <Spin size="large" />;
  } else if (childRefs.length <= 1) {
    return (
      <h1>
        Press here to start!
        <Button onClick={() => setReTrigger(!retrigger)}>Start Again</Button>
      </h1>
    );
  }
  return (
    <div className="root">
      <div className="cardContainer">
        {characters.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={index}
            onSwipe={(dir) => swiped(dir, character.fullname, index)}
            onCardLeftScreen={() => outOfFrame(character.userlog_id, index)}
          >
            <div
              style={{
                backgroundImage: `url(${
                  character.images.length
                    ? character.images[0]
                    : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                })`,
              }}
              className="card"
            >
              <h3 style={{ width: "100%", fontSize: "15px" }}>
                {character.fullname},
                {moment(character.age, "YYYYMMDD").fromNow(true)},
                {character.sex}
              </h3>
            </div>
            <div className="buttons">
              <Button
                className="swipeLeft"
                onClick={() => swipe("left", index)}
              >
                <FrownOutlined
                  onClick={() => swipe("left", index)}
                  style={{
                    fontSize: window.innerWidth <= 768 ? "15px" : "50px",
                  }}
                />
                NOT
              </Button>
              <Button
                className="swipeRight"
                onClick={() => swipe("right", index)}
              >
                <HeartTwoTone
                  onClick={() => swipe("right", index)}
                  style={{
                    fontSize: window.innerWidth <= 768 ? "15px" : "50px",
                  }}
                  spin={true}
                  twoToneColor="#f1bcd9"
                />
                MATCH!
              </Button>
            </div>
          </TinderCard>
        ))}
      </div>
      <div
        style={{
          width: "100%",
          margin: "50px auto",
          padding: "25px",
          marginTop: window.innerWidth <= 768 ? "80px" : "",
        }}
      >
        {lastDirection ? (
          lastDirection === "right" ? (
            <div>
              <Alert message={`${msg} :)`} type={"success"} showIcon />
            </div>
          ) : (
            <Alert message={`Not match :(`} type={"error"} showIcon />
          )
        ) : (
          <h2 className="infoText">
            Swipe a card or press a button to get started!
          </h2>
        )}
      </div>
      <Button
        icon={<PlayCircleOutlined />}
        className="startmatchAgain"
        onClick={() => window.location.reload()}
      >
        {" "}
        Start matching from beginning?
      </Button>
    </div>
  );
}

export default MatchPage;
