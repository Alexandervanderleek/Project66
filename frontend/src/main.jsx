import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer.js'
import habbitsReducer from './reducers/habbitsReducer.js'

//configure our store
const store = configureStore({
  reducer: {
    user: userReducer,
    habbits: habbitsReducer
  },
})


ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <App />
  </Provider>
)
