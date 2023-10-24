import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import dress1 from "../picture/dress1.png"
import dress2 from "../picture/dress2.png"
import dress3 from "../picture/dress3.png"
import "./Rent.css";
import { Link } from "react-router-dom";

export default function Rent() {

  const [currentImg, setCurrentImg] = useState(dress2);
  return (
    <div className="rent">
      <Navbar />
      <div className="contentContainer">
        <div className='content'>
          <div className='small-img'>
            <img src={dress1}></img>
            <img src={dress2}></img>
            <img src={dress3}></img>
          </div>
          <div className='big-img'>
            <img src={currentImg}></img>
          </div>

          <div className='detail'>
            <div className='header-detail'>
              <div className="dress-name">VICTORIA BACKHAM</div>
              <div className="dress-detail">description</div>
            </div>
            <div className='price'>
              <div className='border-price'>5,425 $RENT</div>
              <div className='blank'></div>
            </div>
            <div className='dropdown'>
              <select >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className='delivery-details'>
              <div>DELIVERY + RETURN DATE</div>
              <div>
                <input id="4days" type="radio" name="day" value="1" />
                <label for="4days">4 DAYS RENTAL</label>
                <br />
                <input id="8days" type="radio" name="day" />
                <label for="8days">8 DAYS RENTAL</label>
              </div>
              <div>
                <input type="date" />
              </div>
            </div>
            <div className='button-rent'>
              <Link to="/checkout"><button>ADD TO CART</button></Link>
            </div>
            <div className='product-detail'>
              <div className='size'>
                <div>SIZE & FIT</div>
                <div>+</div>
              </div>
              <hr />
              <div className='product'>
                <div>PRODUCT & DETAILS</div>
                <div>+</div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
