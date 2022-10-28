import React from "react";
import { useState } from "react";
import "./Registration.scss";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

export default () => {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: 0,
  });
  const [messages, setMessages] = useState({ message: "", status: "" });

  const handleInputChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      setMessages({
        message: "Form was filled out incorrectly",
        status: "danger",
      });
      return false;
    }

    if (registerForm.password !== registerForm.confirm_password) {
      setMessages({ message: "Password do not match", status: "danger" });
      return false;
    }

    axios
      .post("/api/users/register", registerForm)
      .then((resp) => {
        setMessages({ message: resp.data.message, status: resp.data.status });
        if (resp.data.status === "success") {
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      })
      .catch(() => {
        setMessages({ message: "Server error", status: "danger" });
      });
  };

  const handleValidation = () => {
    for (let index of Object.keys(registerForm)) {
      if (registerForm[index] === "") {
        return false;
      }
    }

    return true;
  };
  return (
    <>
      <section class="h-90">
        <div class="container registerMain">
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col">
              <div class="card cardMain">
                <div class="row g-0 formBackground">
                  <div class="col-lg-6 d-none d-md-block">
                    <img src="https://ipfs.pixura.io/ipfs/QmZMEp9HnW56LPWNXPKC293RtBXp4RD7N3A1eApg4rr5ju/PrideII.jpg"
                      alt="Sample photo" class="img-fluid" />
                  </div>
                  <div class="col-xl-6">
                    <div class="card-body p-md-5 text-black">
                      {messages.message && (
                        <Alert variation={messages.status}>{messages.message}</Alert>
                      )}
                      <div className="registrationLogo">
                        <img className="registrationLogoImg" src="https://www.presentconnection.eu/wp-content/themes/present-connection-2020/assets/icons/pc-logo-orange-white.svg"></img>
                      </div>
                      <h5 className="signInHeading">Register new account</h5>
                      <hr></hr>
                      <form onSubmit={handleSubmit} className="formMain">
                        <div class="row">
                          <div class="col-md-6 mb-4">
                            <div class="form-outline">
                              <input
                                name="first_name"
                                value={registerForm.first_name}
                                onChange={handleInputChange}
                                type="text"
                                class="form-control form-control-lg" />
                              <label class="form-label" for="form3Example1m">First name</label>
                            </div>
                          </div>
                          <div class="col-md-6 mb-4">
                            <div class="form-outline">
                              <input
                                name="last_name"
                                value={registerForm.last_name}
                                onChange={handleInputChange}
                                type="text"
                                class="form-control form-control-lg" />
                              <label class="form-label" for="form3Example1n">Last name</label>
                            </div>
                          </div>
                        </div>
                        <div class="form-outline mb-4">
                          <input
                            name="email"
                            value={registerForm.email}
                            onChange={handleInputChange}
                            type="email"
                            class="form-control form-control-lg" />
                          <label class="form-label" for="form3Example8">Email address</label>
                        </div>
                        <div class="form-outline mb-4">
                          <input
                            name="password"
                            value={registerForm.password}
                            onChange={handleInputChange}
                            type="password"
                            class="form-control form-control-lg" />
                          <label class="form-label" for="form3Example9">Password</label>
                        </div>
                        <div class="form-outline mb-4">
                          <input
                            name="confirm_password"
                            value={registerForm.confirm_password}
                            onChange={handleInputChange}
                            type="password"
                            class="form-control form-control-lg" />
                          <label class="form-label" for="form3Example90">Confirm Password</label>
                        </div>
                        <div class="pt-1 mb-4">
                          <button type="submit" className="registrationFormBtn">REGISTER</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
