import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Habbit({ habbit, onDelete, onComplete }) {
  // const [timeLeft, setTimeLeft] = useState([]);

  let timeLeft = [];

  const hoursRef = useRef(null)
  const minutesRef = useRef(null)
  const secondsRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(habbit.expire);
      const difference = end - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        timeLeft = [0,0,0]
        //console.log(hoursRef.current.style)
        hoursRef.current.style.setProperty('--value', hours);
        minutesRef.current.style.setProperty('--value', minutes);
        secondsRef.current.style.setProperty('--value', seconds);
        //setTimeLeft(`${hours} ${minutes} ${seconds}`.split(' '));
      } else {
        clearInterval(timer);
        timeLeft = [0,0,0];
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [habbit.expire])

  const handleDelete = () => {
    axios.delete(`/api/habbits/${habbit.id}`)
      .then(() => onDelete(habbit.id))
      .catch(err => console.error('Error deleting habbit:', err));
  };

  const handleComplete = () => {
    axios.patch(`/api/habbits/${habbit.id}`, { Days: habbit.Days + 1 })
      .then(() => onComplete(habbit.id))
      .catch(err => console.error('Error completing habbit:', err));
  };

  const statusColors = {
    active: 'text-blue-600',
    complete: 'text-green-600',
    failed: 'text-red-600',
  };

  console.log("reloading habbits")

  return (
    <div className={`w-full bg-white shadow-md rounded-lg mb-4 p-4 border-l-4 ${
      statusColors[habbit.status].replace('text', 'border')
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl">{habbit.icon}</span>
          <div>
            <h2 className="font-bold text-lg">{habbit.title}</h2>
            <p className="text-sm text-gray-600">{habbit.description}</p>
          </div>
        </div>
        <div className={`font-semibold ${statusColors[habbit.status]}`}>
          {habbit.status.charAt(0).toUpperCase() + habbit.status.slice(1)}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-8">
            {(habbit.status==='active' && habbit.today === true ) && (
                <div>
                <p className="text-sm text-gray-500">Time Left</p>
                <span className="countdown font-mono text-2xl">
                    <span ref={hoursRef} style={{"--value":timeLeft[0]}}></span>:
                    <span ref={minutesRef} style={{"--value":timeLeft[1]}}></span>:
                    <span ref={secondsRef} style={{"--value":timeLeft[2]}}></span>
                </span>
                </div>
            )}
          <div>
            <p className="text-sm text-gray-500">Days Completed</p>
            <p className="font-semibold">{habbit.Days}/66</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            className="btn btn-error btn-sm" 
            onClick={handleDelete}
          >
            Delete
          </button>
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