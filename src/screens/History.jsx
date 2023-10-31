import React, { useState, useEffect } from "react";
import "./History.css";
import Navbar from "../components/Navbar";
import dress1 from "../picture/dress1.png";
import axios from "axios";

function History() {
  const [me, setMe] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("authToken");
      if (token) {
        const me = await axios.get("http://localhost:3000/user", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const history = await axios.get(`http://localhost:3000/order/${me?.data.id}`, {
          withCredentials: true,
        });
        console.log(me?.data.id)
        setMe();
      } else {
        console.error("Token not found in local storage.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="history">
      <Navbar />
      <div>
        <h1
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: "200px",
            textAlign: "center",
            fontSize: "40px",
            padding: "2%",
            color: "#404040",
          }}
        >
          HISTORY
        </h1>

        <div className="history-container">
          <div style={{ display: "flex" }}>
            <img src={dress1} style={{ width: "80px" }} />
            <div className="history-detail">
              <div>VICTORIA BACKHAM</div>
              <div style={{ marginTop: "20px" }}>Size: </div>
              <div>Arrival: </div>
              <div>Return: </div>
            </div>
          </div>

          <div className="history-price">
            <div>5,425.00 ฿</div>
            <div className="history-button-container">
              <div
                className="button-history"
                style={{ backgroundColor: "#F1B660" }}
              >
                received
              </div>
              <div
                className="button-history"
                style={{ backgroundColor: "#B3B3B3", marginLeft: "20px" }}
              >
                return
              </div>
            </div>
          </div>
        </div>
        <div className="underline-history"></div>
      </div>
    </div>
  );
}

export default History;
