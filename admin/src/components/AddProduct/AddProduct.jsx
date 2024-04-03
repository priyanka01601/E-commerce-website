import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import cross_icon from "../../assets/cross_icon.png";

const AddProduct = () => {
  const [mainImage, setMainImage] = React.useState(null);
  const [sideImages, setSideImages] = React.useState([]);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  var curr = new Date();
  var date = curr.toISOString().substring(0, 10);

  const [productDetails, setProductDetails] = React.useState({
    name: "",
    mainImage: null,
    sideImages: [], // Assuming an array for side images
    category: "",
    subcategory: "",
    brand: "",
    new_price: "",
    old_price: "",
    stock: 0,
    available: false,
    date: date,
  });
  useEffect(() => {
    // Fetch categories from your backend API
    fetch("http://localhost:4000/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch brands from your backend API
    fetch("http://localhost:4000/brands")
      .then((response) => response.json())
      .then((data) => {
        setBrands(data);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, []);

  // Fetch subcategories based on the selected category
  useEffect(() => {
    console.log(
      "Fetching subcategories for category:",
      productDetails.category
    );
    if (productDetails.category) {
      fetch(`http://localhost:4000/subcategories/${productDetails.category}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from server:", data);
          console.log("Fetched subcategories in frontend:", data); // Add this line to log the subcategories
          setSubcategories(data);
        })
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
        });
    }
  }, [productDetails.category]);

  useEffect(() => {
    // Update the availability field based on the stock value
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      available: prevDetails.stock > 0,
    }));
  }, [productDetails.stock]);
  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    // Remove "empty-field" class from all input and select elements when the component mounts
    document
      .querySelectorAll(".add-product input, .add-product select")
      .forEach((element) => {
        element.classList.remove("empty-field");
      });
  }, []);

  const Add_Product = async () => {
    setMessage({ type: "", content: "" });

    let product = { ...productDetails };
    const requiredFields = [
      "name",
      "old_price",
      "new_price",
      "category",
      "subcategory",
      "brand",
      "stock",
    ];
    const emptyFields = requiredFields.filter((field) => {
      const value = productDetails[field];
      // Check if the value is a string before calling trim
      return typeof value === "string" && value.trim() === "";
    });
    if (emptyFields.length > 0) {
      // Display error message
      setMessage({
        type: "error",
        content: "Please fill in all required fields.",
      });

      // Add a class to each empty field for styling
      emptyFields.forEach((emptyField) => {
        document
          .querySelector(`[name=${emptyField}]`)
          .classList.add("empty-field");
      });

      return;
    }

    let formData = new FormData();
    formData.append("mainImage", mainImage); // Use 'mainImage' instead of 'product'

    // Append side images
    for (let i = 0; i < sideImages.length; i++) {
      formData.append(`sideImages`, sideImages[i]);
    }
    console.log(formData);

    const response = await fetch("http://localhost:4000/upload_product_image", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    if (responseData.success) {
      product.mainImage = responseData.mainImageUrl;
      product.sideImages = responseData.sideImageUrls.map((image) => image.url);
      console.log("After adding images", product);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            // Display success message
            setMessage({ type: "success", content: "Product Added" });
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              setMessage({ type: "", content: "" });
              window.location.reload();
            }, 2000);
          } else {
            // Display error message
            setMessage({ type: "error", content: "Failed to add product." });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
    }
  };

  const mainImageHandler = (e) => {
    // Use the first file from the selected files

    setMainImage(e.target.files[0]);
    console.log("Selected main image:", e.target.files[0]);
  };

  const sideImageHandler = (e) => {
    // Use the spread operator to merge existing side images with newly selected ones
    setSideImages([...sideImages, ...e.target.files]);
    console.log("Selected side image:", e.target.files);
  };
  const removeSideImage = (index) => {
    // Create a copy of the sideImages array and remove the image at the specified index
    const updatedSideImages = [...sideImages];
    updatedSideImages.splice(index, 1);
    setSideImages(updatedSideImages);
  };

  return (
    <div className="add-form">

      {message.type === "success" && (
        <div className="success-message">{message.content}</div>
      )}
      {message.type === "error" && (
        <div className="error-message">{message.content}</div>
      )}
      <h2>Add Product</h2>
      <p>Fill below form - all are required fields</p>

      <div className="additem-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="type here"
          className={productDetails.name.trim() === "" ? "empty-field" : ""}
        />
      </div>

      <div className="addproduct-sidebyside">
        <div className="additem-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
            className={
              productDetails.old_price.trim() === "" ? "empty-field" : ""
            }
          />
        </div>

        <div className="additem-itemfield">
          <p>Offer price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
            className={
              productDetails.new_price.trim() === "" ? "empty-field" : ""
            }
          />
        </div>
      </div>
      <div className="addproduct-sidebyside">
        <div className="additem-itemfield">
          <p>Product Category</p>
          <select
            name="category"
            value={productDetails.category}
            onChange={changeHandler}
            className={`add-product-selector ${
              productDetails.category.trim() === "" ? "empty-field" : ""
            }`}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="additem-itemfield">
          <p>Product Subcategory</p>
          <select
            name="subcategory"
            value={productDetails.subcategory}
            onChange={changeHandler}
            className={`add-product-selector ${
              productDetails.subcategory.trim() === "" ? "empty-field" : ""
            }`}
          >
            <option value="" disabled>
              Select Subcategory
            </option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="additem-itemfield">
        <p>Product Brand</p>
        <select
          name="brand"
          value={productDetails.brand}
          onChange={changeHandler}
          className={`add-product-selector ${
            productDetails.brand.trim() === "" ? "empty-field" : ""
          }`}
        >
          <option value="" disabled>
            Select Brand
          </option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      <div className="addproduct-sidebyside">
        <div className="additem-itemfield">
          <p>Stock</p>
          <div className="stock-input">
            <input
              type="number"
              value={productDetails.stock}
              name="stock"
              onChange={changeHandler}
              className={productDetails.stock <= 0 ? "empty-field" : ""}
            />
          </div>
        </div>
        <div className="additem-itemfield">
          <p>Available</p>
          <input
            type="text"
            value={productDetails.available ? "Yes" : "No"}
            readOnly
          />
        </div>
      </div>

      <div className="additem-itemfield">
        <p>Date</p>
        <input
          type="date"
          value={productDetails.date}
          name="date"
          onChange={changeHandler}
        />
      </div>

      <div className="additem-itemfield">
        <p>Main Product Image</p>
        <label htmlFor="main-image-input">
          <img
            src={mainImage ? URL.createObjectURL(mainImage) : upload_area}
            className="addproduct-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={mainImageHandler}
          type="file"
          name="main-image"
          id="main-image-input"
          hidden
        />
      </div>

      <div className="additem-itemfield">
        <p>Upload Side Images</p>
        <input
          onChange={sideImageHandler}
          type="file"
          name="side-images"
          multiple
        />
        {/* Display preview of selected side images */}
        {sideImages.map((sideImage, index) => (
          <div key={index} className="image-container">
            <img
              src={URL.createObjectURL(sideImage)}
              className="add-thumbnail-img"
              alt={`Side Image ${index + 1}`}
            />
            <button
              className="remove-image-btn"
              onClick={() => removeSideImage(index)}
            >
              <img src={cross_icon} alt="Remove" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          Add_Product();
        }}
        className="add-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
