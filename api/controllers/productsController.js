import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import { errorHandler } from "../middleware/errorHandler.js";

//Get all products
export const getAllProduct = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let tag = req.query.tags;

    if (tag === undefined) {
      tag = { $in: ["books", "sports", "stationary", "others"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const products = await Product.find({
      name: { $regex: searchTerm, $options: "i" },
      tag,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

//Get product by id
export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

//add product
export const addProduct = async (req, res) => {
  const { name, description, price, age, image, tags, userRef } = req.body;

  try {
    // Validate input
    if (!name || !price || !image || !tags || !userRef) {
      return next(errorHandler(400, "Missing required fields!"));
    }

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      age,
      image,
      userRef,
      tags,
    });

    // Save the product to the database
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res
      next(error)
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    // Delete the product from the database
    await product.remove();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error)
  }
};

//update product
export const updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(errorHandler(404, "Product not found!"));
  }

  if (req.user.id !== product.userRef) {
    return next(errorHandler(401, "You can only update your own product!"));
  }

  try {
    const updatedProduct = await findByIdAndUpdate(req.pramas.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
