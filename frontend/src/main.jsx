import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer.js'

const store = configureStore({
  reducer: {
    user: userReducer
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode>, */}
  </Provider>
)
