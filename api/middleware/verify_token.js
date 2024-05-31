import { verify } from "jsonwebtoken";
import dotenv from'dotenv';
dotenv.config();


export function auth(req , res , next){

    try{

    const token = req.cookies.Token || req.body.token || req.header("Authorization").replace( "Bearer " ,"" ) ;

    if( !token || token === undefined ){
        return next(errorHandler(401, "Unauthorized"));
    }
    
    try{
        const decode = verify( token , process.env.JWT_SECRET ) ;
        req.user = decode;  } 
    
    catch(error){
        return res.status(401).json({
            success : false,
            message : "Invalid token",  })
    }
    
    next();  }
    
    catch(error){
        return res.status(401).json({
            success : false,
            message : "Authentication failed",  })
    }
    
    }