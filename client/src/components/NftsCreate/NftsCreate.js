import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../NftsCreate/NftsCreate.scss";

export default (props) => {
  const UserId = props.UserId;
  const navigate = useNavigate();

  const [cfForm, setcfForm] = useState({
    title: "",
    collection: "",
    starting_bid: "",
    cf_image: "",
    network: "",
    description: "",
    approved: 0,
    success: 0,
    UserId: UserId,
  });

  const [messages, setMessages] = useState({ message: "", status: "" });

  const handleInputChange = (e) => {
    setcfForm({
      ...cfForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = () => {
    for (let index of Object.keys(cfForm)) {
      if (index === "cf_goal" && cfForm[index] < 50) {
        return false;
      }
      if (cfForm[index] === "") {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cfForm);
    if (!handleValidation()) {
      setMessages({
        message: "NFT creation form filled incorrectly",
        status: "danger",
      });
      return false;
    }

    const form = new FormData();
    Object.entries(cfForm).map((data) => {
      form.append(data[0], data[1]);
    });

    axios
      .post("/api/crowdfunder/create", form)
      .then((resp) => {
        setMessages({ message: resp.data.message, status: resp.data.status });
        if (resp.data.status === "success") {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      })
      .catch(() => {
        setMessages({ message: "Server error", status: "danger" });
      });
  };

  return (
    <Container className="createNftMain">
      <div className="crowdFundCreate">
        {messages.message && (
          <Alert variation={messages.status}>{messages.message}</Alert>
        )}
        <h1 className="createNftHeader">Create an NFT</h1>
        <hr></hr>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="createNftForm">
            <div className="field mb-4">
              <label className="form-label">Name *</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="E.g This is a title"
                value={cfForm.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="field mb-3">
              <label className="form-label">Collection *</label>
              <input
                type="text"
                name="collection"
                className="form-control"
                placeholder="Collection"
                value={cfForm.collection}
                onChange={handleInputChange}
              />
            </div>
            <div className="field mb-3">
              <label className="form-label">Price *</label>
              <input
                type="text"
                name="starting_bid"
                className="form-control"
                placeholder="Price"
                value={cfForm.starting_bid}
                onChange={handleInputChange}
              />
            </div>
            <div className="field mb-3">
              <label className="form-label">Import Image, Video or Audio *</label>
              <input
                type="file"
                name="cf_image"
                className="form-control"
                onChange={(e) =>
                  setcfForm({
                    ...cfForm,
                    [e.target.name]: e.target.files[0],
                  })
                }
              />
            </div>
            <div className="field mb-3">
              <label className="form-label">Network *</label>
              <select
                className="form-control"
                rows="3"
                name="network"
                placeholder="Enter Network"
                value={cfForm.network}
                onChange={handleInputChange}
              >
                <option>-</option>
                <option>BSC</option>
                <option>ETH</option>
              </select>
            </div>
            <div className="field mb-3">
              <label className="form-label">Description *</label>
              <textarea
                type="text"
                name="description"
                className="formInput"
                placeholder="Enter a description here"
                value={cfForm.description}
                onChange={handleInputChange}
              />
            </div>

            <button className="createNftBtn2" type="submit">Create</button>
          </div>
        </form>
      </div>
    </Container>
  );
};
