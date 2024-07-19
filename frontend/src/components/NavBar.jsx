import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { debounce } from 'lodash' 
function NavBar() {

    const [isScrolled, setIsScrolled] = useState(false)

    const handleLogin = () => {        
        const popup =  window.open('http://localhost:3000/oauth2/login/google',"popup",`width=500,height=600`)
        
        setInterval(()=>{
          
          if(popup.window.location.href.includes('redirect')){
                popup.close();
                getAuthUser();
            }
          if(!popup || popup.closed) return;
          clearInterval();
          
        },500)
    }

    //vite intercepts since sees it has /api
    const getAuthUser = () => {
        console.log("auth user")
        axios.get('/api/user',{withCredentials: true}).then((res)=>{
            console.log(res.data);
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }

    useEffect(() => {
        const handleScroll = debounce(() => {
            setIsScrolled(window.scrollY > 0)
        }, 5) 

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

  return (
        <div className={`navbar bg-base-100 sticky top-0 z-10 justify-center ${isScrolled?'border-b-black border-b-2':''}`}>
            <div className="flex-1 max-w-4xl justify-between my-2 mx-auto">
                <h3>Project 66</h3>
                <button onClick={handleLogin} className="btn btn-neutral">Login</button>
            </div>        
        </div>
  )
}

export default NavBar
