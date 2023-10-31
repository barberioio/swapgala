import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FormProvider } from "./context/form-context";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Catalog from "./screens/Catalog";
import History from "./screens/History";
import Rent from "./screens/Rent";
import Checkout from "./screens/Checkout";
import Navbar from "./components/Navbar";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";

function App() {
  return (
    <Router>
      <FormProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/rent/:id" element={<Rent />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={null} />
        </Routes>
      </FormProvider>
    </Router>
  );
}

export default App;
