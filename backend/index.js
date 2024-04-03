import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
const { ObjectId } = mongoose.Types;
import fs from 'fs';

dotenv.config();
const port=process.env.PORT || 4000;

const app=express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//  Daatabase connection with Mongodb
// mongoose.connect("mongodb+srv://priyanka01kansal:p01601K@cluster0.oxvp0fl.mongodb.net/e-commerce");
mongoose.connect("mongodb+srv://aryankaushal923:IUNHx3GBKH595EYj@cluster0.rlhddo5.mongodb.net/cutes-cosmetics")
// API Creation



app.get("/",(req,res)=>{
    res.send("Express App is running");

});

// image storage engine

// const storage=multer.diskStorage({
//     destination:"./upload/images",
//     filename:(req,file,cb)=>{
//         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }

// });

// const upload=multer({storage:storage});
// Update storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isMainImage = file.fieldname === "mainImage";
    const isSideImage = file.fieldname === "sideImages";
    const isBrandImage = file.fieldname === "brand_image"; // New check

    let uploadPath = "./upload";

    if (isMainImage || isSideImage) {
      uploadPath += "/product_images";

      if (isMainImage) {
        uploadPath += "/main_images";
      } else if (isSideImage) {
        uploadPath += "/side_images";
      }
    } else if (isBrandImage) {
      uploadPath += "/brand_images";
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    try {
      const uniqueIdentifier = uuidv4();
      const uniqueFileName = `${file.fieldname}_${uniqueIdentifier}${path.extname(file.originalname)}`;
      cb(null, uniqueFileName);
    } catch (error) {
      console.error("Error generating filename:", error);
      cb(error, null);
    }
  },
});

  // Update upload middleware
  const upload = multer({ storage: storage });
  

//Creating upload endpint for image

// app.use("/images",express.static("upload/images"))

// app.post("/upload",upload.single("product"),(req,res)=>{
//     res.json({
//         success:1,
//         image_url: `http://localhost:${port}/images/${req.file.filename}`

//     })

// });

// Update upload endpoints
app.use("/product_images", express.static("upload/product_images"));
app.use("/brand_images", express.static("upload/brand_images"));

app.post("/upload_product_image", upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'sideImages', maxCount: 8}]), async(req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);
    const mainImage = req.files['mainImage'][0];
    const sideImages = req.files['sideImages'];

    const mainImageUrl = mainImage
      ? `http://localhost:${port}/product_images/main_images/${mainImage.filename}`
      : null;

      const sideImageUrls = sideImages.map(file => ({
        url: `http://localhost:${port}/product_images/side_images/${file.filename}`
      }));
      
    console.log("Side Image URLs:", sideImageUrls);
      

    res.json({
      success: 1,
      mainImageUrl: mainImageUrl,
      sideImageUrls: sideImageUrls
    });
  } catch (error) {
    console.error("Error uploading product images:", error);
    res.status(500).json({ success: 0, error: "Internal Server Error" });
  }
});


