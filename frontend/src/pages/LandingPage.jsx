import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function LandingPage() {
  

  console.log("landing page")

    const user = useSelector(({user}) => {
        return user
    });
  

    if(user){
        return <Navigate to='/home' ></Navigate>
    }

  return (
    <div>
      Landing
    </div>
  )
}

export default LandingPage