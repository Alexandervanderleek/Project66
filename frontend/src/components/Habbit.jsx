import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  deleteHabbit,
  updatedHabbit,
  failedHabbit,
} from "../reducers/habbitsReducer";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../reducers/toastReducer";
import { setLoading } from "../reducers/loaderReducer";
import ConfettiExplosion from 'react-confetti-explosion';


function Habbit({ habbit, index }) {
  console.log("Habbit Reloaded")
  
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const habbitRef = useRef(null);
  const isLoading = useSelector((state)=>state.loading.isLoading);
  const controller = new AbortController();

  const dispatch = useDispatch();
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    if (habbit.status === "active") {
      var timer = setInterval(() => {
        const now = new Date();
        const end = new Date(habbit.expire);
        const difference = end - now;

        if (difference > 0 && habbit.today) {
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          hoursRef?.current?.style.setProperty("--value", hours);
          minutesRef?.current?.style.setProperty("--value", minutes);
          secondsRef?.current?.style.setProperty("--value", seconds);
        } else {
          //has expired need to complete this
          clearInterval(timer);
          dispatch(failedHabbit(habbit));
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, []);

  const handleDelete = () => {
    
    if(isLoading) controller.abort();

    //dispatch(setLoading({isLoading: true}));

    axios
      .delete(`/api/habbits/${habbit.id}`)
      .then(() => {
        //dispatch(setLoading({isLoading: false}));
        habbitRef.current.classList.add("animate-delete");
        setTimeout(() => {
          dispatch(deleteHabbit(habbit.id));
        }, 500);
      })
      .catch((err) => {
        //dispatch(setLoading({isLoading: false}));
        dispatch(
          showToast({
            message: err.message,
            type: "error",
          })
        );
      });
  };

  const handleComplete = () => {

    if(isLoading) controller.abort();

    //dispatch(setLoading({isLoading: true}))

    setIsExploding(true);

    axios
      .patch(`/api/habbits/${habbit.id}`)
      .then((res) => {
        //dispatch(setLoading({isLoading: false}));
        habbitRef.current.classList.add("animate-complete");
        setTimeout(() => {
          dispatch(updatedHabbit(res.data.updatedHabbit));
        }, 500);
      })
      .catch((err) => {
        //dispatch(setLoading({isLoading: false}));
        dispatch(
          showToast({
            message: err.message,
            type: "error",
          })
        );
      });
  };

  const statusColors = {
    active: "text-blue-600",
    complete: "text-green-600",
    failed: "text-red-600",
  };

  const borderColors = {
    active: "border-blue-600",
    complete: "border-green-600",
    failed: "border-red-600",
  };

  const backgroundColors = {
    active: "bg-white",
    complete: "bg-green-100",
    failed: "bg-red-100",
  };

  return (
    <div
      ref={habbitRef}
      className={`w-full ${
        backgroundColors[habbit.status]
      } shadow-md rounded-lg mb-4 p-4 border-l-4 ${borderColors[
        habbit.status
      ].replace("text", "border")} opacity-0 animate-fade-in`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl flex-shrink-0">{habbit.icon}</span>
          <div className="min-w-0 flex-grow">
            <h2 className="font-bold text-lg line-clamp-1">{habbit.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">
              {habbit.description}
            </p>
          </div>
        </div>
        <div
          className={`font-semibold flex-shrink-0 px-2 ${
            statusColors[habbit.status]
          }`}
        >
          {habbit.status.charAt(0).toUpperCase() + habbit.status.slice(1)}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-8">
          {habbit.status === "active" && habbit.today === true && (
            <div>
              <p className="text-sm text-gray-500">Time Left</p>
              <span className="countdown font-mono text-xl">
                <span ref={hoursRef}></span>:<span ref={minutesRef}></span>:
                <span ref={secondsRef}></span>
              </span>
            </div>
          )}
          <div>
            {habbit.status === "active" && habbit.today === false ? (
              <div className="flex flex-row space-x-2 text-center">
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="font-semibold">
                    <span className={"text-green-500"}>{habbit.Days}</span>
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Remaining</p>
                  <p className="font-semibold">
                    <span className={"text-red-500"}>{66 - habbit.Days}</span>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500">Days</p>
                <p className="font-semibold">
                  <span
                    className={
                      (!habbit.today && habbit.status !== "failed") ||
                      habbit.status === "complete"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {habbit.Days}/66
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          {habbit.status === "active" ? (
            <button
              onClick={() =>
                document.getElementById(`${habbit.id}`).showModal()
              }
              className="btn btn-error btn-sm"
            >
              Delete
            </button>
          ) : (
            <p className="text-sm text-gray-500">
              {new Date(habbit.expire).toDateString()}
            </p>
          )}

          <dialog id={habbit.id} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirmation</h3>
              <p className="py-4 text-lg">
                {habbit.status !== "active" ? "Remove" : "Delete"} your habit{" "}
                <span className="font-bold">{habbit.title} ?</span>
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <div className="space-x-2 w-full">
                    <button className="btn btn-error" onClick={handleDelete}>
                      {habbit.status !== "active" ? "Remove" : "Delete"}
                    </button>
                    <button className="btn">Close</button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
          {habbit.status === "active" && habbit.today === true && (
            <button
              className="btn btn-success btn-sm"
              onClick={handleComplete}
              disabled={habbit.status !== "active" || !habbit.today}
            >
              {isExploding && <ConfettiExplosion force={0.6} duration={2500} particleCount={80} width={1000}/>}
              <span className="hidden sm:block">Mark as </span>Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Habbit;
