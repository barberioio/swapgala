import React, { useState, useEffect } from "react";
import "./ListItems.css";
import dress1 from "../picture/dress1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

export default function ListItems(props) {
  const addCommas = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div
      className="headerItem"
      style={{
        paddingLeft: "100px",
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "1rem",
      }}
    >
      {_.map(props?.data, (item, index) => (
        <div
          className="itemBox"
          style={{ width: "200px", height: "450px", gridColumn: "span 1" }}
        >
          <Link to={`/rent/${item._id}`}>
            <img
              src={item?.images[0]}
              style={{ objectFit: "cover", width: "100%" }}
            />
          </Link>
          <div className="itemName">{item?.DressName}</div>
          <div className="itemPrice">{`฿ ${addCommas(item?.RetailsPrice)}`}</div>
        </div>
      ))}
    </div>
  );
}
