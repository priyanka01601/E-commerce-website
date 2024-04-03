import React,{createContext} from "react";
// import all_product from "../components/Assets/all_product";


export const ShopContext=createContext(null);

const getDefaultCart=()=>{
    let cart={};
    for (let index = 0; index < 300+1; index++) {
        cart[index]=0;
    }
    return cart;
}
const ShopContextProvider=(props)=>{

    const [all_products,setAll_Products]=React.useState([]);
    const[all_categories, setAll_Categories]=React.useState([]);
    const[all_subcategories,setAll_Subcategories]=React.useState([]);
    const [all_brands,setAll_Brands]=React.useState([]);

    React.useEffect(() => {
        // Fetch products only if the products array is empty
        if (all_products.length === 0) {
          fetch("http://localhost:4000/allproducts")
            .then((resp) => resp.json())
            .then((data) => setAll_Products(data));
        }
      
        if (localStorage.getItem("auth-token")) {
          fetch("http://localhost:4000/getcart", {
            method: "POST",
            headers: {
              Accept: "application/form-data",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
            body: "",
          })
            .then((resp) => resp.json())
            .then((data) => setCartItems(data));
        }
      }, [all_products]);
      

    React.useEffect(()=>{
        fetch("http://localhost:4000/categories")
        .then((resp)=>resp.json())
        .then((data)=>setAll_Categories(data));

        if(localStorage.getItem("auth-token")){
            fetch("http://localhost:4000/getcart",{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    "auth-token":`${localStorage.getItem("auth-token")}`,
                    "Content-Type":"application/json",
                },
                body:""

            }).then((resp)=>resp.json())
            .then((data)=>setCartItems(data));
        }
    },[]);
    React.useEffect(()=>{
        fetch("http://localhost:4000/brands")
        .then((resp)=>resp.json())
        .then((data)=>setAll_Brands(data));

        if(localStorage.getItem("auth-token")){
            fetch("http://localhost:4000/getcart",{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    "auth-token":`${localStorage.getItem("auth-token")}`,
                    "Content-Type":"application/json",
                },
                body:""

            }).then((resp)=>resp.json())
            .then((data)=>setCartItems(data));
        }
    },[]);
    React.useEffect(()=>{
        fetch("http://localhost:4000/subcategories")
        .then((resp)=>resp.json())
        .then((data)=>setAll_Subcategories(data));

        if(localStorage.getItem("auth-token")){
            fetch("http://localhost:4000/getcart",{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    "auth-token":`${localStorage.getItem("auth-token")}`,
                    "Content-Type":"application/json",
                },
                body:""

            }).then((resp)=>resp.json())
            .then((data)=>setCartItems(data));
        }
    },[]);



   const [cartItems,setCartItems]=React.useState(getDefaultCart());
   

   const addToCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(itemId);
        if(localStorage.getItem("auth-token")){
            fetch("http://localhost:4000/addtocart",{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    "auth-token":`${localStorage.getItem("auth-token")}`,
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({"itemId":itemId})
            })

            .then((resp)=>resp.json())
            .then((data)=>console.log(data))
        }
       
   }


   const removeFromCart=(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(localStorage.getItem("auth-token")){
        fetch("http://localhost:4000/removefromcart",{
            method:"POST",
            headers:{
                Accept:"application/form-data",
                "auth-token":`${localStorage.getItem("auth-token")}`,
                "Content-Type":"application/json",
            },
            body:JSON.stringify({"itemId":itemId})
        })

        .then((resp)=>resp.json())
        .then((data)=>console.log(data))
    }

    }

 
    const getTotalCartAmount=()=>{
        let totalAmount=0;
       
        for (const item in cartItems){
            if(cartItems[item]>0)
            {
                console.log("enetred");
                let itemInfo=all_products.find((product)=>product.id===Number(item));

                totalAmount += itemInfo.new_price * cartItems[item];

            }
            
            
        }

        return totalAmount;
            
        
    }

    const getTotalCartItems=()=>{
        let totalItem=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    }
    const contextValue={all_brands,all_products,all_categories,all_subcategories,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
