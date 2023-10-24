import React, { useState } from 'react'
import './Navbar.css'
import swapgala2 from '../picture/swapgala2.png';
import cart from '../picture/cart.png'
import user from '../picture/user.png'
import dress1 from "../picture/dress1.png"
import { Link, useRoutes } from "react-router-dom"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen)
  }
  const toggleUser = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="navbar">
      <div className='userContainer'>
        <div className='icon'>
          <img src={user} ></img>
        </div>
        <div className='icon'>
          <img src={cart} onClick={toggleCart}></img>
          {isOpen ?
            <div className='cart-list'>
              <div className='item'>
                <div className='item-img'>
                  <img src={dress1}></img>
                </div>
                <div className='item-detail'>
                  <div className='item-name'>VICTORIA</div>
                  <div className='item-size'>Size: S</div>
                  <div className='item-price'>Price: 5234 ฿</div>
                  <div className='item-pickup'>Pickup Date: 12/12/12</div>
                  <div className='item-return'>Return Date: 12/12/12</div>
                </div>
              </div>
              <hr />
              <div className='item'>
                <div className='item-img'>
                  <img src={dress1}></img>
                </div>
                <div className='item-detail'>
                  <div className='item-name'>VICTORIA</div>
                  <div className='item-size'>Size: S</div>
                  <div className='item-price'>Price: 5234 ฿</div>
                  <div className='item-pickup'>Pickup Date: 12/12/12</div>
                  <div className='item-return'>Return Date: 12/12/12</div>
                </div>

              </div>
              <Link to="/checkout"><div className='button-checkout'>CHECKOUT</div></Link>

            </div> : null
          }

        </div>
      </div>
      <a href="/" style={{textDecoration:"none"}}><div className='header'>
        <div className='next'>SWAPGALA</div>
        <img src={swapgala2} />
      
      </div></a>

      <div className='menu-bar'>
        <Link to="/catalog"><a class="active" href="#home">SALE</a></Link>
        <Link to="/catalog"><a href="#new">NEW ARRIVALS</a></Link>
        <Link to="/catalog"><a href="#clothing">CLOTHING</a></Link>
        <Link to="/catalog"><a href="#men">MENSWEAR</a></Link>
        <Link to="/catalog"><a href="#occasion">OCCASION</a></Link>
        <Link to="/catalog"><a href="#lookbook">LOOKBOOK</a></Link>

      </div>

    </div>
  )
}