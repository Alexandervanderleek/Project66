import React from 'react'
import { useParams } from 'react-router-dom'

function Redirect() {
  
  const params = useParams();

  console.log(params)

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
