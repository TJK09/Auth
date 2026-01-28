import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Navbar from './Pages/Navbar';
import Dashboard from './Pages/Dashboard';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
