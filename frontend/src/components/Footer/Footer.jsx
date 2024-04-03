import React from "react";
import "./Footer.css";

import logo from "../Assets/BEAUTY VANITY.png"
import instagram_icon from "../Assets/instagram_icon.png";

import pinterest_icon from "../Assets/pintester_icon.png";

import whatsapp_icon from "../Assets/whatsapp_icon.png";




const Footer=()=>{
    return (
        <div className="footer">
            <div className="footer-columns">
            <div className="footer-logo">
                <img src={logo} alt=""/>
                <p>BEAUTY VANITY</p>
            </div>
            <div>
            <h3>Important Links</h3>
            <ul className="footer-links">
                <li>About</li>
                <li>Contact Us</li>
                <li>Cart</li>
                <li>Wishlist</li>
            </ul>
            </div>
            <div>
            <h3>Categories</h3>
            <ul className="footer-links">
                <li>Hair Care</li>
                <li>Skin Care</li>
                <li>Beauty</li>
                <li>Salon Treatments</li>
                <li>Salon Equipments & Electronics</li>
            </ul>
            </div>
            <div>
            <h3>Reach Us </h3>
            <ul className="footer-links">
                <li>support@beautyvanity.in</li>
                <li>987654321</li>
            </ul>
            </div>
            </div>
            <div className="footer-social-icons">
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt=""/>
                </div>
                <div className="footer-icons-container">
                    <img src={pinterest_icon} alt=""/>
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp_icon} alt=""/>
                </div>
            </div>
            <div className="footer-copyright">
                <hr/>
                <p>Copyright @ 2023-All Rights Reserved</p>
            </div>


        </div>
    )
}

export default Footer;
