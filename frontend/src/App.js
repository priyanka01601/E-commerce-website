import './App.css';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Footer from './components/Footer/Footer';
import Navbar from "./components/Navbar/Navbar"
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {menuItemData} from "./components/Assets/MenuItemData"
import Carousel from './components/Carousel/Carousel';
import ErrorPage from './components/ErrorPage/ErrorPage';
import BrandsPage from './Pages/BrandsPage';



function App() {
  return (
    <div >
      
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop/>}/>
{/* 
        {menuItemData.map((category) => (
          <Route
            key={category.url}
            path={category.url}
            element={<ShopCategory category={category.url} subcategories={category.submenu} />}
          />
        ))}
        
        {menuItemData.map((category) =>
          category.submenu &&
          category.submenu.map((subcategory) => (
            <Route
              key={subcategory.url}
              path={subcategory.url}
              element={<ShopCategory category={category.url} subcategory={subcategory.url} />}
            />
          ))
        )} */}

        <Route path="/shopcategory/:categoryId" element={<ShopCategory />} />
        <Route path="/shopcategory/:categoryId/:subcategoryId" element={<ShopCategory />} />

        <Route path="/product" element={<Product/>}>
          <Route path=":productId" element={<Product/>}/>
        </Route>

        <Route path="/brands" element={<BrandsPage/>}/>
        <Route path="/cart" element={<Cart/>}/>

        <Route path="/login" element={<LoginSignup/>}/> 

        <Route path ="*" element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
