import React from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import LoginFirebase from './Components/LoginFirebase';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/loginsignup' element={<LoginFirebase/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;