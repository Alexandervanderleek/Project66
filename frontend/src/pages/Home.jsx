import React, { useEffect } from 'react'
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
      
      if(popup.window.location.href.includes('redirect')){popup.close()}
      if(!popup || popup.closed) return;
      clearInterval();
      
    },500)

  }
  

  useEffect(()=>{
    console.log(document.cookie);
  },[])


  return (
    <div>
      Welcome Home

      <div className=''>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsum est ad incidunt dicta ullam eveniet, qui saepe eaque eum nam, doloribus, quisquam quos numquam earum! Dignissimos optio ducimus ut.

        </div>

      <div className='bg-red-300 h-full'>
          Login With Google
        </div>

    </div>
  )
}

export default Home
