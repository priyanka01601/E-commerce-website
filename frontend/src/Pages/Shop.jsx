import React from "react";
import Hero from "../components/Hero/Hero";
import Popular from "../components/Popular/Popular";
import Offers from "../components/Offers/Offers";
import NewCollection from "../components/NewCollection/NewCollection";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Carousel from "../components/Carousel/Carousel";
import Brands from "../components/Brands/Brands";






const Shop=()=>{
    return (
        <div>
            <Carousel/>
            <WhyChooseUs/>
            
            <Brands/>
            <NewCollection/> 
            {/* <Popular/>
            <Offers/>
            
            <Hero/>*/}
            <NewsLetter/>
            
        </div>
    )
}

export default Shop
