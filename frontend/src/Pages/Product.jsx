
import React from "react";
import { ShopContext } from "../Context/ShopContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/Breadcrums/Breadcrum";

import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProduct from "../components/RelatedProducts/RelatedProduct";



const Product=()=>{
    const {all_products}=useContext(ShopContext);
    console.log(all_products);
    const {productId}=useParams();
    console.log(productId);
    const product = all_products.find((e) => e._id === productId);
    console.log("in productn ", product);

    

    return (

        <div className="">
            <Breadcrum product={product}/>
            <ProductDisplay product={product}/>
            <DescriptionBox product={product}/>
            {/* <RelatedProduct/> */}
        </div>
    )
}

export default Product
