import React, { useState } from "react";
import Navbar from "../components/Navbar";
import dress1 from "../picture/dress1.png";
import "./Checkout.css";
import { useFormContext } from "../context/form-context";
import _ from "lodash";
import dayjs from "dayjs";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [isEditDelivery, setIsEditDelivery] = useState(false);
  const [isEditReturn, setIsEditReturn] = useState(false);
  const { formData, dispatch } = useFormContext();
  const navigate = useNavigate(); 
  const { carts, confirm, totalDays, rentalDate, returnDate, size } = formData;

  const editDelivery = () => {
    setIsEditDelivery(!isEditDelivery);
  };

  const editReturn = () => {
    setIsEditReturn(!isEditReturn);
  };

  const handleFormSubmit = () => {
    // Perform any necessary form data updates before submission
    // ...

    // Dispatch an action to indicate the form submission
    dispatch({ type: "submitForm" });
    handleRent()
  };

  const addCommas = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const totalPrice = () => {
    const total = (
      _.sumBy(formData?.carts, "price") +
      _.sumBy(formData?.carts, "depositPerItem") +
      (_.sumBy(formData?.carts, "price") / 100) * 7
    ).toFixed(2);

    // Use the addCommas function to format the total with commas
    const formattedTotal = addCommas(total);

    return formattedTotal;
  };

  const handleRent = async () => {
    try {
      const response = await axios.post('http://localhost:3000/rent', {
        items: formData.carts,
        addressOrder: null,
      }, {
        withCredentials: true,
      });
      
      navigate('/');

    } catch (error) {
      console.error('Order failed:', error);
    }
  };

  return (
    <div className="rent">
      <Navbar />
      <div className="rent-container">
        <div className="delivery">
          <div className="delivery-box">
            <div className="delivery-header"> DELIVERY DETAILS </div>
            {isEditDelivery ? (
              <div className="edit-detail">
                <div style={{ marginBottom: 20 + "px", fontSize: 20 + "px" }}>
                  Edit Adress
                </div>
                <div className="name">
                  <div>
                    <div>FIRST NAME</div>
                    <input type="text" />
                  </div>
                  <div>
                    <div>LAST NAME</div>
                    <input type="text" />
                  </div>
                </div>
                <div className="contract">
                  <div>
                    <div>MOBILE PHONE</div>
                    <input type="text" />
                  </div>
                  <div>
                    <div>EMAIL ADDRESS</div>
                    <input type="text" />
                  </div>
                </div>
                <div className="address">
                  <div>ADDRESS</div>
                  <input type="text" />
                </div>
                <div className="confirm-button">
                  <div className="cancel-button" onClick={editDelivery}>
                    {" "}
                    CANCEL
                  </div>
                  <div className="save-button" onClick={editDelivery}>
                    SAVE
                  </div>
                </div>
              </div>
            ) : (
              <div className="detail-container">
                <div className="delivery-detail">
                  <div>TAWIRATH TEANKACHART</div>
                  <div className="address">222 R.Srinawadit</div>
                </div>
                <div className="button" onClick={editDelivery}>
                  <button className="button">EDIT</button>
                </div>
              </div>
            )}
          </div>

          <div className="return-box">
            <div className="return-header"> RETURN ADDRESS </div>
            {isEditReturn ? (
              <div className="edit-detail">
                <div style={{ marginBottom: 20 + "px", fontSize: 20 + "px" }}>
                  Edit Adress
                </div>
                <div className="name">
                  <div>
                    <div>FIRST NAME</div>
                    <input type="text" />
                  </div>
                  <div>
                    <div>LAST NAME</div>
                    <input type="text" />
                  </div>
                </div>
                <div className="contract">
                  <div>
                    <div>MOBILE PHONE</div>
                    <input type="text" />
                  </div>
                  <div>
                    <div>EMAIL ADDRESS</div>
                    <input type="text" />
                  </div>
                </div>
                <div className="address">
                  <div>ADDRESS</div>
                  <input type="text" />
                </div>
                <div className="confirm-button">
                  <div className="cancel-button" onClick={editReturn}>
                    {" "}
                    CANCEL
                  </div>
                  <div className="save-button" onClick={editReturn}>
                    SAVE
                  </div>
                </div>
              </div>
            ) : (
              <div className="detail-container">
                <div className="return-detail">
                  <div>TAWIRATH TEANKACHART</div>
                  <div className="address">222 R.Srinawadit</div>
                </div>
                <div className="button" onClick={editReturn}>
                  <button>EDIT</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="summary">
          <div className="summary-header">SUMMARY</div>
          <div className="underline"></div>
          <div className="summary-box">
            {_.map(formData?.carts, (item, index) => (
              <div className="summary-container">
                <img src={item?.url} />
                <div className="summary-detail">
                  <div className="header-name">
                    <div className="summaryName">{item?.dressName}</div>
                    <div className="dress-price">
                      {addCommas(item?.price)} ฿
                    </div>
                  </div>
                  <div>Size : {item?.size}</div>
                  <div>
                    Arrival : {dayjs(item?.pickDate).format("YYYY/MM/DD")}
                  </div>
                  <div>
                    Return : {dayjs(item?.returnDate).format("YYYY/MM/DD")}
                  </div>
                </div>
                <div className="price-container"></div>
              </div>
            ))}

            <div>
              <div
                className="underline"
                style={{ marginTop: 30 + "px", marginBottom: 30 + "px" }}
              ></div>
              <div className="price-detail">
                <div>Rental Rate</div>
                <div>{_.sumBy(formData?.carts, "price").toLocaleString()}฿</div>
              </div>
              <div className="price-detail">
                <div>Deposit</div>
                <div>
                  {_.sumBy(formData?.carts, "depositPerItem").toLocaleString()}฿
                </div>
              </div>
              <div className="price-detail">
                <div>VAT</div>
                <div>
                  {addCommas(
                    ((_.sumBy(formData?.carts, "price") / 100) * 7).toFixed(2)
                  )}
                  ฿
                </div>
              </div>

              <div
                className="underline"
                style={{ marginTop: 10 + "px", marginBottom: 10 + "px" }}
              ></div>
              <div className="price-detail">
                <div>Total</div>
                <div>{totalPrice()}฿</div>
              </div>
            </div>
          </div>

          <div className="rent-button" onClick={handleFormSubmit}>
            RENT
          </div>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
}
