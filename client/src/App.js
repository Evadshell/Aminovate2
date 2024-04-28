import './App.css';
import React from 'react'
import {Routes,Route} from "react-router-dom";
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Nav from './Components/Nav.jsx';
import ConversationalAPI from './Components/ConversationalAPI.jsx';
export default function App() {

  return (
    <div className="App">
      <Nav />
      <div className="app-container">
      <div className="content">
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mathbot' element={<ConversationalAPI />} />

        
        </Routes>
      </div>
    </div>
     
    </div>  
  );
}
