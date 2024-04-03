
import React from "react";
import "./Items.css"
import { Link } from "react-router-dom";
import FormatPrice from "../helpers/FormatPrice";

const Items=(props)=>{
    console.log("productid: ",props.id);
    return (
        <div className="Items">
            <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt=""/></Link>
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-prices-new">
                    <FormatPrice price={props.new_price}/>
                </div>
                <div className="item-prices-old">
                    <FormatPrice price={props.old_price}/>
                </div>
            </div>

        </div>
    )
}

export default Items
