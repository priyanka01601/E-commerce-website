import React, { useState } from "react";
import "./MenuItems.css";
import nav_dropdown from "../Assets/nav_dropdown.png"

const MenuItems = ({ items}) => {
    let submenus=items.submenu;
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownVisible(!isDropdownVisible);
    };
    
    const closeDropdown = () => {
        setIsDropdownVisible(false);
      };
    const openDropdown = () => {
        setIsDropdownVisible(true);
    };
  
  return (
    <li className="menu-items"  onMouseLeave={closeDropdown} onMouseOver={openDropdown}> 
      {items.submenu ? (
        <>
          <a className="main-menu" >
            {items.title}
            
          </a>
          <img className={`nav-dropdown  ${isDropdownVisible ? "open" : ""}`}src={nav_dropdown} onClick={toggleDropdown} style={{width:"20px", height:"20px",backgroundColor:"white"}} alt=""/>

          <ul className={`dropdown ${isDropdownVisible ? "dropdown-visible" : ""}`}>
        {submenus.map((submenu, index) => (
          <li className="subitems" key={index}>
            <a href={submenu.url}>{submenu.title}</a>
          </li>
        ))}
      </ul>
        </>
      ) : (
        <a href={items.url}>{items.title}</a>
      )}
    </li>
  );
};

export default MenuItems;