app.post("/upload_brand_image", upload.single("brand_image"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/brand_images/${req.file.filename}`
  });
});


const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});
const Banner=mongoose.model('Banner', bannerSchema,'Banner');
//schema for category
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],
  });
  
const Category=mongoose.model('Category', categorySchema,'Category');

//schema for subcategories

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

const Subcategory=mongoose.model('Subcategory', subcategorySchema,'Subcategory');

const brandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, 
  });
const Brand=mongoose.model('Brand', brandSchema, 'Brand');



//schema for reviews
const reviewSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    review_text: { type: String },
    date: { type: Date, default: Date.now },
  });
const Review= mongoose.model('Review', reviewSchema, 'Review');

//schema for products
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mainImage: {type: String,required: true },
    sideImages: [{ type: String, required: true }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    date: { type: Date, default: new Date() },
    available: { type: Boolean, default: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  });

const Product=mongoose.model('Product', productSchema,'Product');
//schema for cart
const cartSchema= new mongoose.Schema({
    items: {
      type: Object,
      default: {},
    },
  });
const Cart=mongoose.model('Cart', cartSchema,"Cart");
//schema for users
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
      },
    date: { type: Date, default: Date.now },
  });
const User=mongoose.model('User', userSchema,'User');

app.get("/banners", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to add a new banner
app.post("/addbanner", async (req, res) => {
  const { image } = req.body;

  try {
    const newBanner = new Banner({ image });
    await newBanner.save();
    res.json({ success: true, message: "Banner added successfully" });
  } catch (error) {
    console.error("Error adding banner:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to delete a banner
app.delete("/deletebanner/:id", async (req, res) => {
  const bannerId = req.params.id;

  try {
    const deletedBanner = await Banner.findByIdAndDelete(bannerId);

    if (!deletedBanner) {
      return res.status(404).json({ error: "Banner not found" });
    }

    res.json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Endpoint to add category
app.post("/addcategory", async (req, res) => {
    try {
      const newCategory = new Category({
        name: req.body.name,
        
      });
  
      await newCategory.save();
      res.json({
        success: true,
        name: req.body.name,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//get categories
app.get('/categories', async (req, res) => {
    try {
      const categories = await Category.find({}).populate('subcategories');
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//get category and subcategory based on the product
app.get('/categories/subcategories/:subcategoryId', async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;

    // Fetch subcategory data including the associated category
    const subcategory = await Subcategory.findById(subcategoryId).populate('category');

    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    const category = subcategory.category;

    console.log('Fetched category:', category);
    console.log('Fetched subcategory:', subcategory);

    res.json({ category: category.name, subcategory: subcategory.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// app.get('/category/:categoryId', async (req, res) => {
//   const categoryId = req.params.categoryId;

//   try {
//     const category = await Category.findById(categoryId);

//     if (!category) {
//       return res.status(404).json({ error: 'Category not found' });
//     }

//     res.json(category);
//   } catch (error) {
//     console.error('Error fetching category:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
//update category
app.put('/updatecategory/:categoryId', async (req, res) => {
    try {
      const { name } = req.body;
      const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, { name }, { new: true });
      res.json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

//remove category
app.delete('/removecategory/:categoryId', async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
  
      // Find the category by ID
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Remove all subcategories associated with the category
      await Subcategory.deleteMany({ _id: { $in: category.subcategories } });

      await Product.deleteMany({ category: categoryId });
  
      // Remove the category itself
      await Category.findByIdAndDelete(categoryId);
  
      res.json({ success: true, message: 'Category removed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

//add subcategory
app.post('/addsubcategory', async (req, res) => {
  try {
    console.log(req.body);
    const {categoryName, subcategories } = req.body;

    const category = await Category.findOne({ name: categoryName }).exec();
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Assuming subcategories is an array of strings
    const newSubcategories = await Promise.all(
      subcategories.map(async (sub) => {
        const newSubcategory = new Subcategory({ name: sub, category: category._id });
        await newSubcategory.save();
        return newSubcategory._id;
      })
    );

    // Update the category's subcategories array
    category.subcategories.push(...newSubcategories);
    await category.save();

    res.json(newSubcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error',message:error.message });
  }
});

//delete subcategory

app.delete('/removesubcategory/:subcategoryId', async (req, res) => {
    try {
      const subcategoryId = req.params.subcategoryId;
      
      // Find the subcategory by ID
      const subcategory = await Subcategory.findById(subcategoryId);
      if (!subcategory) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
      
      await Product.deleteMany({ subcategory: subcategoryId });

      // Remove the subcategory from its associated category's subcategories array
      const category = await Category.findById(subcategory.category);
      category.subcategories = category.subcategories.filter(sub => sub.toString() !== subcategoryId);
      await category.save();
  
      // Remove the subcategory itself
      await Subcategory.findByIdAndDelete(subcategoryId);
  
      res.json({ success: true, message: 'Subcategory removed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' , message: error.message});
    }
  });
app.get('/subcategories', async (req, res) => {
    try {
      const subcategories = await Subcategory.find({}).populate('category');
      res.json(subcategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// Update the endpoint to fetch subcategories based on the category's subcategories array
app.get('/subcategories/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Fetch the category to get its subcategories array
    const category = await Category.findById(categoryId).populate('subcategories');


    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const subcategories = category.subcategories;

    console.log('Fetched subcategories:', subcategories); // Add this line to log the subcategories

    res.json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


 app.put('/updatesubcategory/:subcategoryId', async (req, res) => {
    try {
        const { name, categoryId } = req.body;
        const subcategoryId = req.params.subcategoryId;

        // Step 1: Retrieve the current subcategory information
        const existingSubcategory = await Subcategory.findById(subcategoryId);
        if (!existingSubcategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }

        // Check if the category is being updated
        if (categoryId !== existingSubcategory.category.toString()) {
            // Step 2: Update references in the old category
            const oldCategory = await Category.findById(existingSubcategory.category);
            oldCategory.subcategories = oldCategory.subcategories.filter(sub => sub.toString() !== subcategoryId);
            await oldCategory.save();

            // Step 3: Update references in the new category
            const newCategory = await Category.findById(categoryId);
            if (!newCategory) {
                return res.status(404).json({ error: 'New category not found' });
            }
            newCategory.subcategories.push(subcategoryId);
            await newCategory.save();
        }

        // Step 4: Update the subcategory information
        const updatedSubcategory = await Subcategory.findByIdAndUpdate(
            subcategoryId,
            { name, category: categoryId },
            { new: true }
        );

        res.json(updatedSubcategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//add brand
app.post('/addbrand', async (req, res) => {
    try {
      const { name, image } = req.body;
      const newBrand = new Brand({ name, image });
      await newBrand.save();
      res.json(newBrand);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//delete brand
app.delete('/removebrand/:brandId', async (req, res) => {
    try {
      const brandId = req.params.brandId;
  
      // Find the brand by ID
      const brand = await Brand.findById(brandId);
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' });
      }
      
      if (brand.image) {
        const ImagePath = `./upload/brand_images/${path.basename(brand.image)}`;
        fs.unlinkSync(ImagePath);
      }
      // Remove all products associated with the brand
      await Product.deleteMany({ brand: brandId });
  
      // Remove the brand itself
      await Brand.findByIdAndDelete(brandId);
  
      res.json({ success: true, message: 'Brand and associated products removed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//get brands
app.get('/brands', async (req, res) => {
    try {
      const brands = await Brand.find({});
      res.json(brands);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//edit brand
app.put('/updatebrand/:brandId', async (req, res) => {
    try {
      const { name, image } = req.body;
      const updatedBrand = await Brand.findByIdAndUpdate(req.params.brandId, { name, image }, { new: true });
      res.json(updatedBrand);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// Endpoint to add a product
app.post("/addproduct", upload.single("product_image"), async (req, res) => {
    try {
      const product = new Product({
        name: req.body.name,
        mainImage: req.body.mainImage,
        sideImages: req.body.sideImages,
         // Update with the uploaded product image URL
        category: req.body.category,
        subcategory: req.body.subcategory,
        brand: req.body.brand,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        stock: req.body.stock, // Add stock field
      });
  
      await product.save();
      res.json({
        success: true,
        name: req.body.name,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
//updating products
app.put('/updateproduct/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Validate if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product fields based on request body
    product.name = req.body.name || product.name;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
    product.subcategory = req.body.subcategory || product.subcategory;
    product.brand = req.body.brand || product.brand;
    product.new_price = req.body.new_price || product.new_price;
    product.old_price = req.body.old_price || product.old_price;
    product.stock = req.body.stock || product.stock;
    product.date = req.body.date || product.date;
    product.available = req.body.available || product.available;

    // Save the updated product
    await product.save();

    res.json({ success: true, message: 'Product updated successfully', updatedProduct: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// creating API fro deleting products

app.delete('/removeproduct/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }
  
      // Remove the product images from the uploads folder
      if (product.mainImage) {
        const mainImagePath = `./upload/product_images/main_images/${path.basename(product.mainImage)}`;
        fs.unlinkSync(mainImagePath);
      }
  
      if (product.sideImages && product.sideImages.length > 0) {
        for (const sideImage of product.sideImages) {
          const sideImagePath = `./upload/product_images/side_images/${path.basename(sideImage)}`;
          fs.unlinkSync(sideImagePath);
        }
      }
  
      // Remove the product itself
      await Product.findByIdAndDelete(productId);
  
      res.json({ success: true, message: 'Product removed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to update product stock (e.g., decrease stock after purchase)
app.put("/updatestock/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const { quantity } = req.body;
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      product.stock -= quantity;
      await product.save();
  
      res.json({ success: true, message: 'Stock updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Endpoint to restock product
  app.put("/restock/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const { quantity } = req.body;
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      product.stock += quantity;
      await product.save();
  
      res.json({ success: true, message: 'Product restocked successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// creating API to display all products

app.get('/allproducts', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .populate('brand', 'name');

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const products = await Product.findById(productId);
    res.json(products);
  } catch (error) {
    console.error('Error fetching product with given id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/shopcategory/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ category: categoryId });
    res.json(products);
  } catch (error) {
    console.error('Error fetching product with given id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/shopcategory/:subcategoryId', async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const products = await Product.find({ subcategory: subcategoryId });
    res.json(products);
  } catch (error) {
    console.error('Error fetching product with given id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Schema creating for user model

// const Users=mongoose.model("Users",{
//     name:{
//         type:String,

//     },
//     email:{
//         type:String,
//         unique:true,
//     },
//     password:
//     {
//         type:String,
//     },

//     cartData:{
//         type:Object
//     },
//     date:{
//         type:Date,
//         default:Date.now(),
//     }
    
// });

// Creating endpoint for registering the user

app.post("/signup",async(req,res)=>{
    try {
        // Check if the user with the provided email already exists
        let existingUser = await User.findOne({ email: req.body.email });
    
        if (existingUser) {
          return res.status(400).json({
            success: false,
            errors: "User with the same email address already exists",
          });
        }
        if (req.body.password !== req.body.confirmPassword) {
          return res.status(400).json({
              success: false,
              errors: "Password and Confirm Password do not match",
          });
      }
      

        // Create a new cart for the user
        const cart = new Cart({
          items: {},
        });
    
        // Save the cart to the database
        await cart.save();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Create a new user with a reference to the cart
        const user = new User({
          name: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          cart: cart._id, // Assign the ID of the newly created cart
        });
    
        // Save the user to the database
        await user.save();
    
        // Generate a token for authentication
        const token = jwt.sign({ user: { id: user._id } }, "priy@n18101_secret%sign");
    
        res.json({
          success: true,
          token,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

//creating login user endpoint

app.post("/login", async(req,res)=>{
    let user=await  User.findOne({email:req.body.email});
    if(user){
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if(passwordMatch)
        {
            const data={
                user:{
                    id:user.id
                }
            }

            const token=jwt.sign(data,"priy@n18101_secret%sign");
            res.json({
                success:true,
                token
            })
        }
        else{
            res.json({success:false,errors:"Wrong password"});
        }
    }
    else{
        res.json({success:false,
        errors:"Wrong email id"})
    }
});


//creating endpoint for new collection data

app.get("/newcollections",async(req,res)=>{
    let products=await Product.find({});

    let newcollection=products.slice(1).slice(-8);
    console.log("New collection fetched");
    res.send(newcollection);

})

//creating endpoint for popular in women category

app.get("/popularinwomen",async(req,res)=>{
    let products=await Product.find({category:"women"});
    let popular_in_women=products.slice(0,4);
    console.log("popular in women fetched")
    res.send(popular_in_women);
})


// creating middleware to fetch user

const fetchUser=async(req,res,next)=>{
    const token=req.header("auth-token");
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try {
            const data=jwt.verify(token,"priy@n18101_secret%sign");
            req.user=data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using a vslid token"});
            
        }
    }


}
//craeting endpoint for adding product in cartdata

app.post("/addtocart",fetchUser,async(req,res)=>{

    // console.log(req.body,req.user);

    try {
        // Find the user and their associated cart
        let user = await User.findOne({ _id: req.user.id }).populate('cart');
    
        // If the user doesn't have a cart yet, create one
        if (!user.cart) {
          const cart = new Cart({ items: {} });
          await cart.save();
          user.cart = cart;
        }
    
        // Increment the quantity of the item in the cart
        const itemId = req.body.itemId;
        const cartItems = user.cart.items || {};
    
        cartItems[itemId] = (cartItems[itemId] || 0) + 1;
        user.cart.items = cartItems;
    
        // Save the updated user and cart
        await user.save();
    
        res.json({ success: true, message: "Added to cart" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});
//creating endpoint to remove product from cartdata

app.post("/removefromcart",fetchUser,async(req,res)=>{
    try {
        let user = await User.findOne({ _id: req.user.id }).populate('cart');
    
        if (user.cart && user.cart.items[req.body.itemId] > 0) {
          user.cart.items[req.body.itemId] -= 1;
          await user.cart.save();
        }
    
        res.json({ success: true, message: "Removed from cart" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});
//creating endpoint to get cart data

app.post("/getcart",fetchUser,async(req,res)=>{
    try {
        let user = await User.findOne({ _id: req.user.id }).populate('cart');
        
        if (user.cart) {
          res.json(user.cart.items);
        } else {
          res.json({});
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});


//add review
app.post('/addreview', fetchUser, async (req, res) => {
    try {
      const { productId, rating, reviewText } = req.body;
      const user = req.user; // Assuming fetchUser middleware adds user information to req
  
      const review = new Review({
        product: productId,
        user: req.user.id,
        rating,
        review_text: reviewText,
      });
  
      await review.save();
  
      // Add the review to the product's reviews array
      await Product.findByIdAndUpdate(
        productId,
        { $push: { reviews: review._id } },
        { new: true }
      );
  
  
      res.json({ success: true, message: 'Review added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

//edit review
app.put('/editreview/:reviewId', fetchUser, async (req, res) => {
    try {
      const { rating, reviewText } = req.body;
      const reviewId = req.params.reviewId;
  
      const review = await Review.findOneAndUpdate(
        { _id: reviewId, user: user._id },
        { rating, review_text: reviewText },
        { new: true }
      );
  
      if (!review) {
        return res.status(404).json({ success: false, message: 'Review not found or unauthorized' });
      }
  
      res.json({ success: true, message: 'Review updated successfully', review });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.delete('/removereview/:reviewId', fetchUser, async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
  
        const review = await Review.findOneAndRemove({
            _id: reviewId,
            user: req.user.id,
          });
      
  
      if (!review) {
        return res.status(404).json({ success: false, message: 'Review not found or unauthorized' });
      }
      await Product.findByIdAndUpdate(
        review.product,
        { $pull: { reviews: review._id } },
        { new: true }
      );
  
  
      res.json({ success: true, message: 'Review removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
  
  

app.listen(port,(err)=>{
    if(!err){
        console.log(`Server running on ${process.env.DEV_MODE} mode on port ${port}`);
    }
    else{
        console.log("Error : "+ err);
    }
});



