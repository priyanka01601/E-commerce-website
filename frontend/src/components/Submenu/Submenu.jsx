import React, { useState } from "react";
import "./Submenu.css";
import { Link } from "react-router-dom";
// import nav_dropdown from "../Assets/nav_dropdown.png"



const Submenu = ({ item,open,onToggleSubmenu,submenu}) => {
  const [isHovered, setIsHovered] = useState(false);
 
  const handleMouseEnter = () => {
    if(!open)
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if(!open)
    setIsHovered(false);
  };

  // const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);


 
  // const toggleSubMenu = () => {

    
  //   console.log(isSubMenuOpen)
  //   setIsSubMenuOpen(!isSubMenuOpen);
  //   setIsHovered(false);
  //   // setActiveState(item.title);

   
  // };
  const toggleSubMenu = () => {
    onToggleSubmenu(item.name);
  };

  // const togglestate=()=>{
  //   setActiveState(isActiveState===item.title?undefined:item.title);

  // }

  
  
  if(item && item.subcategories){
    console.log(item);
    return (
    
      <div
        className={`${submenu && open? "submenu-item-open" : "submenu-item"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        
        >
         
        <div className="sidebar-title"><Link className="custom-link" style={{textDecoration:"none"}} to ={`/shopcategory/${item._id}`}>{item.name}</Link><span  onClick={toggleSubMenu} className={` ${submenu && open ? "arrow-open" : "arrow"}` }>▼</span></div>
  
  
        { (isHovered|| submenu) && (
          <div className={` ${submenu && open? "submenu-open" : "submenu"}`}>
            {item.subcategories.map((child, index) => 
             <Link to={`/shopcategory/${item._id}/${child._id}`} className="sidebar-item plain">
             {child.name}
           </Link>
            )}
          </div>
        )}
      </div>
    )
            }
  
    
  
  
};

export default Submenu;