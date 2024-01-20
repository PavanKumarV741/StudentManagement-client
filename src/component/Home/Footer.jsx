import React from 'react'
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";

function Footer() {
  return (
    <div className='footer'>
        <ul className='footerul'>
            <li className='icons'><FaLinkedin/></li>
            <li className='icons'><FaFacebook/></li>
            <li className='icons'><FaGoogle/></li>
            <li className='icons'><MdEmail/></li>
            <li className='icons'><IoLogoGithub/></li>
        </ul>
    </div>
  )
}

export default Footer
