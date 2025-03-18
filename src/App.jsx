import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Import Pages
import Home from "./pages/homePage";
import CultureHistory from "./pages/cultureHistory";
import GalleryPage from "./pages/galleryPage";
import NotFound from "./pages/notFound";
import ContactUs from "./pages/contactUs";
import JoinUs from "./pages/joinUs";
import Signin from "./pages/signin";
import Register from "./pages/register";
import ForgetPassword from "./pages/forgetPassword";

import ScrollToTop from "./scrollToTop";
import PageWrapper from "./components/loading/pageWrapper";

const App = () => {
  return (
    <Router>
      <ScrollToTop/>
      <PageWrapper/>
      <Routes>
        <Route path='/' element ={<Home/>}></Route>
        <Route path='/Culture-History' element ={<CultureHistory/>}></Route>
        <Route path='/Gallery' element ={<GalleryPage/>}></Route>
        <Route path='/contactUs' element ={<ContactUs/>}></Route>
        <Route path='/joinUs' element ={<JoinUs/>}></Route>
        <Route path='/signIn' element ={<Signin/>}></Route>
        <Route path='/register' element ={<Register/>}></Route>
        <Route path='/forgetpassword' element ={<ForgetPassword/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
