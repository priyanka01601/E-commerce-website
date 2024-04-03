import React from "react";
import "./Admin.css"
import Sidebar from "../../components/Sidebar/Sidebar";
import {Routes,Route} from "react-router-dom";
import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from "../../components/ListProduct/ListProduct";
import AddCategoryAndSubcategory from "../../components/AddCategory/AddCategory";
import AddBrand from "../../components/AddBrand/AddBrand";
import ListCategories from "../../components/ListCategories/ListCategories";
import ListBrand from "../../components/ListBrand/ListBrand";

const Admin=()=>{
    return (
        <div className="admin">
            <Sidebar/>
            <Routes>
                <Route path="/addproduct" element={<AddProduct/>}/>
                <Route path="/addcategory" element={<AddCategoryAndSubcategory/>}/>
                <Route path="/addbrand" element={<AddBrand/>}/>
                <Route path="/listproduct" element={<ListProduct/>}/>
                <Route path="/listcategory" element={<ListCategories/>}/>
                <Route path="/listbrand" element={<ListBrand/>}/>
                
                
            </Routes>
        </div>
    )
}

export default Admin 
