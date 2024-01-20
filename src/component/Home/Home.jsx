import React from 'react'
import img1 from '../../images/home-page.jpg'
import '../../App.css'

function Home() {
  return (
    <div className='container' id='back'>
      <img className="backgroundimg" src={img1} alt="StudentHome"/>
    </div>
  )
}

export default Home
