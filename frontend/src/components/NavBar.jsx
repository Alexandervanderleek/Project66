import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createUser, destroyUser } from "../reducers/userReducer";
import { clearHabbits } from "../reducers/habbitsReducer";
import { setLoading } from "../reducers/loaderReducer";
import { Link, useLocation } from "react-router-dom";
import {showToast} from '../reducers/toastReducer';

//Navbar component
function NavBar() {

  const location = useLocation().pathname;
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const controller = new AbortController();
  const dispatch = useDispatch();

  //function to handle login
  const handleLogin = () => {

    //open popup for google auth
    // const popup = window.open(
    //   "http://localhost:3000/oauth2/login/google",
    //   "popup",
    //   `width=500,height=600`
    // );
    //"/oauth2/login/google",
    const popup = window.open(
      "/oauth2/login/google",
      "popup",
      `width=500,height=600`
    );

    //check for success or failure redirect
    let interval = setInterval(() => {
      if (!popup.closed) return;
      getAuthUser();
      return clearInterval(interval);
    }, 500);
  };

  //function clear store on signout's
  function clearStore(payload) {
    dispatch(clearHabbits());
    dispatch(destroyUser());
  }

  //function to logout
  const handleLogout = () => {
    
    if(isLoading) controller.abort();

    dispatch(setLoading({isLoading: true}));

    axios
      .get("/api/user/logout", {signal: controller.signal})
      .then(()=>{
        clearStore();
        dispatch(setLoading({isLoading: false}));

      })
      .catch((err) => {
        dispatch(setLoading({isLoading: false}));
        dispatch(
          showToast({ message: err.response?.data ? err.response.data.error:"An Error Occured", type: "error" })
        ); 
      });
  };

  const handleDelete = () => {
    
    if(isLoading) controller.abort();

    dispatch(setLoading({isLoading: true}));

    axios
      .delete("/api/user/Delete", {signal: controller.signal})
      .then(()=>{
        clearStore();
        dispatch(setLoading({isLoading: false}));

      })
      .catch((err) => {
        dispatch(setLoading({isLoading: false}));
        dispatch(
          showToast({ message: err.response?.data ? err.response.data.error:"An Error Occured", type: "error" })
        ); 
      });
  };


  //gets the authenticated user from server
  const getAuthUser = () => {
    
    if(isLoading) controller.abort();
    
    dispatch(setLoading({isLoading: true}));
    
    axios
      .get("/api/user", { withCredentials: true, signal: controller.signal })
      .then((res) => {
        //add to user global store
        dispatch(setLoading({isLoading: false}));
        dispatch(createUser(res.data));
      })
      .catch((err) => {
        dispatch(setLoading({isLoading: false}))
        dispatch(
          showToast({ message: err.response?.data ? err.response.data.error:"An Error Occured", type: "error" })
        ); 
      });
  };

  useEffect(() => {
    //attempt a auto login
    if (!user) getAuthUser();

    return () => {
      controller.abort();
    }
  }, []);

  return (
    <div className={`navbar bg-gray-200 border-b-gray-300 border-b-2 sticky top-0 z-10 justify-center`}>
      <div className="flex-1 max-w-4xl justify-between mx-2 sm:my-2">
        <div>
          <h1 className="font-bold text-2xl sm:text-3xl font-lilly-one antialiased">
            <Link className="flex" to={user?"/home":"/"}><span className="hidden sm:block mr-2">Habbit for </span> 66</Link> 
          </h1>
        </div>

        {/* if a user exists load avatar otherwise sign in/ sign out  */}
        {user ? (
          <div className="flex items-center">
            <Link className={`mr-5 text-sm md:text-lg font-semibold ${location==='/home'?'text-black font-bold':'text-gray-500'}`} to='/home'>Home</Link>
            <Link className={`mr-5 text-sm md:text-lg font-semibold ${location==='/leaderboard'?'text-black font-bold':'text-gray-500'}`} to='/leaderboard'>Leaderboard</Link>  
            <Link className={`mr-5 text-sm md:text-lg font-semibold ${location==='/stats'?'text-black font-bold':'text-gray-500'}`} to='/stats'>My Stats</Link>
            <div className="avatar dropdown dropdown-left">
              <div
                className="w-10 sm:w-12 rounded-full cursor-pointer"
                role="button"
                aria-haspopup="menu"
                aria-expanded="false"
                tabIndex="0"
              >
                <img src={user?.picture} alt="User avatar" />
              </div>
              <ul
                className="menu dropdown-content bg-base-100 rounded-box z-[1] w-36 p-2 shadow"
                role="menu"
              >
                <li role="none" className="mb-2 bg-red-200 rounded-lg">
                  <button
                    onClick={handleLogout}
                    className="text-red-500 font-bold w-full text-left"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </li>
                <li role="none" className="bg-gray-300 rounded-lg">
                  <button
                    onClick={handleDelete}
                    className="text-gray-700 font-bold w-full text-left"
                    role="menuitem"
                  >
                    Delete Account
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button onClick={handleLogin} className="btn btn-neutral btn-sm text-xs sm:btn-md sm:text-sm">
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
