import React from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import edit_icon from "../../assets/edit_icon.png";

const ListProduct=()=>{

    const [allproducts,setAllProducts]=React.useState([]);

    const fetchInfo=async()=>{
        await fetch("http://localhost:4000/allproducts")
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)});
    }

    React.useEffect(()=>{
        fetchInfo();
    },[]);

    const remove_product = async (productId) => {
        await fetch(`http://localhost:4000/removeproduct/${productId}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        await fetchInfo();
      };


    return (
        <div className="list-product">
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Subcategory</p>
                <p>Brand</p>
                <p>Date Created</p>
                <p>Stock</p>
                <p>Is Available?</p>
                <p>Edit</p>
                <p>Remove</p>
            </div>

            <div className="listproduct-allproducts">
                <hr/>
                {allproducts.map((product,index)=>{
                    return <> <div key={index} className="listproduct-format-main listproduct-format">
                        <img src={product.mainImage} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>&#8377;{product.old_price}</p>
                        <p>&#8377;{product.new_price}</p>
                        <p>{product.category.name || 'Unknown Category'}</p>
                        <p>{product.subcategory.name || 'Unknown Subcategory'}</p>
                        <p>{product.brand.name || 'Unknown Brand'}</p>
                        <p>{product.date}</p>
                        <p>{product.stock}</p>
                        <p>{product.available ? "Yes" : "No"}</p>
 
                        <img src={edit_icon} alt="" className="listproduct-edit-icon" />
                        <img onClick={() => remove_product(product._id)} src={cross_icon} alt="" className="listproduct-remove-icon" />
 

                    </div>
                    <hr/>
                    </>
                })} 
            </div>

        </div>
    )
}

export default ListProduct
