import React from 'react';
import "./Card.css"

const Card = ({ brand }) => {
  return (    
    <div className="card-container">
      {/* <h2>{category.name}</h2> */}
      <div className="brands-card">
        <img src={brand} alt=""/>
        {/* <p>{brand.name}</p> */}
      </div>
    </div>
  );
};

export default Card;
