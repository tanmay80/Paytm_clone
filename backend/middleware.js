const JWT_SECRET = require("./config")
const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({
            message:"Unauthorized"
        });
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded= jwt.verify(token,JWT_SECRET);
        console.log(decoded);
        if(decoded.userid){
            req.userId=decoded.userid;    
            next();
        }else{
            return res.status(403).json({
                message:"Unauthorized2"
            });    
        }
    }catch(err){
        return res.status(403).json({
            message:"Unauthorized3"
        });
    }
}

module.exports={
    authMiddleware
}