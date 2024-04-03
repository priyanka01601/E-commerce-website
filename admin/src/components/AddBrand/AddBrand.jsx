import React from "react";
import upload_area from "../../assets/upload_area.svg";
const AddBrand = () => {
  const [image, setImage] = React.useState(false);
  const [brand, setBrand] = React.useState({
    name: "",
    image: "",
  });

  const changeHandler = (e) => {
    setBrand({
      ...brand,
      [e.target.name]: e.target.value,
    });
  };
  const handleBrandSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    let formData = new FormData();
    formData.append("brand_image", image);

    try {
      // Upload brand image
      const imageResponse = await fetch(
        "http://localhost:4000/upload_brand_image",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const responseData = await imageResponse.json();

      if (responseData.success) {
        // Brand data
        const brandData = {
          name: brand.name,
          image: responseData.image_url,
        };

        // Add brand
        const brandResponse = await fetch("http://localhost:4000/addbrand", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(brandData),
        });

        const brandResult = await brandResponse.json();
        console.log(brandResult);

        if (brandResult.name && brandResult.image ) {
          alert("Brand Added");
        } else {
          alert("Failed");
        }
      } else {
        alert("Failed to upload brand image");
      }
    } catch (error) {
      console.error("Error adding brand:", error);
    }
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="add-form">
      <h2>Add Brand</h2>
      <div className="additem-itemfield">
        <label>
          Brand Name:
          <input
            type="text"
            value={brand.name}
            name="name"
            onChange={changeHandler}
            placeholder="type here"
          />
        </label>
      </div>

      <div className="additem-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="add-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        className="add-btn"
        type="submit"
        onClick={(e) => handleBrandSubmit(e)}
      >
        ADD
      </button>
    </div>
  );
};

export default AddBrand;
