import React, { useEffect, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { createUser, destroyUser } from "../reducers/userReducer";
import { clearHabbits } from "../reducers/habbitsReducer";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  let isScrolled = false;

  const scrollDiv = useRef(null);

  const location = useLocation().pathname;

  const dispath = useDispatch();

  const user = useSelector(({ user }) => {
    return user;
  });

  //function to handle login
  const handleLogin = () => {
    const popup = window.open(
      "http://localhost:3000/oauth2/login/google",
      "popup",
      `width=500,height=600`
    );

    //check for success or failure redirect
    let interval = setInterval(() => {
      if (!popup.closed) return;
      console.log("getting auth user");  
      getAuthUser();
      return clearInterval(interval);
      
      //if (!popup || popup.closed) return;
      //
    }, 500);
  };

  function clearStore(payload) {
    dispath(clearHabbits());
    dispath(destroyUser());
  }

  //function to logout
  const handleLogout = () => {
    axios
      .get("/api/user/logout")
      .then(
        //remove user client side
        clearStore()
      )
      .catch((err) => {
        dispath(showToast({
          message: err.message,
          type: 'error'
        }));
      });
  };

  //gets the authenticated user from server
  const getAuthUser = () => {
    console.log("getting user")
    axios
      .get("/api/user", { withCredentials: true })
      .then((res) => {
        //add to user global store
        console.log("dispatching")
        dispath(createUser(res.data));
      })
      .catch((err) => {
        dispath(showToast({
          message: err.message,
          type: 'error'
        }));
      });
  };

  useEffect(() => {
    //function for checking if window in scrolled state
    // const handleScroll = debounce(() => {
    //     isScrolled = (window.scrollY > 0);

    //     if(isScrolled){
    //         scrollDiv.current.classList.add('border-b-black');
    //         scrollDiv.current.classList.add('border-b-2');
    //     }else{
    //         scrollDiv.current.classList.remove('border-b-black');
    //         scrollDiv.current.classList.remove('border-b-2');
    //     }

    // }, 5)

    //window.addEventListener('scroll', handleScroll)

    //attempt a auto login
    if (!user) {
      getAuthUser();
    }

    //return () => {window.removeEventListener('scroll', handleScroll)}
  }, []);

  return (
    <div
      ref={scrollDiv}
      className={`navbar bg-gray-200 border-b-gray-300 border-b-2 sticky top-0 z-10 justify-center`}
    >
      {/* justify between with a max width */}
      <div className="flex-1 max-w-4xl justify-between my-2 mx-8">
        <div>
          <h1 className="font-bold text-3xl antialiased">
            <Link to={user?"/home":"/"}>Project 66</Link> 
            </h1>
        </div>

        {/* if a user exists load avatar otherwise sign in/ sign out  */}
        {user ? (
          <div className="flex items-center">
            <Link className={`mr-5 font-semibold ${location==='/home'?'text-black font-bold':'text-gray-500'}`} to='/home'>Home</Link> 
            <Link className={`mr-5 font-semibold ${location==='/stats'?'text-black font-bold':'text-gray-500'}`} to='/stats'>My Stats</Link>
            <div className="avatar dropdown dropdown-left">
              <div
                className="w-12 rounded-full cursor-pointer"
                role="button"
                aria-haspopup="menu"
                aria-expanded="false"
                tabIndex="0"
              >
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
          </div>
        ) : (
          <button onClick={handleLogin} className="btn btn-neutral">
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
