import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { FaRegUser } from 'react-icons/fa';

export default (props) => {
  const navigate = useNavigate();

  const onLogout = () => {
    axios
      .get("/api/users/logout")
      .then(() => {
        props.handleLoginState(false);
        navigate("/");
      })
      .catch((e) => {
        console.log("Server is offline");
      });
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="headerLogo" src="https://www.presentconnection.eu/wp-content/themes/present-connection-2020/assets/icons/pc-logo-orange-white.svg" alt="logo" />
      </Link>
      {props.loggedIn === true && props.userRole === 0 && (
        <Link className="personalNftsBtn" to="/myCrowdfunders">
          Your Personal NFTs
        </Link>
      )}
      {props.loggedIn === true && props.userRole === 0 && (
        <Link className="createNftBtn" to="/createCrowdFounding">
          Create NFT
        </Link>
      )}
      <div className="headerInfo">
        <div class="dropdown">
          <div className="dropdownInfo">
            <a class="dropBtn"><FaRegUser /></a>
            {props.email && <div className="helloUser">Sveiki, <br></br><strong className="userEmail">{props.email}</strong></div>}
          </div>
          <div class="dropdown-content">
            <hr></hr>
            {props.loggedIn === false && (
              <Link className="loginBtn" to="/login">
                Log-In
              </Link>
            )}
            {props.loggedIn === true && (
              <button
                onClick={onLogout}
                style={{ border: "none" }}
                className="logoutBtn"
                to="/"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};
