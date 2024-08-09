import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import NavBar from '../components/NavBar'
import Redirect from '../pages/Redirect'
import Toast from '../components/Toast'
import Stats from '../pages/Stats'
import LandingPage from '../pages/LandingPage'
import { useSelector } from 'react-redux'

//NavbarLayout
const Protected = ({children, redirect}) => {
  
  const user = useSelector((state)=>state.user)
  
  console.log('me')

  if(!user){
    return <Navigate to={redirect} ></Navigate>
  }

  return (
    <>
    {children}
    </>
  )
}

//application routes
const AppRoutes = () => {
  return (
    <div className='min-h-full bg-gray-50'>
    <Router>
      <Toast></Toast>
        <Routes>
            <Route path='/' element={<><NavBar></NavBar><LandingPage/></>}></Route>
            <Route path='/home' element={<Protected redirect={'/'} ><NavBar/><Home/></Protected>}></Route>
            <Route path='/stats' element={<Protected redirect={'/'} ><NavBar/><Stats></Stats></Protected>} ></Route>
            <Route path='/redirect/:id' element={<Redirect></Redirect>}></Route>
            <Route path="*" element={<NotFound/>} ></Route>
        </Routes>
    </Router>   
    </div>
  )
}

export default AppRoutes
