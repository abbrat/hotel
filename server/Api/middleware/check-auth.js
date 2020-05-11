const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const token=req.header.x-auth-token;
    try{
        const decoded=jwt.verify(token[1],"secret");
        req.userdata=decoded;
    }catch(err){
        return res.status(401).json({
            message:"auth failed"
        })
    }
    next();
}