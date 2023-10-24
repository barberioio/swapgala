import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';
import Catalog from './screens/Catalog';
import Rent from './screens/Rent';
import Checkout from './screens/Checkout';
import Navbar from './components/Navbar';


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/rent" element={<Rent />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={null} />
            </Routes>
        </Router>
    );
}

export default App;
