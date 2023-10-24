import React from "react";
import './ListItems.css'
import dress1 from "../picture/dress1.png"
import { Link } from 'react-router-dom';

export default function ListItems() {
    return (
        <div className="headerItem">

            <div className="itemBox">
            <Link to="/rent"><a href=""><img src={dress1}></img></a></Link>
                <div className="itemName">Wedding</div>
                <div className="itemPrice">฿ 1,000.00</div>
            </div>

            <div className="itemBox">
                <Link to="/rent"><a href=""><img src={dress1}></img></a></Link>
                <div className="itemName">Wedding</div>
                <div className="itemPrice">฿ 1,000.00</div>
            </div>

            <div className="itemBox">
            <Link to="/rent"><a href=""><img src={dress1}></img></a></Link>
                <div className="itemName">Wedding</div>
                <div className="itemPrice">฿ 1,000.00</div>
            </div>

            <div className="itemBox">
            <Link to="/rent"><a href=""><img src={dress1}></img></a></Link>
                <div className="itemName">Wedding</div>
                <div className="itemPrice">฿ 1,000.00</div>
            </div>

            <div className="itemBox">
            <Link to="/rent"><a href=""><img src={dress1}></img></a></Link>
                <div className="itemName">Wedding</div>
                <div className="itemPrice">฿ 1,000.00</div>
            </div>
            
            <div className="itemBox">
            <Link to="/rent"><a href=""><img src={dress1}></img></a></Link>
                <div className="itemName">Wedding</div>
                <div className="itemPrice">฿ 1,000.00</div>
            </div>

        </div>
    )
}

