import React from "react";
import "./NewCollection.css"
import new_collection from "../Assets/new_collections"
import Items from "../Items/Items";

const NewCollection=()=>{
    // const [new_collection,setNew_collection]=React.useState([]);

    // React.useEffect(()=>{
    //     fetch("http://localhost:4000/newcollections")
    //     .then((resp)=>resp.json())
    //     .then((data)=>setNew_collection(data));
    // },[])
    return (
        <div className="new-collections">
            <h1>LATEST IN COLLECTION</h1>
            <hr/>
            <div className="collections">
                {new_collection.map((item,i)=>{
                    return <Items key={i} id={item.id} name={item.name} image={item.image}
                    new_price={item.new_price} old_price={item.old_price}
                    />
                })}
            </div>

        </div>
    )
}

export default NewCollection
