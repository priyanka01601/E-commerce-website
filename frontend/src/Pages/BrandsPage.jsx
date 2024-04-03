import React from 'react'
// import brandImages from "../../src/components/Assets/brandImages"
import { useContext } from 'react';
import "./css/BrandPage.css"
import Card from '../components/Card/Card';
import { ShopContext } from '../Context/ShopContext';

const BrandsPage = () => {
  const {all_brands}=useContext(ShopContext);
  return (
    <div className='brands-container'>
      <div className="brands-list">
        {all_brands.map((brand) => (
          <Card key={brand} brand={brand.image} />
        ))}
      </div>
    </div>
  )
}

export default BrandsPage;
