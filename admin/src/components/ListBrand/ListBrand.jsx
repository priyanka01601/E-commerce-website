import React from "react";
import "./ListBrand.css";
import cross_icon from "../../assets/cross_icon.png";
import edit_icon from "../../assets/edit_icon.png";

const ListBrand = () => {
    const [allbrands,setAllBrands]=React.useState([]);
    const fetchInfo=async()=>{
        await fetch("http://localhost:4000/brands")
        .then((res)=>res.json())
        .then((data)=>{setAllBrands(data)});
    }

    React.useEffect(()=>{
        fetchInfo();
    },[]);

    const remove_brand = async (brandId) => {
        await fetch(`http://localhost:4000/removebrand/${brandId}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        await fetchInfo();
      };

  return (
    <div className="list-brand">
      <h1>All Brands List</h1>
      <div className="listbrand-format-main">
        <p>Brand</p>
        <p>Brand Name</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>

      <div className="listbrand-allbrands">
        <hr />
        {allbrands.map((brand, index) => {
          return (
            <>
              {" "}
              <div
                key={index}
                className="listbrand-format-main listbrand-format"
              >
                <img
                  src={brand.image}
                  alt=""
                  className="listbrand-brand-icon"
                />
                <p>{brand.name}</p>

                <div><img src={edit_icon} alt="" className="listbrand-edit-icon" /></div>
                
                <img
                  onClick={() => remove_brand(brand._id)}
                  src={cross_icon}
                  alt=""
                  className="listbrand-remove-icon"
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListBrand;
