import React, { useContext,useState} from "react";
import "./ProductDisplay.css"
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import FormatPrice from "../helpers/FormatPrice";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const ProductDisplay=(props)=>{
    const {product}=props;
    const {addToCart}=useContext(ShopContext);
    const [selectedImage, setSelectedImage] = useState(product.mainImage);
    const handleImageClick = (image) => {
        setSelectedImage(image);
      };
      const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => {
          const number = index + 0.5;
          return (
            <span key={index}>
              {rating >= index + 1 ? (
                <FaStar className="icon" />
              ) : rating >= number ? (
                <FaStarHalfAlt className="icon" />
              ) : (
                <AiOutlineStar className="empty-icon" />
              )}
            </span>
          );
        });
      };
    
    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.mainImage} alt='/'  onClick={() => handleImageClick(product.mainImage)}
                        className={selectedImage === product.mainImage ? "selected" : ""}/>
                    {product.sideImages.map((image, index) => (
                        <img 
                        key={index} 
                        src={image} 
                        alt=""
                        onClick={() => handleImageClick(image)}
                        className={selectedImage === image ? "selected" : ""}
                         />
    ))}
                   
                    {/* <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/>
                    <img src={product.image} alt=""/> */}
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={selectedImage}  alt=""/>
                </div>
            </div>

            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    {/* {renderStars(product.rating)} */}
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                    <FormatPrice price={product.old_price}/>
                    </div>

                    <div className="productdisplay-right-price-new">
                    <FormatPrice price={product.new_price}/>
                    </div>
                </div>

                <div className="productdisplay-right-description">
                    {/* {product.description_title} */}
                </div>

                {/* <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div> */}
                <button onClick={()=>{addToCart(product._id)}}>ADD TO CART</button>
                <p className="productdisplay-right-category">
                    <span>Category :</span>Women,   T-Shirt, Crop Top
                </p>
                <p className="productdisplay-right-category">
                    <span>Tags :</span>Modern, Latest
                </p>

            </div>


        </div>
    )
}

export default ProductDisplay
