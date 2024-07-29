import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../reducers/toastReducer";

function Toast() {
  const { message, type, isVisible } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return;


  console.log(type)


  const options = {
    error: 'alert-error'
  }


  return (
    <div className="toast toast-bottom toast-center mb-0.5 z-10">
      <div className={`alert ${options[type]}`}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
