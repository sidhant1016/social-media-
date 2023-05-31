import './App.css';
import Register from './Component/Register';
import Homepage from "./pages/Homepage"
// import Register from './Component/Register';
import Login from './Component/Login';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import React from 'react';


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element = {<Homepage/>}/>
    <Route path="/register" element = {<Register/>}/>
    <Route path="/login" element = {<Login/>}/>
    
   
 
    </Routes>
    
   
    </BrowserRouter>
    
  );
}

export default App;