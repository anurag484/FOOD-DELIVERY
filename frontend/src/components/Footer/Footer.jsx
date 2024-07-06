import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
         <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>A food website offering delicious recipes, cooking tips, and meal plans. Explore a variety of cuisines, from appetizers to desserts. Features include user reviews, instructional videos, and a vibrant community forum. Perfect for food enthusiasts seeking inspiration and culinary expertise. Discover and share your passion for food!</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
         </div>
         <div className="footer-content-center">
               <h2>COMPANY</h2>
               <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
               </ul>
         </div>
         <div className="footer-content-right">
             <h2>GET IN TOUCH</h2>
             <ul>
                <li>+91-9027811797</li>
                <li>anuragruwali484@gmail.com</li>
             </ul>
         </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 - All Right Reserved.</p>
    </div>
  )
}

export default Footer
