import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/homePage";
import CultureHistory from "./pages/cultureHistory";
import GalleryPage from "./pages/galleryPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element ={<Home/>}></Route>
        <Route path='/culture-history' element ={<CultureHistory/>}></Route>
        <Route path='/gallery' element ={<GalleryPage/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
