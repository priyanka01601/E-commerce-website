import React, { useState, useEffect } from "react";
import "./AddCategory.css";

const AddCategoryAndSubcategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch existing categories from the server
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new category
      const categoryResponse = await fetch(
        "http://localhost:4000/addcategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );

      const categoryData = await categoryResponse.json();

      // Update the list of categories
      fetchCategories();

      // Save the category ID for adding subcategories
      const categoryId = categoryData._id;

      // Prepare subcategories with name field
      const subcategoriesWithNames = subcategories.map((sub) => sub.trim());

      // Send a POST request to add multiple subcategories
      await fetch("http://localhost:4000/addsubcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId: categoryId,
          categoryName: categoryName,
          subcategories: subcategoriesWithNames, // Include the name field for each subcategory
        }),
      });

      // Clear the input fields
      setCategoryName("");
      setSubcategories([]);
    } catch (error) {
      console.error("Error adding category and subcategories:", error);
    }
  };

  const handleAddSubcategory = () => {
    setSubcategories([...subcategories, subcategoryName]);
    setSubcategoryName("");
  };

  return (
    <div className="add-form">
      <h2>Add Category and Subcategory</h2>
      <form onSubmit={handleCategorySubmit}>
        <div className="additem-itemfield">
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </label>
        </div>
        {subcategories.map((sub, index) => (
          <div key={index} className="additem-itemfield">
            <label>
              Subcategory {index + 1}:
              <input
                type="text"
                value={sub}
                onChange={(e) => {
                  const updatedSubcategories = [...subcategories];
                  updatedSubcategories[index] = e.target.value;
                  setSubcategories(updatedSubcategories);
                }}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddSubcategory} className="addsubcategory-btn" >
          Add Subcategory + 
        </button >
        <br></br>
        <button className="add-btn" type="submit">ADD</button>
      </form>
    </div>
  );
};

export default AddCategoryAndSubcategory;
