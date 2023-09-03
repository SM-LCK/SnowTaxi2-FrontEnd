import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmailcheckPage from "./pages/EmailcheckPage";
import SignupPage from "./pages/SignupPage";
import TaxiRouteListPage from "./pages/TaxiRouteListPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element = {<Header/>}/> */}
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Emailcheck" element={<EmailcheckPage />} />
      <Route path="/Signup" element={<SignupPage />} />
      <Route path="/" element={<TaxiRouteListPage />} />
    </Routes>
  );
}

export default App;
