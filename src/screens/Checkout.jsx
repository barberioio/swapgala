import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import dress1 from "../picture/dress1.png"
import "./Checkout.css";

export default function Checkout() {
  const [isEditDelivery, setIsEditDelivery] = useState(false);
  const [isEditReturn, setIsEditReturn] = useState(false);

  const editDelivery = () => {
    setIsEditDelivery(!isEditDelivery)
  }

  const editReturn = () => {
    setIsEditReturn(!isEditReturn)
  }

  return (
    <div className="rent">
      <Navbar />
      <div className='rent-container'>
        <div className='delivery'>
          <div className='delivery-box'>
            <div className='delivery-header'> DELIVERY DETAILS </div>
            {isEditDelivery ?
              <div className='edit-detail'>
                <div style={{ marginBottom: 20 + "px" , fontSize: 20 + "px"}}>Edit Adress</div>
                <div className='name'>
                  <div>
                    <div>FIRST NAME</div>
                    <input type="text" />
                  </div>
                  <div>
                    <div>LAST NAME</div>
                    <input type="text" />
                  </div>
                </div>
                <div className='contract'>
                  <div>
                    <div>MOBILE PHONE</div>
                    <input type="text" />
                  </div>
                  <div>
                    <div>EMAIL ADDRESS</div>
                    <input type="text" />
                  </div>
                </div>
                <div className='address'>
                  <div>ADDRESS</div>
                  <input type="text" />
                </div>
                <div className='confirm-button'>
                  <div className='cancel-button' onClick={editDelivery}> CANCEL</div>
                  <div className='save-button' onClick={editDelivery}>SAVE</div>
                </div>
              </div>
              : <div className='detail-container'>
                <div className='delivery-detail'>
                  <div>
                    TAWIRATH TEANKACHART
                  </div>
                  <div className='address'>222 R.Srinawadit</div>
                </div>
                <div className='button' onClick={editDelivery}>
                  <button className='button'>EDIT</button>
                </div>
              </div>
            }
          </div>

          <div className='return-box'>
            <div className='return-header'> RETURN ADDRESS </div>
            {isEditReturn ?
              <div className='edit-detail'>
                <div style={{ marginBottom: 20 + "px" , fontSize: 20 + "px"}}>Edit Adress</div>
                <div className='name'>
                  <div>
                    <div>FIRST NAME</div>
                    <input type="text" />
                  </div>
                  <div>
                    <div>LAST NAME</div>
                    <input type="text" />
                  </div>
                </div>
                <div className='contract'>
                  <div>
                    <div>MOBILE PHONE</div>
                    <input type="text" />
                  </div>
                  <div>
                    <div>EMAIL ADDRESS</div>
                    <input type="text" />
                  </div>
                </div>
                <div className='address'>
                  <div>ADDRESS</div>
                  <input type="text" />
                </div>
                <div className='confirm-button'>
                  <div className='cancel-button' onClick={editReturn}> CANCEL</div>
                  <div className='save-button' onClick={editReturn}>SAVE</div>
                </div>
              </div>
              : <div className='detail-container'>
              <div className='return-detail'>
                <div>
                  TAWIRATH TEANKACHART
                </div>
                <div className='address'>222 R.Srinawadit</div>
              </div>
              <div className='button' onClick={editReturn}>
                <button>EDIT</button>
              </div>
            </div>
            }
            
          </div>

        </div>

        <div className='summary'>
          <div className='summary-header'>SUMMARY</div>
          <div className='underline'></div>
          <div className='summary-box'>
            <div className='summary-container'>
              <img src={dress1} />
              <div className='summary-detail'>
                <div className='header-name'>
                  <div className='summaryName'>VICTORIA</div>
                  <div className='dress-price'>2,000.00 ฿</div>
                </div>
                {/* <div>Asymmetric Cutout Ruched Stretch-Jersey Maxi Dress</div> */}
                <div>Retail Price : 43,300฿</div>
                <div>Size : S</div>
                <div>Arrival : 14/06/23</div>
                <div>Return : 17/06/23</div>
              </div>
              <div className='price-container'>

              </div>
            </div>
            <div >
              <div className="underline" style={{ marginTop: 30 + 'px', marginBottom: 30 + 'px' }}></div>
              <div className="price-detail">
                <div>Rental Rate</div>
                <div>5425.00฿</div>
              </div>
              <div className="price-detail">
                <div>Deposit</div>
                <div>1000.00฿</div>
              </div>
              <div className="price-detail">
                <div>Delivery Fee</div>
                <div>825.00฿</div>
              </div>
              <div className="price-detail">
                <div>VAT</div>
                <div>55.00฿</div>
              </div>
              <div className="price-detail">
                <div>Total Payment</div>
                <div>10005.00฿</div>
              </div>
              <div className="underline" style={{ marginTop: 10 + 'px', marginBottom: 10 + 'px' }}></div>
              <div className="price-detail">
                <div>Total</div>
                <div>7304.75฿</div>
              </div>
            </div>
          </div>
          <div className='rent-button'>RENT</div>
        </div>
      </div>
    </div>
  )
}
