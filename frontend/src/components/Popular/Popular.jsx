import React from "react";
import "./Popular.css"
// import data_product from "../Assets/data";
import Items from "../Items/Items";

const Popular=()=>{

    const[popular_in_women,setPopular_in_women]=React.useState([]);

    React.useEffect(()=>{
        fetch("http://localhost:4000/popularinwomen")
        .then((resp)=>resp.json())
        .then((data)=>setPopular_in_women(data));

    },[]);
    return (
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr/>
            <div className="popular-item">
                {popular_in_women.map((item,i)=>{
                    return <Items key={i} id={item.id} name={item.name} image={item.image}
                    new_price={item.new_price} old_price={item.old_price}
                    />
                })}
            </div>

        </div>
    )
}

export default Popular
