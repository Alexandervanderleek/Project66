import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../reducers/toastReducer";

function Toast() {
  const { message, type, isVisible } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  const toast = useRef(null);


  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        toast.current.classList.add('animate-fade-out');
        setTimeout(()=>dispatch(hideToast()),500);
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return;


  const options = {
    error: 'alert-error',
    success: 'alert-success'
  }


  return (
    <div ref={toast} className="toast toast-top toast-center mb-0.5 z-20 animate-fade-in">
      <div className={`alert ${options[type]}`}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
