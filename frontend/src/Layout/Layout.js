import React, { useEffect, useState } from "react";
import "./Layout.css";
import Myprofile from "../components/user/Myprofile";
import { Link } from "react-router-dom";
import EditProfile from "../components/user/EditProfile";
import Login from "../components/user/Login";
import Axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux"; //REDUX
import { useHistory } from "react-router-dom";
import Notifications from "./Notifications";
//ANT
import {
  HomeOutlined,
  MessageOutlined,
  FireOutlined,
  UsergroupAddOutlined,
  MenuOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
const Layout = (props) => {
  const getcookie = Number(Cookies.get("token"));
  const dispatch = useDispatch(); // REDUX
  const isLoged = useSelector((state) => state.AmiLogged); // REDUX
  const reTrigger = useSelector((state) => state.toggleTriggerFetchs); // REDUX
  const history = useHistory(); // ROUTER
  const [open, setOpen] = useState(false); //TOGGLE

  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `https://dateappeldate.herokuapp.com/getcookie`,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "CHECK_IF_LOGGED_IN", action: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reTrigger, dispatch]);
  ////

  ///Gives me my Profile Stats
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `https://dateappeldate.herokuapp.com/users/getuser`,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "FETCH_MY_PROFILE",
            action: res.data.profile,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getcookie, reTrigger, dispatch]);
  //Gets my COnversations
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `https://dateappeldate.herokuapp.com/chat/getmyconversations`,
    })
      .then((res) => {
        // setMyMessages(res.data);
        dispatch({ type: "FETCH_MY_CONVERSATIONS", action: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, getcookie, reTrigger]);
  //
  const logout = () => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: "https://dateappeldate.herokuapp.com/users/logout",
    }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: "RESET_PROFILE",
        });
        dispatch({
          type: "CHECK_IF_LOGGED_IN",
          action: false,
        });
        dispatch({
          type: "RE_TRIGGER",
        });
        Cookies.remove("token");
        history.push("/");
      }
    });
  };
  const closeNav = () => {
    setOpen(!open);
  };
  return (
    <div className="LayoutBackgorund">
      <div className="btnToggle" onClick={() => setOpen(!open)}>
        {open ? <CloseCircleOutlined /> : <MenuOutlined />}
      </div>
      <div className="transperantBackground">
        <div
          className={"leftMenu"}
          style={
            window.innerWidth <= 768 ? { display: open ? "flex" : "none" } : {}
          }
        >
          {isLoged ? (
            <div>
              <Myprofile />
              <Notifications closeNav={closeNav} />
            </div>
          ) : (
            <Login closeNav={closeNav} />
          )}

          <div className="Menu">
            <nav>
              <ul className="navigator">
                <Link
                  onClick={() => setOpen(!open)}
                  style={{
                    color: "white",
                  }}
                  to="/"
                >
                  <HomeOutlined />
                  Home
                </Link>
                <Link
                  onClick={() => setOpen(!open)}
                  style={{
                    color: "white",
                  }}
                  to="/allprofiles"
                >
                  <UsergroupAddOutlined />
                  Profiles
                </Link>
                <Link
                  onClick={() => setOpen(!open)}
                  style={{
                    color: "white",
                  }}
                  to="/matchme"
                >
                  <FireOutlined />
                  Match
                </Link>
                <Link
                  onClick={() => setOpen(!open)}
                  style={{
                    color: "white",
                  }}
                  to="/mymessages"
                >
                  <MessageOutlined />
                  Messages
                </Link>
              </ul>
            </nav>
          </div>
          {isLoged && (
            <div>
              <EditProfile />
              <p style={{ marginTop: "0" }} onClick={logout} className="logout">
                Sign Out
              </p>
            </div>
          )}
        </div>
        <div className="rightMenu">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
