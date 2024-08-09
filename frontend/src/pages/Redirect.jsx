import React from 'react'
import { useParams } from 'react-router-dom'

//Page for redirecting user after login
function Redirect() {
  
  const params = useParams();

  window.close();

  return (
    <div>
      {params.id === "1" && (
        <p>Success</p>
      )}
      {params.id === "2" && (
        <p>Failed</p>
      )}
      {params.id !== "1" && params.id !== "2" &&
        <p>
            Something went wrong
        </p>
      }
    </div>
  )
}

export default Redirect
