import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Chat from "../messages/Chat";

const SingleProfile = () => {
  const params = useParams();
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/profiles/allprofiles/${params.id}`,
    })
      .then((res) => {
        console.log(res);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);
  console.log(profile, "profzjjjjjjjjjjjj");
  if (!profile.length) return <h1>Loading...</h1>;
  else
    return (
      <div>
        <h1>Single PRofile</h1>

        <p>{profile[0].fullname}</p>
        <p>{profile[0].nickname}</p>
        <Chat sendTo={profile[0].userlog_id} />
      </div>
    );
};

export default SingleProfile;
