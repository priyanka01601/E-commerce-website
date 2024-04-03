import React from "react";
import "./WhyChooseUs.css"; // Import the corresponding CSS file
import delivery from "../Assets/delivery.png"
import genuine_products from "../Assets/genuine_products.png"
import secure_payment from "../Assets/secure_payments.png"

const WhyChooseUs = () => {
  const points = [
    {
      title: "100% Genuine Products",
      description: "We guarantee that all our products are authentic and of the highest quality.",
      image: genuine_products, // Replace with your actual image
    },
    {
        title: "Hassle-free Delivery",
        description: "Experience hassle-free and timely delivery right to your doorstep.",
        image: delivery, // Replace with your actual image
      },
    {
      title: "Secure Payments & COD",
      description: "Shop with confidence using our secure payment options, including Cash on Delivery (COD).",
      image: secure_payment, // Replace with your actual image
    },
  
  ];

  return (
    <div className="why-choose-us">
      <div className="choose-us-heading"><h1>Why Choose Us?</h1></div>
      <div className="choose-us-points">
      {points.map((point, index) => (   
        <div className="choose-us-item" key={index}>
          <img src={point.image} alt={`point-${index}`} className="choose-us-image" />
          <h3 className="choose-us-title">{point.title}</h3>
          <p className="choose-us-description">{point.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default WhyChooseUs;
