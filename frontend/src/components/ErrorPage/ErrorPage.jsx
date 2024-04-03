import React from 'react'
import "./ErrorPage.css"
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='error-container'>
        <div>
            <h2>404</h2>
            <h2>UH OH! You're lost.</h2>
            <p>
                The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go back to the homapge.
            </p>
            <Link to="/" style={{textDecoration:"none"}}><button class="home-button">Home</button></Link>
        </div>
      
    </div>
  )
}

export default ErrorPage
