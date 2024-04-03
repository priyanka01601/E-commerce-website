import React from "react";
import "./ListCategories.css";
import cross_icon from "../../assets/cross_icon.png";
import edit_icon from "../../assets/edit_icon.png";

const ListCategories = () => {
  const [allcategories, setAllCategories] = React.useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/categories")
      .then((res) => res.json())
      .then((data) => {
        setAllCategories(data);
      });
  };

  React.useEffect(() => {
    fetchInfo();
  }, []);

  const remove_category = async (categoryId) => {
    await fetch(`http://localhost:4000/removecategory/${categoryId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    await fetchInfo();
  };

  return (
    <div className="list-category">
      <h1>All Categories and Subcategories List</h1>
      <div className="listcategory-format-main">
        <p>Category Name</p>
        <p>Subcategories</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>

      <div className="listcategory-allcategory">
        <hr />
        {allcategories.map((category, index) => {
          return (
            <>
              {" "}
              <div
                key={index}
                className="listcategory-format-main listcategory-format"
              >

                <p>{category.name}</p>
                <div>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <p key={subIndex}>{subcategory.name}</p>
                  ))}
                  </div>
                  

                <div  >
                  <img
                    src={edit_icon}
                    alt=""
                    className="listcategory-edit-icon"
                  />
                </div>

                <img
                  onClick={() => remove_category(category._id)}
                  src={cross_icon}
                  alt=""
                  className="listcategory-remove-icon"
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

export default ListCategories;
