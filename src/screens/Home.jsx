import React from "react";
import "./Home.css";
import { Link, useRoutes } from "react-router-dom";
import swapgala from "../picture/swapgala.png";
import Navbar from "../components/Navbar";
import wedding from "../picture/wedding.png";
import beach from "../picture/beach.png";
import trip from "../picture/trip.png";
import night from "../picture/night.png";
import birthday from "../picture/birthday.png";

import gala from "../picture/gala.png";
import everyday from "../picture/everyday.png";
import graduation from "../picture/graduation.png";
import dinner from "../picture/dinner.png";
import prom from "../picture/prom.png";
function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="headHome">
        <div>RENT A DRESS FOR YOUR SPECIAL OCCASION</div>
      </div>

      <div className="occasion">
        <div className="container">
          <a href="">
            <Link to="/catalog?occasion=WEDDING">
              <div className="itemOccasion">
                <div className="itemImage">
                  <div className="imageContainer">
                    <img src={wedding}></img>
                  </div>
                </div>
                <div className="textContainer">
                  <div className="occasionTitle">
                    <h3>WEDDING</h3>
                  </div>
                </div>
              </div>
            </Link>
          </a>

          <a href="">
            <Link to="/catalog?occasion=BEACH HOLIDAY">
              <div className="itemOccasion">
                <div className="itemImage">
                  <div className="imageContainer">
                    <img src={beach}></img>
                  </div>
                </div>
                <div className="textContainer">
                  <div className="occasionTitle">
                    <h3>BEACH HOLIDAY</h3>
                  </div>
                </div>
              </div>
            </Link>
          </a>

          <a href="">
            <Link to="/catalog?occasion=OVERSEAS TRIP">
              <div className="itemOccasion">
                <div className="itemImage">
                  <div className="imageContainer">
                    <img src={trip}></img>
                  </div>
                </div>
                <div className="textContainer">
                  <div className="occasionTitle">
                    <h3>OVERSEAS TRIP</h3>
                  </div>
                </div>
              </div>
            </Link>
          </a>

          <a href="">
            <Link to="/catalog?occasion=NIGHT CLUB">
              <div className="itemOccasion">
                <div className="itemImage">
                  <div className="imageContainer">
                    <img src={night}></img>
                  </div>
                </div>
                <div className="textContainer">
                  {" "}
                  <div className="occasionTitle">
                    <h3>NIGHT CLUB</h3>
                  </div>
                </div>
              </div>
            </Link>
          </a>

          <a href="">
            <Link to="/catalog?occasion=BIRTHDAY">
              <div className="itemOccasion">
                <div className="itemImage">
                  <div className="imageContainer">
                    <img src={birthday}></img>
                  </div>
                </div>
                <div className="textContainer">
                  <div className="occasionTitle">
                    <h3>BIRTHDAY</h3>
                  </div>
                </div>
              </div>
            </Link>
          </a>
        </div>
      </div>

      <div className="occasion2">
        <div className="container">
          <a href="">
            <Link to="/catalog?occasion=DATE NIGHT">
              <div className="itemOccasion">
                <div className="itemImage">
                  <div className="imageContainer">
                    <img src={dinner}></img>
                  </div>
                </div>
                <div className="textContainer">
                  <div className="occasionTitle">
                    <h3>DATE NIGHT</h3>
                  </div>
                </div>
              </div>
            </Link>
          </a>

          <a href="">
            <Link to="/catalog?occasion=GRADUATION">
              <div className="itemOccasion">
                <div className="itemImage">
                  <div className="imageContainer">
                    <img src={graduation}></img>
                  </div>
                </div>
                <div className="textContainer">
                  <div className="occasionTitle">
                    <h3>GRADUATION</h3>
                  </div>
                </div>
              </div>
            </Link>
          </a>

          <a href="">
            <Link to="/catalog?occasion=EVERYDAY">
              <div className="itemOccasion">
                <div className="itemImage">
                  <div className="imageContainer">
                    <img src={everyday}></img>
                  </div>
                </div>
                <div className="textContainer">
                  <div className="occasionTitle">
                    <h3>EVERYDAY</h3>
                  </div>
                </div>
              </div>
            </Link>
          </a>

          <a href="">
            <Link to="/catalog?occasion=PROM">
              <div className="itemOccasion">
                <div className="itemImage">
                  <div className="imageContainer">
                    <img src={prom}></img>
                  </div>
                </div>
                <div className="textContainer">
                  {" "}
                  <div className="occasionTitle">
                    <h3>PROM</h3>
                  </div>
                </div>
              </div>
            </Link>
          </a>

          <a href="">
            <Link to="/catalog?occasion=GALA DINNER">
              <div className="itemOccasion">
                <div className="itemImage">
                  <div className="imageContainer">
                    <img src={gala}></img>
                  </div>
                </div>
                <div className="textContainer">
                  <div className="occasionTitle">
                    <h3>GALA DINNER</h3>
                  </div>
                </div>
              </div>
            </Link>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
