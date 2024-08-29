import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer.js'
import habbitsReducer from './reducers/habbitsReducer.js'
import toastReducer from './reducers/toastReducer.js'
import statsReducer from './reducers/statsReducer.js'
import loaderReducer from './reducers/loaderReducer.js'
import leaderBoardReducer from './reducers/leaderBoardReducer.js'

//configure our store
const store = configureStore({
  reducer: {
    user: userReducer,
    habbits: habbitsReducer,
    toast: toastReducer,
    stats: statsReducer,
    loading: loaderReducer,
    leaderboard: leaderBoardReducer
  },
})


ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <App />
  </Provider>
)
