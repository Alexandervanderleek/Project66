import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { debounce } from 'lodash' 
import { useDispatch, useSelector } from 'react-redux'
import { createUser, destroyUser } from '../reducers/userReducer'


function NavBar() {

    
    const [isScrolled, setIsScrolled] = useState(false);

    const dispath = useDispatch();

    const user = useSelector(({user}) => {
        return user
    });



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

    const handleLogout = () => {
        console.log("logout")
        axios.get('/api/user/logout').then((
            dispath(destroyUser())
        )).catch((err)=>{
            console.log("could not log out")
        })
    }

    //vite intercepts since sees it has /api
    const getAuthUser = () => {
        console.log("auth user")
        axios.get('/api/user',{withCredentials: true}).then((res)=>{
            dispath(createUser(res.data))
        }).catch((err)=>{
            console.log("could not")
        })
    }

    useEffect(() => {
        const handleScroll = debounce(() => {
            setIsScrolled(window.scrollY > 0)
        }, 5) 

        window.addEventListener('scroll', handleScroll)

        getAuthUser();

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    

  return (
        <div className={`navbar bg-base-100 sticky top-0 z-10 justify-center ${isScrolled?'border-b-black border-b-2':''}`}>
            <div className="flex-1 max-w-4xl justify-between my-2 mx-8">
                <h3>Project 66</h3>
                
                    {user ? (
                        <>
                            <div className="avatar dropdown">
                                <div 
                                    className="w-12 rounded-full cursor-pointer" 
                                    role="button" 
                                    aria-haspopup="menu" 
                                    aria-expanded="false"
                                    tabIndex="0">
                                    <img src={user.picture} alt="User avatar" />
                                </div>
                                <ul 
                                    className="menu dropdown-content bg-base-100 rounded-box z-[1] w-36 p-2 shadow" 
                                    role="menu"
                                >
                                    <li role="none">
                                    <button 
                                        onClick={handleLogout} 
                                        className="text-red-500 font-bold w-full text-left" 
                                        role="menuitem"
                                    >
                                        Sign out
                                    </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ): (
                        <button onClick={handleLogin} className="btn btn-neutral">Login</button>
                    )}
            </div>        
        </div>
  )
}

export default NavBar
