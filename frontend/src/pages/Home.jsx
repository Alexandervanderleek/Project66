import React from 'react'
import axios from 'axios'

const Home = () => {
  
  const handleLogin = () => {
    // axios.get('http://localhost:3000/login/google').then((res)=>{
    //   console.log(res);
    // }).catch((err)=>{
    //   console.log(err)
    // })

    //window.location.href = 'http://localhost:3000/oauth2/login/google';
    console.log("called")

    
    const popup = window.open('http://localhost:3000/oauth2/login/google',"popup",`width=500,height=600`)
    
    setInterval(()=>{
      
      if(popup.window.location.href.includes('home')){popup.close()}
      if(!popup || popup.closed) return;
      clearInterval();
      
    },1000)

  }
  
  return (
    <div>
      Welcome Home

      <button onClick={handleLogin}>
        <div className='bg-red-300'>
          Login With Google
        </div>
      </button>

    </div>
  )
}

export default Home
