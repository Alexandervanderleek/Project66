import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {deleteHabbit, updatedHabbit} from '../reducers/habbitsReducer';
import { useDispatch } from 'react-redux';

function Habbit({ habbit, index }) {

  const hoursRef = useRef(null)
  const minutesRef = useRef(null)
  const secondsRef = useRef(null)

  const dispath = useDispatch();

  //useEffect for interval timer
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(habbit.expire);
      const difference = end - now;

      if (difference > 0 && habbit.today) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        hoursRef?.current.style.setProperty('--value', hours);
        minutesRef?.current.style.setProperty('--value', minutes);
        secondsRef?.current.style.setProperty('--value', seconds);
      } else {
        //has expired need to complete this
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [habbit])

  const handleDelete = () => {
    axios.delete(`/api/habbits/${habbit.id}`)
      .then(() => {
        dispath(deleteHabbit(habbit.id));
      })
      .catch(err => console.error('Error deleting habbit:', err));
  };

  const handleComplete = () => {
    axios.patch(`/api/habbits/${habbit.id}`)
      .then(
        (res) => {
          dispath( updatedHabbit(res.data.updatedHabbit) ) 
        })
      .catch(err => console.error('Error completing habbit:', err));
  };

  const statusColors = {
    active: 'text-blue-600',
    complete: 'text-green-600',
    failed: 'text-red-600',
  };

  const borderColors = {
    active: 'border-blue-600',
    complete: 'border-green-600',
    failed: 'border-red-600',
  }

  return (
    <div className={`w-full bg-white shadow-md rounded-lg mb-4 p-4 border-l-4 ${borderColors[habbit.status].replace('text', 'border')} opacity-0 animate-fade-in`}
    style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl flex-shrink-0">{habbit.icon}</span>
          <div className='min-w-0 flex-grow'>
            <h2 className="font-bold text-lg line-clamp-1">{habbit.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">{habbit.description}</p>
          </div>
        </div>
        <div className={`font-semibold flex-shrink-0 px-2 ${statusColors[habbit.status]}`}>
          {habbit.status.charAt(0).toUpperCase() + habbit.status.slice(1)}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-8">
            {(habbit.status==='active' && habbit.today === true ) && (
                <div>
                <p className="text-sm text-gray-500">Time Left</p>
                <span className="countdown font-mono text-xl">
                    <span ref={hoursRef}></span>:
                    <span ref={minutesRef}></span>:
                    <span ref={secondsRef}></span>
                </span>
                </div>
            )}
          <div>
            <p className="text-sm text-gray-500">Days</p>
            <p className="font-semibold"><span className={(!habbit.today && habbit.status !=='failed') ? 'text-green-500' : 'text-red-500'}>{habbit.Days}</span>/66</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={()=>document.getElementById(`${habbit.id}`).showModal()}
            className="btn btn-error btn-sm" 
          >
            Delete
          </button>
            
            <dialog id={habbit.id} className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Confirmation</h3>
                <p className="py-4 text-lg">Are you sure you want to delete your habit <span className="font-bold">{habbit.title} ?</span></p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <div className="space-x-2 w-full">
                    <button className="btn btn-error" onClick={handleDelete}>Delete</button>
                    <button className="btn">Close</button>
                    </div>
                   
                  </form>
                </div>
              </div>
            </dialog>

          <button 
            className="btn btn-success btn-sm" 
            onClick={handleComplete}
            disabled={habbit.status !== 'active' || !habbit.today}
          >
            Mark as Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default Habbit;