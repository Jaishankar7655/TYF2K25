import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import "./index.css";
import RegistrationForm from "./Components/RegistrationForm";
import Successful from "./Components/Successful";
import PaymnetGateway from "./Components/PaymnetGateway";
import Paymentconfirm from "./Components/Paymentconfirm";
import PaymentSuccess from "./Components/Paymentsuccess";
import Sport from "./Components/Sport";
import Culture from "./Components/Culture";
import Literary from "./Components/Literary";
import Technical from "./Components/Technical";
import Footer from "./Components/Footer";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/Success" element={<Successful />} />
      <Route path="/payment" element={<PaymnetGateway />} />
      <Route path="/Paymentconfirm" element={<Paymentconfirm />} />
      <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
      <Route path="/Technical" element={<Technical />} />
      <Route path="/Literary" element={<Literary />} />
      <Route path="/Culture" element={<Culture />} />
      <Route path="/Sport" element={<Sport />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
