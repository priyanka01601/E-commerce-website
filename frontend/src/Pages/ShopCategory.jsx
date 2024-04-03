import React from "react";
import "./css/ShopCategory.css";
import { useContext,useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { ShopContext} from "../Context/ShopContext";
import dropdown_icon from "../components/Assets/dropdown_icon.png"
import Items from "../components/Items/Items";

const ShopCategory=()=>{
    // const propCategory = props.category.replace("/", "");


    const {all_products}=useContext(ShopContext);
    console.log(all_products)
    const { categoryId, subcategoryId } = useParams();
  
    console.log("categoryId:", categoryId);
    console.log("subcategoryId:", subcategoryId);
    const [priceFilter, setPriceFilter] = useState({ min: 0, max: 5000 });
    const [brandFilter, setBrandFilter] = useState(["All Brands"]);
    const [ratingFilter, setRatingFilter] = useState(0);
    
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    useEffect(() => {
        setCurrentPage(1); // Reset current page to 1 when category changes
      }, [categoryId,subcategoryId,brandFilter,priceFilter,ratingFilter]);
    const filterProducts = (products) => {
        return products.filter((product) => {
          const withinPriceRange =
            product.new_price >= priceFilter.min && product.new_price <= priceFilter.max;
            
            const isCategory= categoryId===product.category._id;
            console.log(isCategory);
           
          const isBrandSelected = brandFilter.length === 0 || (brandFilter.includes("All Brands") && true) || brandFilter.includes(product.brand.name);
          let isSubcategory=true;
          const hasMinimumRating=true;
          if (subcategoryId !== undefined && product.subcategory !== undefined)
          isSubcategory = subcategoryId === product.subcategory._id;

          // hasMinimumRating = product.rating >= ratingFilter;
    
          return withinPriceRange && isBrandSelected  && isCategory &&isSubcategory && hasMinimumRating;
        });
      };
      const getUniqueBrands = () => {
        const uniqueBrands = [
            "All Brands",
          ...new Set(
            all_products
              .filter((product) => product.category._id === categoryId)
              .map((product) => product.brand.name)
          ),
        ];
        return uniqueBrands;
      };
      const handleBrandToggle = (brand) => {
        if (brand === "All Brands") {
          // If "All Brands" is selected, clear other brand filters
          setBrandFilter(["All Brands"]);
        } else if (brandFilter.includes("All Brands")) {
          // If "All Brands" was selected, remove it and add the selected brand
          setBrandFilter([brand]);
        } else if (brandFilter.includes(brand)) {
          // Remove brand if already selected
          setBrandFilter(brandFilter.filter((selectedBrand) => selectedBrand !== brand));
        } else {
          // Add brand if not selected
          setBrandFilter([...brandFilter, brand]);
        }
      };
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

   
      const filteredProducts = filterProducts(all_products);
      console.log("Products after filter",filteredProducts);
      const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    
    return (
        <div className="shop-category">
             {/* <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt=""/>
                </div>
            </div> */}
            <div className="shopcategory-container">
            <div className="shopcategory-filters">
        {/* Price Range Slider */}
        <div className="price-filter">
          <label>PRICE RANGE:</label>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceFilter.min}
            onChange={(e) => setPriceFilter({ ...priceFilter, min: parseInt(e.target.value) })}
          />
          <div><span>&#x20B9;{priceFilter.min}</span> - <span>&#x20B9;{priceFilter.max}</span></div>
        </div>
        

        {/* Brand Checkboxes */}
        <div className="brands-filter">
          <label>BRANDS:</label>
          {getUniqueBrands().map((brand) => (
            <label className="brands-label" key={brand}>
              <input
                type="checkbox"
                checked={brandFilter.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
              />
              {brand}
            </label>
          ))}
          
        </div>
        <div className="rating-filter">
          <label>MINIMUM RATING:</label>
          <select value={ratingFilter} onChange={(e) => setRatingFilter(parseInt(e.target.value))}>
            {[0, 1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="shopcategory-products">
                {currentProducts.map((item,i)=>{
                    if(categoryId===item.category._id)
                    {
                       
                        return <Items key={i} id={item._id} name={item.name} image={item.mainImage}
                        new_price={item.new_price} old_price={item.old_price}
                         />

                    }

                })}
            </div>
      </div>
      {filteredProducts.length > productsPerPage && (
  <div className="pagination">
    {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
      <span
        key={index + 1}
        className={currentPage === index + 1 ? "active" : ""}
        onClick={() => handlePageChange(index + 1)}
      >
        {index + 1}
      </span>
    ))}
  </div>
)}

      

        </div>
    )
}

export default ShopCategory;
