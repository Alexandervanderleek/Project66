import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="flex justify-center w-full bg-gray-200 border border-t-gray-300">
          <div className="flex w-full sm:w-1/2 justify-between py-2 px-1 sm:py-4 sm:px-2">
              <div className="text-xs text-gray-400 sm:text-sm font-semibold">
                Alexandervanderleek@gmail.com
              </div>
              <div>
                <Link to='/privacypolicy'>
                <div className="text-xs text-gray-400 sm:text-sm font-semibold hover:text-black">Privacy Policy</div></Link>
              </div>
          </div>
            
        </div>
  )
}

export default Footer
