import {React,useState,useEffect} from "react";
import "./Breadcrum.css"
import arrow_icon from "../Assets/breadcrum_arrow.png"

const Breadcrum=(props)=>{
    const {product}=props;
    console.log("In breadcrum",product)
    const [breadcrumData, setBreadcrumData] = useState({ category: "", subcategory: "" });
    useEffect(() => {
        // Fetch category and subcategory details based on product.category and product.subcategory
        const fetchBreadcrumData = async () => {
            try {
                const categoryResponse=await fetch(`http://localhost:4000/categories/subcategories/${product.subcategory._id}`);
                const categoryData = await categoryResponse.json();
                setBreadcrumData((prevData) => ({ ...prevData, category: categoryData.category,subcategory:categoryData.subcategory }));

            } catch (error) {
              console.error("Error fetching breadcrum data:", error);
            }
          };          
        fetchBreadcrumData();
      }, [product.category, product.subcategory]);
      return (
        <div className="breadcrum">
          HOME <img src={arrow_icon} alt="" /> SHOP{" "}<img src={arrow_icon} alt="" />
          {breadcrumData.category } <img src={arrow_icon} alt="" /> {breadcrumData.subcategory } <img src={arrow_icon} alt="" />
          {product.name}
        </div>
      );
}

export default Breadcrum;
