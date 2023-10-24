import React from 'react'
import './Home.css'
import swapgala from '../picture/swapgala.png';
import Navbar from '../components/Navbar';
import wedding from '../picture/wedding.png'
import beach from '../picture/beach.png'
import trip from '../picture/trip.png'
import night from '../picture/night.png'
import birthday from '../picture/birthday.png'

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
                        <div className="itemOccasion">
                            <div className="itemImage">
                                <div className="imageContainer"><img src={wedding}></img></div>

                            </div>
                            <div className="textContainer">
                                <div className="occasionTitle">
                                    <h3>WEDDING</h3>
                                </div>
                            </div>
                        </div>
                    </a>


                    <a href="">
                        <div className="itemOccasion">
                            <div className="itemImage">
                                <div className="imageContainer"><img src={beach}></img></div>

                            </div>
                            <div className="textContainer"><div className="occasionTitle">
                                <h3>BEACH HOLIDAY</h3>
                            </div></div>

                        </div>
                    </a>

                    <a href="">
                        <div className="itemOccasion">
                            <div className="itemImage">
                                <div className="imageContainer"><img src={trip}></img></div>

                            </div>
                            <div className="textContainer">
                                <div className="occasionTitle">
                                    <h3>OVERSEAS TRIP</h3>
                                </div>
                            </div>
                        </div>
                    </a>


                    <a href="">
                        <div className="itemOccasion">
                            <div className="itemImage">
                                <div className="imageContainer"><img src={night}></img></div>

                            </div>
                            <div className="textContainer">  <div className="occasionTitle">
                                <h3>NIGHT CLUB</h3>
                            </div></div>

                        </div>
                    </a>

                    <a href="">
                        <div className="itemOccasion">
                            <div className="itemImage">
                                <div className="imageContainer"><img src={birthday}></img></div>

                            </div>
                            <div className="textContainer">  <div className="occasionTitle">
                                <h3>BIRTHDAY</h3>
                            </div></div>

                        </div>
                    </a>

                    <button className="viewbutton">VIEW MORE</button>
                </div>

            </div>
        </div>
    )
}

export default Home