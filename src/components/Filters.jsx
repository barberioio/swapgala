import React from 'react'
import './Filters.css'
import Navbar from './Navbar';
import black from '../picture/black.png';
import gray from '../picture/gray.png';
import white from '../picture/white.png';
import egg from '../picture/egg.png';
import brown from '../picture/brown.png';
import red from '../picture/red.png';
import orange from '../picture/orange.png';
import yellow from '../picture/yellow.png';
import green from '../picture/green.png';
import blue from '../picture/blue.png';
import darkblue from '../picture/darkblue.png';
import purple from '../picture/purple.png';
import pink from '../picture/pink.png';
import gold from '../picture/gold.png';
import silver from '../picture/silver.png';

export default function Filters() {
    return (
        <div className="filterCatalog">
            <div className="headFilter">
                <div>Clothing / All</div>
            </div>

            <div className='filter'>FILTERS
                <div className='underlineCatalog'></div>
                <div className='topic'>SIZE</div>
                <div className='sizeFilter'>
                    <a href=''>2XS</a>
                    <a href=''>XS</a>
                    <a href=''>S</a>
                    <a href=''>M</a>
                    <a href=''>L</a>
                    <a href=''>XL</a>
                    <a href=''>2XL</a>
                    <a href=''>3XL</a>
                    <a href=''>F</a>
                </div>
                <div className='underlineCatalog'></div>

                <div className='columnPrice'>PRICE</div>
                <div className="min-price">
                    <div>MIN.</div>
                </div>
                <input className="minMargin" placeholder='BAHT' />
                <p></p>
                <div className="max-price">
                    <div>MAX.</div>
                </div>
                <input className="maxMargin" placeholder="฿ 10000" />

                <div className='underlineCatalog'></div>
                <div className='topic'>COLOR</div>
                <div className='colorFilter'>
                    <a href='black'><img src={black}></img></a>
                    <a href='gray'><img src={gray}></img></a>
                    <a href='white'><img src={white}></img></a>
                    <a href='egg'><img src={egg}></img></a>
                    <a href='brown'><img src={brown}></img></a>
                    <a href='red'><img src={red}></img></a>
                    <a href='orange'><img src={orange}></img></a>
                    <a href='yellow'><img src={yellow}></img></a>
                    <a href='green'><img src={green}></img></a>
                    <a href='blue'><img src={blue}></img></a>
                    <a href='darkblue'><img src={darkblue}></img></a>
                    <a href='purple'><img src={purple}></img></a>
                    <a href='pink'><img src={pink}></img></a>
                    <a href='gold'><img src={gold}></img></a>
                    <a href='silver'><img src={silver}></img></a>

                </div>
                <div className='underlineCatalog'></div>
                <div className='topicOccasion'>OCCASION</div>
                <div className='occasion'>
                    <p>
                        <input type="checkbox" />
                        <div className='occasionType'> BIRTHDAY PARTY</div>
                    </p>
                    <p>
                        <input type="checkbox" />
                        <div className='occasionType'> DATE NIGHT</div>
                    </p>
                    <p>
                        <input type="checkbox" />
                        <div className='occasionType'> GRADUATION</div>
                    </p>
                    <p>
                        <input type="checkbox" />
                        <div className='occasionType'> BEACH HOLIDAY</div>
                    </p>
                    <p>
                        <input type="checkbox" />
                        <div className='occasionType'> EVERYDAY OUTFITS</div>
                    </p>
                    <p>
                        <input type="checkbox" />
                        <div className='occasionType'> WEDDING</div>
                    </p>
                    <p>
                        <input type="checkbox" />
                        <div className='occasionType'> NIGHT CLUB</div>
                    </p>
                    <p>
                        <input type="checkbox" />
                        <div className='occasionType'> PROM</div>
                    </p>
                    <p>
                        <input type="checkbox" />
                        <div className='occasionType'> GALA DINNER</div>
                    </p>
                    <p>
                        <input type="checkbox" />
                        <div className='occasionType'> OVERSEAS TRIP</div>
                    </p>
                    <p></p>
                    <p></p>
                </div>
            </div>
          
        </div>

    )

}


