import React from "react";
import CvForm from "./components/CvForm";
import CvPreview from "./components/CvPreview";
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Home from "./pages/Home";
import View from "./pages/View";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Panel from "./pages/Panel";
import UpdateCv from "./pages/UpdateCv";
import { ToastContainer, toast } from 'react-toastify';
import "./app.css";
const App = () => {

  return (
    <div className="min-h-screen  flex flex-col   ">
      <Router>
        <Routes>
          <Route path="/make-cv" element={<Home />} />
          <Route path="/view/:cvId" element={<View />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/update-cv/:cvId" element={<UpdateCv />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
