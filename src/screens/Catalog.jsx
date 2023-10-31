import React, { Component, useState, useEffect } from "react";
import "./Catalog.css";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import ListItems from "../components/ListItems";
import chat from "../picture/chat.png";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import toggle from "../picture/toggle.png";
import send from "../picture/send.png";

function Catalog() {
  const [isOpen, setIsOpen] = useState(false);
  const cors = require('cors');
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  const [catalogList, setCatalogList] = useState([]);
  const [data2, setData2] = useState([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [color, setColor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [size, setSize] = useState("");
  const location = useLocation();
  const occasionParams = new URLSearchParams(location.search).get("occasion");
  const [occasion, setOccasion] = useState(occasionParams || "");

  useEffect(() => {
    fetchData();
  }, [size, minPrice, maxPrice, color, occasion]);

  const fetchData = async () => {
    try {
      const params = {
        minPrice: minPrice,
        maxPrice: maxPrice,
        color: color,
        occasion: occasion,
        size: size,
      };
      const response1 = await axios.get("http://localhost:3000/dress", {
        params: params,
        withCredentials: true,
      });
      setCatalogList(response1.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handdleFilter = (data, type) => {
    if (type === "SIZE") {
      setSize(data);
    } else if (type === "MINPRICE") {
      setMinPrice(data);
    } else if (type === "MAXPRICE") {
      setMaxPrice(data);
    } else if (type === "MAXPRICE") {
      setMaxPrice(data);
    } else if (type === "COLOR") {
      setColor(data.toUpperCase());
    } else if (type === "OCCASION") {
      setOccasion(data);
    }
    fetchData();
  };

  return (
    <div className="catalog">
      <Navbar />
      <div className="catalogContainer">
        <div className="itemCatalog">
          <Filters
            onClick={(data, type) => {
              handdleFilter(data, type);
            }}
          />
          <ListItems data={catalogList} />
        </div>
      </div>

      <div className="open-button" onClick={toggleChat}>
        <img style={{width:"40px" , height:"37px" }} src={chat} />
        {isOpen ? (
          <div className="chatbot" >
            <div className="headchat" style={{display:"flex",justifyContent:"space-between",padding:"15px 15px 10px 15px "}}>
              <div >
                SWAPGALA 
              </div>
              <div className="closeToggle" onClick={toggleChat}>
                  <img src={toggle}></img>
                </div>
            </div>
            <div className="box-chat" style={{ width:"100%",overflowY:"scroll"}}>
              <div className="user1" style={{backgroundColor:"white" , width: "100px" , height:"50px"}}></div>
              <div className="user1"></div>
            </div>
            <div style={{display:"flex",width:"100%",height: "11%"}}>
            <div className="reply">dwlklk</div><img style={{width:"25px", height:"25px",marginLeft:"8px", marginTop:"10px"}} src={send}></img></div>
          </div>
        ) : null}
      </div>
      <p></p>
      <p></p>
      <br></br>
    </div>
  );
}

export default Catalog;
