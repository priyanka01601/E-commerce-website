import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [editedProduct, setEditedProduct] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Fetch the product details based on the productId
    fetch(`http://localhost:4000/product/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setEditedProduct(data); // Initialize editedProduct with the fetched data
      });
  }, [productId]);

  const handleInputChange = (e) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProduct = async () => {
    // Send a PUT request to update the product
    await fetch(`http://localhost:4000/updateproduct/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    });

    // Redirect to the product list page after updating
    history.push("/product-list");
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={editedProduct.name || ""}
        onChange={handleInputChange}
      />
      <label>Old Price:</label>
      <input
        type="text"
        name="old_price"
        value={editedProduct.old_price || ""}
        onChange={handleInputChange}
      />
      <label>New Price:</label>
      <input
        type="text"
        name="new_price"
        value={editedProduct.new_price || ""}
        onChange={handleInputChange}
      />
      {/* Add more input fields for other product details */}
      <button onClick={handleUpdateProduct}>Update Product</button>
    </div>
  );
};

export default EditProduct;
