import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAccount from "./pages/create-account/create-account";
import WithAccount from "./pages/with-account/with-account";
import CardUser from "./pages/card-user/card-user";
import Home from "./pages/home/home";
import ForgotPassword from "./pages/forgot-password/forgot-password";
import NewPassword from "./pages/new-password/new-password";
import ValidCode from "./pages/valid-code/valid-code";
import NewCodice from './pages/new-codice/new-codice';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/home" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/with-account" element={<WithAccount />} />
        <Route path="/card-user" element={<CardUser />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/valid-code" element={<ValidCode />} />
        <Route path="/new-codice" element={<NewCodice />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export default App;
