import React from "react";
import CvForm from "./components/CvForm";
import CvPreview from "./components/CvPreview";
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Home from "./pages/MakeCv";
import View from "./pages/View";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Panel from "./pages/Panel";
import UpdateCv from "./pages/UpdateCv";
import { ToastContainer, toast } from 'react-toastify';
import PrivateRoute from "./components/PrivateRoute";
import MakeCv from "./pages/MakeCv";


const App = () => {

  return (
    <div className="min-h-screen  flex flex-col   ">
      <Router>
        <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/panel' element={ <Panel />} />
          <Route path="/make-cv" element={<MakeCv />} />
          <Route path="/view/:cvId" element={<View />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/update-cv/:cvId" element={<UpdateCv />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

          <Route path="/" element={<SignUp />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
