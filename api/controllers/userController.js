

//get user
exports.getUser=async(req,res)=>{
    const userId=req.user.id;
    const user=await User.findById(userId);
    if(!user){
        return next(errorHandler(404, "Product not found!"));
    }
}