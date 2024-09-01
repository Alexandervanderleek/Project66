import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";

//Main landing page
function LandingPage() {

  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.loading.isLoading);

  //navigate to home page
  if (user) {
    return <Navigate to="/home"></Navigate>;
  }

  //main landing page
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center">
      {isLoading ? (
        <>
          <span className="loading loading-spinner loading-lg mt-16"></span>
        </>
      ):(
        <>
          <span className="font-permanent-marker text-3xl md:text-4xl lg:text-5xl text-center my-6 lg:my-12 text-shadow-art">
            It takes <span className="text-yellow-500">66 days</span>{" "}
            <br className="block sm:hidden" /> to form a habbit <br /> can you
            do it ?
          </span>

          <h2 className="mb-8 font-semibold text-gray-600 text-sm lg:text-xl text-center bg-slate-200 p-3 rounded-md">
            No if's but's or maybes. <br />
            Track your habbit for 66 days and make it stick !
          </h2>

          <div className="flex flex-col lg:flex-row text-3xl text-center">
            <div className="sm:hover:scale-105 duration-100 ease-in-out relative p-4">
              <div className="font-permanent-marker group-hover:text-4xl duration-100 ease-in-out">
                Create
              </div>
              <img
                className="drop-shadow-lg border-2 border-black rounded-lg"
                width={550}
                src="Track.PNG"
              ></img>
              <div className="hidden lg:block absolute -bottom-50 right-0">
                <svg
                  className="fill-gray-400"
                  fillOpacity={0.4}
                  width="96px"
                  height="96px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 4C3 3.44772 3.44771 3 4 3C4.55229 3 5 3.44772 5 4L5 11C5 11.7956 5.31607 12.5587 5.87868 13.1213C6.44129 13.6839 7.20435 14 8 14H17.5858L14.2929 10.7071C13.9024 10.3166 13.9024 9.68342 14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289L20.7071 14.2929C21.0976 14.6834 21.0976 15.3166 20.7071 15.7071L15.7071 20.7071C15.3166 21.0976 14.6834 21.0976 14.2929 20.7071C13.9024 20.3166 13.9024 19.6834 14.2929 19.2929L17.5858 16H8C6.67392 16 5.40215 15.4732 4.46447 14.5355C3.52678 13.5979 3 12.3261 3 11V4Z" />
                </svg>
              </div>
            </div>
            <div className="sm:hover:scale-105 duration-100 ease-in-out relative p-4">
              <span className="font-permanent-marker">Track</span>
              <img
                className="drop-shadow-lg border-2 border-black rounded-lg"
                width={550}
                height={400}
                src="Reflect.PNG"
              ></img>
              <div className="hidden lg:block  absolute -bottom-50 right-10">
                <svg
                  className="fill-gray-400"
                  width="96px"
                  height="96px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 4C21 3.44772 20.5523 3 20 3C19.4477 3 19 3.44772 19 4V11C19 11.7956 18.6839 12.5587 18.1213 13.1213C17.5587 13.6839 16.7956 14 16 14H6.41421L9.70711 10.7071C10.0976 10.3166 10.0976 9.68342 9.70711 9.29289C9.31658 8.90237 8.68342 8.90237 8.29289 9.29289L3.29289 14.2929C2.90237 14.6834 2.90237 15.3166 3.29289 15.7071L8.29289 20.7071C8.68342 21.0976 9.31658 21.0976 9.70711 20.7071C10.0976 20.3166 10.0976 19.6834 9.70711 19.2929L6.41421 16H16C17.3261 16 18.5979 15.4732 19.5355 14.5355C20.4732 13.5979 21 12.3261 21 11V4Z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex text-3xl text-center">
            <div className="p-4 sm:hover:scale-105 duration-100 ease-in-out">
              <span className="font-permanent-marker">Analyze</span>
              <img
                className="drop-shadow-lg border-2 border-black rounded-lg"
                width={550}
                height={400}
                src="Stats.PNG"
              ></img>
            </div>
          </div>
        </>
      )}
      <div className="flex w-full items-end flex-grow">
        <Footer></Footer>
      </div>
      
    </div>
  );
}

export default LandingPage;
