import React, { useState } from "react";
import "./Navbar.css";
import { useFormContext } from "../context/form-context";
import swapgala2 from "../picture/swapgala2.png";
import cart from "../picture/cart.png";
import user from "../picture/user.png";
import dress1 from "../picture/dress1.png";
import { Link } from "react-router-dom";
import _ from "lodash";
import dayjs from "dayjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = window.location.pathname;
  console.log("Current Path: " + currentPath);
  const { formData, dispatch } = useFormContext();

  const { carts, confirm, totalDays, rentalDate, returnDate, size } = formData;

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  const toggleUser = () => {
    setIsOpen(!isOpen);
  };
  const addCommas = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="navbar">
      <div className="userContainer">
        <div className="icon">
          <div class="custom-select">
            {isOpen ? (
              <div className="user-history">
                <div className="box-history"></div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="icon" style={{ position: "relative" }}>
          {_.size(formData.carts) > 0 && (
            <div
              style={{
                left: "18px",
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "18px",
                height: "18px",
                fontSize: "12px",
                color: "white",
                borderRadius: "100px",
                backgroundColor: "red",
              }}
            >
              {_.size(formData.carts)}
            </div>
          )}

          <img style={{paddingTop:"10px"}}src={cart} onClick={toggleCart}></img>
          {isOpen && _.size(formData.carts) > 0 ? (
            <div className="cart-list">
              {_.map(formData.carts, (item, index) => (
                <div className="item">
                  <div className="item-img">
                    <img src={item?.url}></img>
                  </div>
                  <div className="item-detail">
                    <div className="item-name">{item?.dressName}</div>
                    <div className="item-size">Size: {item?.size}</div>
                    <div className="item-price">
                      Price: {addCommas(item?.price)} ฿
                    </div>
                    <div className="item-pickup">
                      Pickup Date: {dayjs(item?.pickDate).format("YYYY-MM-DD")}
                    </div>
                    <div className="item-return">
                      Return Date:{" "}
                      {dayjs(item?.returnDate).format("YYYY-MM-DD")}
                    </div>
                  </div>
                </div>
              ))}
              <hr />

              <Link to="/checkout">
                <div className="button-checkout">CHECKOUT</div>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <a href="/" style={{ textDecoration: "none" }}>
        <div className="header">
          <div className="next">SWAPGALA</div>
          <img src={swapgala2} />
        </div>
      </a>

      <div className="menu-bar">
        <Link to="/catalog">
          <a class={currentPath === "/catalog" && "active"} href="#home">
            NEW ARRIVAL
          </a>
        </Link>

        <Link to="/history">
          <a class={currentPath === "/history" && "active"} href="#lookbook">
            RENTAL HISTORY
          </a>
        </Link>
      </div>
    </div>
  );
}
