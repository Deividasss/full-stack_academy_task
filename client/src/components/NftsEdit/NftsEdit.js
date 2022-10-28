import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../NftsEdit/NftsEdit.scss"
import { Modal } from 'react-bootstrap';
import MyTimer from "../../utils/Timer/Timer";

export default (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cfForm, setcfForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({ message: "", status: "" });
  const [modal, setModal] = useState(false)
  const price = (cfForm.starting_bid / 1500)
  const [warning, setWarning] = useState(false)

  const time = new Date();
  time.setSeconds(time.getSeconds() + 300000);

  const openModal = () => {
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }
  const openWarning = () => {
    setWarning(true)
  }
  const closeWarning = () => {
    setWarning(false)
  }

  const deleteNfts = () => {
    axios
      .delete(`/api/crowdfunder/delete/` + id)
      .then((resp) => {
        setMessages({ message: resp.data.message, status: resp.data.status });
        if (resp.data.status === "success") {
          setTimeout(() => {
            navigate("/mycrowdfunders");
          }, 1000);
        }
      })
      .catch(() => {
        setMessages({ message: "Server error", status: "danger" });
      });
  }

  useEffect(() => {
    axios
      .get("/api/crowdfunder/single/" + id)
      .then((resp) => {
        console.log(resp);
        setIsLoading(false);

        if (resp.data.status === "success") {
          setcfForm(resp.data.message);
          console.log(cfForm);
        } else {
          navigate("/mycrowdfunders");
        }
      })
      .catch(() => {
        setIsLoading(false);
        setMessages({ message: "Server side error", status: "danger" });
      });
  }, []);

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
    if (!handleValidation()) {
      setMessages({
        message: "NFT editing form filled incorrectly",
        status: "danger",
      });
      return false;
    }
    axios
      .put(`/api/crowdfunder/update/${id}`, cfForm)
      .then((resp) => {
        setMessages({ message: resp.data.message, status: resp.data.status });
        if (resp.data.status === "success") {
          setTimeout(() => {
            navigate("/mycrowdfunders");
          }, 1500);
        }
      })
      .catch(() => {
        setMessages({ message: "Server error", status: "danger" });
      });
  };

  return (
    <>
      <Container className="nftEditMain">
        {isLoading ? (
          "Loading...."
        ) : (
          <>
            <div className="crowdFundEdit">
              <div className="nftInfoMain">
                <img
                  className="nftEditImg"
                  src={"/uploads/" + cfForm.cf_image}
                  alt="image"
                />
                <div className="nftInfo">
                  <h3 className="nftCollection">{cfForm.collection}<img className="collectionImg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/800px-Sign-check-icon.png"></img></h3>
                  <h3 className="nftTitle">{cfForm.title}</h3>
                  <h3 className="nftPrice"><span className="nftPriceLine">Current Price:</span><br></br><span className="nftCripto"><img className="nftPriceImg" src="https://www.iconpacks.net/icons/2/free-cryptocurrency-coin-icon-2422-thumb.png"></img>{price.toFixed(6)} {cfForm.network} <br></br><span className="nftDolers">= {cfForm.starting_bid}$</span></span></h3>
                  <div className="nftBidBuyBtn">
                    <button className="nftBidBtn" onClick={() => alert("You Placed a Bid")}>Place a Bid</button>
                    <button className="nftBuyBtn" onClick={() => alert("Congratulations you purchased NFT")}>Buyout</button>
                  </div>
                </div>
              </div>
              <div className="bidInfo">
                <div className="bidHistory">
                  <h3 className="bidHistoryHeading">Bid History</h3>
                  <div className="noItems">
                    <img className="noItemsImg" src="https://static.thenounproject.com/png/4143644-200.png"></img>
                    <h3 className="noItemsHeading">No items</h3>
                  </div>
                </div>
                <div className="bidOffers">
                  <h3 className="bidOffersHeading">Offers</h3>
                  <div className="noItems">
                    <img className="noItemsImg" src="https://static.thenounproject.com/png/4143644-200.png"></img>
                    <h3 className="noItemsHeading">No items</h3>
                  </div>
                </div>
              </div>
              <div className="description">
                <h3 className="nftDescriptionTitle">Description:</h3>
                <hr className="nftHrLine"></hr>
                <h3 className="nftDescription">{cfForm.description}</h3>
              </div>
              <div className="details">
                <h3 className="nftDetails">Details:</h3>
                <hr></hr>
                <h3 className="nftCreator">Creator:<span className="nftCreatorEmail">{props.email}</span> </h3>
                <h3 className="nftNetwork">Network:<span className="nftNetworkInfo">{cfForm.network}</span></h3>
                <h3 className="nftCollection2">Collection:<span className="nftCollectionInfo">{cfForm.collection}</span></h3>
                <h3 className="timerEnd">Auction ends in:<span className="myTimer"><MyTimer expiryTimestamp={time} /></span></h3>
                <hr></hr>
              </div>
              <div className="nftEditDeleteBtn">
                <button className="nftEditBtn" onClick={openModal}>Edit</button>
                <button className="nftDeleteBtn" onClick={openWarning}>Delete</button>
              </div>
            </div>
          </>
        )}
      </Container>
      <Modal className="itemModal" onHide={closeModal} show={modal} aria-labelledby="contained-modal-title-vcenter" centered>
        <div className="editModal">
          <form className="ui form" onSubmit={handleSubmit}>
            <h3 className="editNftHeading">----- Edit NFT -----</h3>
            <hr></hr>
            <div className="field mb-3">
              {messages.message && (
                <Alert variation={messages.status}>{messages.message}</Alert>
              )}
              <label className="form-label">Name *</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter your Headline"
                value={cfForm.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="field mb-3">
              <label className="form-label">Collection *</label>
              <input
                className="form-control"
                rows="9"
                name="collection"
                value={cfForm.collection}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="field mb-3">
              <label className="form-label">Price *</label>
              <input
                className="form-control"
                rows="9"
                name="starting_bid"
                value={cfForm.starting_bid}
                onChange={handleInputChange}
              ></input>
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
                className="form-control"
                rows="9"
                name="description"
                value={cfForm.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button type="submit" className="editBtn">
              Save Changes
            </button>
          </form>
        </div>
      </Modal>

      <Modal className="itemModal" show={warning} onHide={closeWarning} aria-labelledby="contained-modal-title-vcenter" centered>
        <div className="deleteModal">
          {messages.message && (
            <Alert variation={messages.status}>{messages.message}</Alert>
          )}
          <h3 className="deleteModalHeading">Are you sure you want to delete NFT?</h3>
          <hr></hr>
          <button className="deleteModalBtn" onClick={deleteNfts}>Delete</button>
        </div>
      </Modal>
    </>
  );
};
