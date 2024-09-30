// src/services/app.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/login'; 
import Calendario from '../components/calendario'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/calendario" element={<Calendario />} /> 
      </Routes>
    </Router>
  );
};

export default App;
