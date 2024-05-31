import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required:true
    },
    description: {
      type: String,
    },
    price:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
    },
    image:{
        type:String,
        required:true,
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
