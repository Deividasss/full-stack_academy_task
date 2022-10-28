import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import NftsListBox from "../NftsListBox/NftsListBox"
import Alert from "react-bootstrap/Alert";
import "../MyNfts/MyNfts.scss"
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';

export default (props) => {
  const [crowdFund, setCrowdFund] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({ message: "", status: "" });
  const [noCrowdfunders, setNoCrowdfunder] = useState(true);
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`/api/crowdfunder/user/${props.UserId}`)
      .then((resp) => {
        console.log(resp);
        setIsLoading(false);

        if (resp.data.status === "success") {
          setCrowdFund(resp.data.message);
          console.log(resp.data.message);
        }

        if (crowdFund.length < 1) {
          setNoCrowdfunder(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setMessages({ message: "Server error", status: "danger" });
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const List = () => {
    if (crowdFund.length < 1) {
      return (
        <div className="myNfts">
          <h3 className="myNftsNull">No NFTs created</h3>
          <button className="myNftsNullBtn" onClick={() => navigate("/createCrowdFounding")}>
            <strong>Create NFTs!</strong>
          </button>
        </div>
      );
    } else {
      return (
        <div className="row justify-content-center">
          {crowdFund.filter(nfts => nfts.collection.toLowerCase().includes(search)).map((value, index) => {
            return (
              <NftsListBox
                key={index}
                setMessages={setMessages}
                crowdfunder={value}
                link="/mycrowdfunder/"
              />
            );
          })
          }
        </div>
      )
    }
  };
  return (
    <Container className="myNftsMain">
      <h1 className="myNftsheader">----- My NFTs -----</h1>
      <Form className="searchForm">
        <input
          onChange={handleChange}
          placeholder="Search collections..."
          className='search'
          type='search'
        >
        </input>
        <FaSearch className="faSearch" />
      </Form>
      <hr className="myNftsLine"></hr>
      {messages.message && (
        <Alert variation={messages.status}>{messages.message}</Alert>
      )}
      {isLoading ? (
        "Loading"
      ) : (
        <div className="container">
          <List />
        </div>
      )}
    </Container>
  );
};
