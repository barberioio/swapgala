import React from "react";
import "./Filters.css";
import black from "../picture/black.png";
import gray from "../picture/gray.png";
import white from "../picture/white.png";
import egg from "../picture/egg.png";
import brown from "../picture/brown.png";
import red from "../picture/red.png";
import orange from "../picture/orange.png";
import yellow from "../picture/yellow.png";
import green from "../picture/green.png";
import blue from "../picture/blue.png";
import darkblue from "../picture/darkblue.png";
import purple from "../picture/purple.png";
import pink from "../picture/pink.png";
import gold from "../picture/gold.png";
import silver from "../picture/silver.png";

export default function Filters(props) {
  const haddleFileter = (value, type) => {
    props?.onClick(value,type);
  };
  return (
    <div className="filterCatalog">
      <div className="headFilter">
        <div>Clothing / All</div>
      </div>

      <div className="filter">
        FILTERS
        <div className="underlineCatalog"></div>
        <div className="topic">SIZE</div>
        <div className="sizeFilter">
          <a
            onClick={() => {
              haddleFileter("2XS", "SIZE");
            }}
          >
            2XS
          </a>
          <a
            onClick={() => {
              haddleFileter("XS", "SIZE");
            }}
          >
            XS
          </a>
          <a
            onClick={() => {
              haddleFileter("S", "SIZE");
            }}
          >
            S
          </a>
          <a
            onClick={() => {
              haddleFileter("M", "SIZE");
            }}
          >
            M
          </a>
          <a
            onClick={() => {
              haddleFileter("L", "SIZE");
            }}
          >
            L
          </a>
          <a
            onClick={() => {
              haddleFileter("XL", "SIZE");
            }}
          >
            XL
          </a>
          <a
            onClick={() => {
              haddleFileter("2XL", "SIZE");
            }}
          >
            2XL
          </a>
          <a
            onClick={() => {
              haddleFileter("3XL", "SIZE");
            }}
          >
            3XL
          </a>
          <a
            onClick={() => {
              haddleFileter("F", "SIZE");
            }}
          >
            F
          </a>
        </div>
        <div className="underlineCatalog"></div>
        <div className="columnPrice">PRICE</div>
        <div className="min-price">
          <div>MIN.</div>
        </div>
        <input
          type="number"
          className="minMargin"
          placeholder="BAHT"
          onChange={(e) => {
            haddleFileter(e.target.value, "MINPRICE");
          }}
        />
        <p></p>
        <div className="max-price">
          <div>MAX.</div>
        </div>
        <input
          type="number"
          className="maxMargin"
          placeholder="฿ 10000"
          onChange={(e) => {
            haddleFileter(e.target.value, "MAXPRICE");
          }}
        />
        <div className="underlineCatalog"></div>
        <div className="topic">COLOR</div>
        <div className="colorFilter">
          <a
            onClick={() => {
              haddleFileter("black", "COLOR");
            }}
          >
            <img src={black}></img>
          </a>
          <a
            
            onClick={() => {
              haddleFileter("gray", "COLOR");
            }}
          >
            <img src={gray}></img>
          </a>
          <a
            
            onClick={() => {
              haddleFileter("white", "COLOR");
            }}
          >
            <img src={white}></img>
          </a>
          <a
           
            onClick={() => {
              haddleFileter("egg", "COLOR");
            }}
          >
            <img src={egg}></img>
          </a>
          <a
            
            onClick={() => {
              haddleFileter("brown", "COLOR");
            }}
          >
            <img src={brown}></img>
          </a>
          <a
          
            onClick={() => {
              haddleFileter("red", "COLOR");
            }}
          >
            <img src={red}></img>
          </a>
          <a
     
            onClick={() => {
              haddleFileter("orange", "COLOR");
            }}
          >
            <img src={orange}></img>
          </a>
          <a
            
            onClick={() => {
              haddleFileter("yellow", "COLOR");
            }}
          >
            <img src={yellow}></img>
          </a>
          <a
       
            onClick={() => {
              haddleFileter("green", "COLOR");
            }}
          >
            <img src={green}></img>
          </a>
          <a
   
            onClick={() => {
              haddleFileter("blue", "COLOR");
            }}
          >
            <img src={blue}></img>
          </a>
          <a
        
            onClick={() => {
              haddleFileter("darkblue", "COLOR");
            }}
          >
            <img src={darkblue}></img>
          </a>
          <a
           
            onClick={() => {
              haddleFileter("purple", "COLOR");
            }}
          >
            <img src={purple}></img>
          </a>
          <a
           
            onClick={() => {
              haddleFileter("pink", "COLOR");
            }}
          >
            <img src={pink}></img>
          </a>
          <a
          
            onClick={() => {
              haddleFileter("gold", "COLOR");
            }}
          >
            <img src={gold}></img>
          </a>
          <a
           
            onClick={() => {
              haddleFileter("silver", "COLOR");
            }}
          >
            <img src={silver}></img>
          </a>
        </div>
        <div className="underlineCatalog"></div>
        <div className="topicOccasion">OCCASION</div>
        <div className="occasion">
          <p>
            <input type="checkbox" />
            <div
              className="occasionType"
              onClick={() => {
                haddleFileter("BIRTHDAY PARTY", "OCCASION");
              }}
            >
              BIRTHDAY PARTY
            </div>
          </p>
          <p>
            <input type="checkbox" />
            <div
              className="occasionType"
              onClick={() => {
                haddleFileter("DATE NIGHT", "OCCASION");
              }}
            >
              DATE NIGHT
            </div>
          </p>
          <p>
            <input type="checkbox" />
            <div
              className="occasionType"
              onClick={() => {
                haddleFileter("GRADUATION", "OCCASION");
              }}
            >
              GRADUATION
            </div>
          </p>
          <p>
            <input type="checkbox" />
            <div
              className="occasionType"
              onClick={() => {
                haddleFileter("BEACH HOLIDAY", "OCCASION");
              }}
            >
              BEACH HOLIDAY
            </div>
          </p>
          <p>
            <input type="checkbox" />
            <div
              className="occasionType"
              onClick={() => {
                haddleFileter("EVERYDAY OUTFITS", "OCCASION");
              }}
            >
              EVERYDAY OUTFITS
            </div>
          </p>
          <p>
            <input type="checkbox" />
            <div
              className="occasionType"
              onClick={() => {
                haddleFileter("WEDDING", "OCCASION");
              }}
            >
              WEDDING
            </div>
          </p>
          <p>
            <input type="checkbox" />
            <div
              className="occasionType"
              onClick={() => {
                haddleFileter("NIGHT CLUB", "OCCASION");
              }}
            >
              NIGHT CLUB
            </div>
          </p>
          <p>
            <input type="checkbox" />
            <div
              className="occasionType"
              onClick={() => {
                haddleFileter("PROM", "OCCASION");
              }}
            >
              PROM
            </div>
          </p>
          <p>
            <input type="checkbox" />
            <div
              className="occasionType"
              onClick={() => {
                haddleFileter("GALA DINNER", "OCCASION");
              }}
            >
              GALA DINNER
            </div>
          </p>
          <p>
            <input type="checkbox" />
            <div
              className="occasionType"
              onClick={() => {
                haddleFileter("OVERSEAS TRIP", "OCCASION");
              }}
            >
              OVERSEAS TRIP
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}
