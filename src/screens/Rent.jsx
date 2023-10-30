import React, { Component, useState, useEffect } from "react";
import { useFormContext } from "../context/form-context";
import * as yup from "yup";

import Navbar from "../components/Navbar";
import dress1 from "../picture/dress1.png";
import dress2 from "../picture/dress2.png";
import dress3 from "../picture/dress3.png";
import "./Rent.css";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import dayjs from "dayjs";

export default function Rent(props) {
  const [currentImg, setCurrentImg] = useState(dress2);
  const [catalogDetail, setCatalogDetail] = useState(null);
  const [mainImage, setMainImage] = useState(catalogDetail?.images[0]);
  const [rentalDay, setRentalDay] = useState(0);
  const { assume_id } = useParams();
  const { id } = useParams();
  const { formData, dispatch } = useFormContext();

  const [dressSize, setDressSize] = useState("");
  const [dressRentalDate, setDressRentalDate] = useState(formData?.rentalDate);
  const [dressReturnDate, setDressReturnDate] = useState("");
  const [dressCarts, setDressCarts] = useState(null);

  const { carts, confirm, totalDays, rentalDate, returnDate, size } = formData;
  const [FitVisible, setFitVisible] = useState(true);
  const toggleMore = () => {
    setFitVisible(!FitVisible);
  };

  const fetchData = async () => {
    try {
      const response1 = await axios.get(`http://localhost:3000/dress/${id}`);
      setCatalogDetail(response1.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handdlePrice = () => {
    if (rentalDay === 4) {
      return catalogDetail?.PriceForRent4Days;
    } else if (rentalDay === 8) {
      return catalogDetail?.PriceForRent8Days;
    } else {
      return catalogDetail?.RetailsPrice;
    }
  };
  const handleFormSubmit = () => {
    // Update the form data using dispatch
    const updatedFormData = {
      carts: [
        ...formData.carts, // Spread the existing carts array
        {
          url: catalogDetail?.images[0],
          dressName: catalogDetail?.DressName,
          price: handdlePrice(),
          pickDate: dressRentalDate,
          returnDate: dressReturnDate,
          size: dressSize,
          depositPerItem: (catalogDetail?.RetailsPrice / 100) * 20,
        },
      ],
      confirm: true,
      totalDays: "",
      rentalDate: dayjs().format("YYYY-MM-DD"),
      returnDate: "",
      size: "",
    };

    dispatch({
      type: "updateFormData",
      payload: updatedFormData,
    });
  };

  const checkAddtoCart = () => {
    if (dressSize !== "" && dressRentalDate !== "" && dressReturnDate !== "")
      return { css: "button-rent", canClick: true };
    else {
      return { css: "button-disable", canClick: false };
    }
  };

  const addCommas = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="rent">
      <Navbar />
      <div className="contentContainer">
        <div className="content">
          <div className="small-img">
            {_.map(catalogDetail?.images, (image, index) => (
              <div
                key={index}
                onClick={() => {
                  setMainImage(image);
                }}
              >
                <img src={image} />
              </div>
            ))}
          </div>
          <div className="big-img">
            <img src={mainImage || catalogDetail?.images[0]}></img>
          </div>

          <div className="detail">
            <div className="header-detail">
              <div className="dress-name">{catalogDetail?.DressName}</div>
            </div>
            <div className="price">
              <div className="border-price">{`${addCommas(
                handdlePrice()
              )}฿ RENT`}</div>
              <div className="blank"></div>
            </div>
            <div className="dropdown">
              <select
                value={dressSize}
                onChange={(e) => {
                  setDressSize(e.target?.value);
                }}
              >
                <option value="" disabled>
                  Choose a size
                </option>
                {_.map(catalogDetail?.size, (item, index) => (
                  <option key={`size_${index}`} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="delivery-details">
              <div>DELIVERY + RETURN DATE</div>
              <div>
                <input
                  id="4days"
                  type="radio"
                  name="day"
                  onClick={() => {
                    setRentalDay(4);
                    let returnDate = dayjs(formData?.rentalDate).add(4, "day");
                    setDressReturnDate(returnDate);
                  }}
                />
                <label for="4days">4 DAYS RENTAL</label>
                <br />
                <input
                  id="8days"
                  type="radio"
                  name="day"
                  onClick={() => {
                    setRentalDay(8);
                    let returnDate = dayjs(formData?.rentalDate).add(8, "day");
                    setDressReturnDate(returnDate);
                  }}
                />
                <label for="8days">8 DAYS RENTAL</label>
              </div>
              <div>
                <input
                  type="date"
                  value={dressRentalDate}
                  onChange={(v) => {
                    setDressRentalDate(v.target.value);
                  }}
                />
              </div>
            </div>
            <div className={checkAddtoCart().css}>
              <button
                onClick={() => {
                  if (checkAddtoCart().canClick) {
                    handleFormSubmit();
                  }
                }}
              >
                ADD TO CART
              </button>
            </div>
            <div className="product-detail">
              <div className="size">
                <div>FIT</div>
                <div onClick={toggleMore}>+</div>
              </div>
              {FitVisible && (
                <div>
                  -{catalogDetail?.Fit?.bust} <br></br>-
                  {catalogDetail?.Fit?.waist}
                  <br></br>-{catalogDetail?.Fit?.hips}
                  <br></br>-{catalogDetail?.Fit?.undergarments}
                  <br></br>-{catalogDetail?.Fit?.fabric}
                  <br></br>-{catalogDetail?.Fit?.length}
                  <br></br>-{catalogDetail?.Fit?.greatFor}
                </div>
              )}

              <hr />
              <div className="product">
                <div>PRODUCT & DETAILS</div>
                <div>+</div>
              </div>
              <div>{catalogDetail?.Details}</div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
