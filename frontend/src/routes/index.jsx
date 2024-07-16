import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import Temp from '../pages/Temp'

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/home' element={<Temp/>} ></Route>
            <Route path="*" element={<NotFound/>} ></Route>
        </Routes>
    </Router>   
  )
}

export default AppRoutes
