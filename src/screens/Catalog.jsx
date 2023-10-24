import React, { Component, useState, useEffect } from 'react';
import './Catalog.css'
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import ListItems from '../components/ListItems';
import chat from '../picture/chat.png'
import axios from 'axios';


function Catalog() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response1 = await axios.get('https://api.example.com/data1');
          setData1(response1.data);
  
          const response2 = await axios.get('https://api.example.com/data2');
          setData2(response2.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
    return (
        <div className="catalog">
            <Navbar />
            <div className='catalogContainer'>
                <div className='itemCatalog'>
                    <Filters />
                    <ListItems />
                </div>
            </div>

            <div className='open-button'>
  
          <img src={chat} onClick={toggleChat}></img>
          { isOpen ? 
          <div className='chatbot'>
            <div className='item'>

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
              <div className='item-detail'>
                <div className='item-name'>VICTORIA</div>
                <div className='item-size'>Size: S</div>
                <div className='item-price'>Price: 5234 ฿</div>
                <div className='item-pickup'>Pickup Date: 12/12/12</div>
                <div className='item-return'>Return Date: 12/12/12</div>
              </div>
              
            </div>
            
          </div> : null
          }
      
        
        </div>
           
        </div>
        
        
    )

}

export default Catalog

