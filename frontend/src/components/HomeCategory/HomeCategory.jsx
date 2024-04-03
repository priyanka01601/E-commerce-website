import React from 'react';
import Card from '../Card/Card';

const HomeCategory = () => {
  return (
    <div className="category">
        {categoryData.map((category, index) => (
        <Card key={index} category={category} />
      ))} 
    </div>
  )
}

export default HomeCategory
