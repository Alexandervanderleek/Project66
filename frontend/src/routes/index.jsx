import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import NavBar from '../components/NavBar'
import Redirect from '../pages/Redirect'

//NavbarLayout
const NavLayout = ({children}) => {
  return (
    <>
      <NavBar></NavBar>
      {children} 
    </>
  )
}

//application routes
const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<NavLayout><Home/></NavLayout>}></Route>
            <Route path='/redirect/:id' element={<Redirect></Redirect>}></Route>
            <Route path="*" element={<NotFound/>} ></Route>
        </Routes>
    </Router>   
  )
}

export default AppRoutes
