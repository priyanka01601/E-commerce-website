import React, { useContext, useRef } from "react";
import "./Navbar.css"
// import logo from "../Assets/logo-final.png"
import logo from "../Assets/BEAUTY VANITY.png"
import cart_icon from "../Assets/cart_icon.png"
import {Link} from "react-router-dom"
// import hamburger_icon from "../Assets/Hamburger_icon.png";
import nav_dropdown from "../Assets/nav_dropdown.png"
import { ShopContext } from "../../Context/ShopContext";
// import { menuItemData } from "../Assets/MenuItemData";
import MenuItems from "../MenuItems/MenuItems"
import Submenu from "../Submenu/Submenu";
import {GiHamburgerMenu} from "react-icons/gi"
import { ImCross } from "react-icons/im";

const Navbar=()=>{

    const [menu,setMenu]=React.useState("shop")
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const {all_categories}=useContext(ShopContext);
    const {getTotalCartItems}=useContext(ShopContext);
    const [openSubmenu, setOpenSubmenu] = React.useState(null);

    const handleSubmenuToggle = (title) => {
        setOpenSubmenu((prev) => (prev === title ? null : title));
    };

    
    // const menuRef=useRef();

    // const dropdown_toggle=(e)=>{
    //     menuRef.current.classList.toggle("nav-menu-visible");
    //     e.target.classList.toggle("open");
    // }   
    return (
        <>
       <div className="navbar">
        <div onClick={toggleMenu} >
            <a className="hamburger-icon">
            <GiHamburgerMenu />
            </a>
        </div>
            <Link to="/" style={{textDecoration:"none"}} >
            <div className="nav-logo">

                <img src={logo} alt=""/>
                <p>BEAUTY VANITY</p>
            </div>
            </Link>
            <ul >
            <Link to="/brands"><li>BRANDS</li></Link>
                <li><a href="#">ABOUT US</a></li>
                <li><a href="#">CONTACT US</a></li>
            </ul>
            <div class="search-container">
            <input type="text" placeholder="Type here"/>
            <button type="button">Search</button>
            </div>
            {/* <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} style={{width:"40px", height:"40px",backgroundColor:"white"}} alt=""/>
            <ul ref={menuRef}className="nav-menu">
                {menuItemData.map((menu,index)=>{
                    return <MenuItems items={menu} key={index} />;
                    
                })} */}
                {/* <li onClick={()=>{setMenu("shop")}}> <Link style={{textDecoration:"none"}} to="/">Shop</Link>{menu==="shop" ? <hr/>:<></>}</li>

                <li onClick={()=>{setMenu("men")}}><Link  style={{textDecoration:"none"}} to="/men">Men</Link> {menu==="men" ? <hr/>:<></>}</li>

                <li onClick={()=>{setMenu("women")}}><Link  style={{textDecoration:"none"}} to="/women">Women</Link>{menu==="women" ? <hr/>:<></>}</li>

                <li onClick={()=>{setMenu("kids")}}><Link  style={{textDecoration:"none"}} to="/kids">Kids</Link>{menu==="kids" ? <hr/>:<></>}</li> */}
            {/* </ul> */}

            <div className="nav-login-cart">
                {localStorage.getItem("auth-token")?<button onClick={()=>{localStorage.removeItem("auth-token");window.location.replace("/")
                }}>Logout</button>:<Link to="/login"><button>Login / Signup</button></Link>}
            
            <Link to="/cart">   <img src={cart_icon} alt=""/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>

        </div>
        <div className={`${isMenuOpen ? "menu-bar-open" : "menu-bar "}`}>
            <a onClick={toggleMenu} className={`${isMenuOpen?"hamburger-icon-open":"hamburger-icon"}`}>
                {isMenuOpen?<ImCross />:""} 
            </a>
            
            {all_categories.map((menu, index) => (
            <Submenu key={index} item={menu} current={index} open={isMenuOpen} submenu={openSubmenu === menu.name}
            onToggleSubmenu={handleSubmenuToggle}/>
            ))}


        </div>
        </>
    )
}

export default Navbar