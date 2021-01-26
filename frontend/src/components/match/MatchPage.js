import React, { useState, useMemo, useEffect, useRef } from "react";
import Axios from "axios";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import "./MatchPage.css";
const asdf = [
  {
    name: "Richard Hendricks",
    url:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    name: "Erlich Bachman",
    url:
      "https://media.istockphoto.com/photos/man-portrait-side-view-of-young-blond-guy-in-jean-shirt-looking-on-picture-id1139970314?k=6&m=1139970314&s=612x612&w=0&h=6WlQJEXcL3sd0VenePGcquhLFJI4-wQVnC54R4HMqCw=",
  },
  {
    name: "Monica Hall",
    url:
      "https://www.irreverentgent.com/wp-content/uploads/2018/03/Awesome-Profile-Pictures-for-Guys-look-away2.jpg",
  },
];

// const alreadyRemoved = [];
// let charactersState = db; // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function MatchPage() {
  const [db, setDB] = useState([]);
  const alreadyRemoved = [];
  // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState();
  let charactersState = characters;
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: "http://localhost:4000/profiles/allprofiles",
    })
      .then((res) => {
        setDB(res.data);
        setCharacters(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const childRefs = useMemo(
    () =>
      Array(characters.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db]
  );
  console.log(childRefs, "CHILD");
  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    alreadyRemoved.push(nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
    charactersState = charactersState.filter(
      (character) => character.fullname !== name
    );
    setCharacters(charactersState);
  };
  const [msg, setMsg] = useState("");
  const swipe = (dir, index) => {
    console.log(dir, index);
    const msgcopy = [...characters];
    const copy = [...characters];
    copy.splice(index, 1);
    setCharacters(copy);
    setMsg(`${msgcopy[index].fullname} Match request`);
  };
  console.log(characters);
  return (
    <div className="root">
      <h1>{msg}</h1>
      <h1>React Tinder Card</h1>
      <div className="cardContainer">
        {characters.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={index}
            onSwipe={(dir) =>
              swiped(
                dir,
                character.fullname !== undefined ? character.fullname : "Fakme"
              )
            }
            onCardLeftScreen={() =>
              outOfFrame(
                character.fullname !== undefined ? character.fullname : "Fakme"
              )
            }
          >
            <div
              style={{
                backgroundImage:
                  "url(" + character.images.length
                    ? character.images[0]
                    : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png" +
                      ")",
              }}
              className="card"
            >
              <h3>
                {character.fullname !== undefined
                  ? character.fullname
                  : "Fakme"}
              </h3>
              <div className="buttons">
                <button onClick={() => swipe("left", index)}>
                  Swipe left!
                </button>
                <button onClick={() => swipe("right", index)}>
                  Swipe right!
                </button>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get started!
        </h2>
      )}
    </div>
  );
}

export default MatchPage;
