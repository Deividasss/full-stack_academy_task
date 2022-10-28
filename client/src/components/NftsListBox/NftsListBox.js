import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../NftsListBox/NftsListBox.scss"

export default (props) => {
  const date = new Date(props.crowdfunder.createdAt);
  const { starting_bid } = (props)
  const price = (props.crowdfunder.starting_bid / 1500)

  return (
    <>
      <div class="productBox">
        <Link className="boxLink" to={`${props.link}` + props.crowdfunder.id}>
          <div class="product-grid">
            <div class="product-image">
              <a class="image">
                <img
                  className="cf_image pic-1"
                  src={"/uploads/" + props.crowdfunder.cf_image}
                  alt="image"
                />
              </a>
            </div>
            <div class="product-content">
              <h3 className="product-title">{props.crowdfunder.title}</h3>
              <hr className="line"></hr>
              <h3 className="product-collection">{props.crowdfunder.collection}<span className="product-network">{props.crowdfunder.network}</span></h3>
              <h3 className="price"><span className="product-price-cripto"><img className="product-price-img" src="https://www.iconpacks.net/icons/2/free-cryptocurrency-coin-icon-2422-thumb.png"></img>{price.toFixed(3)} {props.crowdfunder.network} <br></br><span className="product-price-dolers">= {props.crowdfunder.starting_bid} $</span></span>Price</h3>
              <small className="text-muted">
                Created: {date.toLocaleDateString("lt-LT")}
              </small>
            </div>
          </div>
        </Link>
      </div>
    </>

  );
};
