const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const token=req.headers.authorisation.split(" ");
    try{
        const decoded=jwt.verify(token[1],"secret");
        req.userdata=decode;
    }catch(err){
        return res.status(401).json({
            message:"auth failed"
        })
    }
    next();
}