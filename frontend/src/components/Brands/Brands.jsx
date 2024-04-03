// Brands.js

import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import brandImages from '../Assets/brandImages';

import Slider from 'react-slick';
import brandsBg from "../Assets/salon-bg-brands.jpg"
import './Brands.css';
import products_banner from "../Assets/Product List.jpg";

const Brands = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <button className="slick-prev" aria-label="Previous" />,
    nextArrow: <button className="slick-next" aria-label="Next" />,
  };
 

  return (
    <div>
       <img className='products-banner' src={products_banner}/>
    <div className="brand-slider" style={{ backgroundImage: `url(${brandsBg})` }}>
      <div className="slider-container">
        <h1>Brands</h1>
        <Slider {...settings}>
          {brandImages.map((image, index) => (
            <div key={index}>
              <img className="brands-img" src={image} alt={`brand-${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
   
    </div>
    
  );
};

export default Brands;
