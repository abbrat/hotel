const express =require('express');
const router=express.Router();
const user=require('../models/user_model');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

///login route
router.post('/login',(req,res,next)=>{    
    user.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
          return res.status(401).json({
              message:"auth failed"
          });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    error:"auth failed"
                })
            }
            if(result){
                const token=jwt.sign({
                    email:user[0].email,
                    userId:user[0]._id
                },
                "secret",
                {
                    expiresIn:"1h"
                }
                )
               return  res.status(200).json({
                    message:"auth granted",
                    token:token
                })
            }
            return res.status(401).json({
                message:"auth failed"
            })
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
     })
})

/// forgot password route
router.get('/forgot',(req,res,next)=>{
    
    const  email=req.body.email;
    user.findOne({email:email},(err,user)=>{
      if(err){
          console.log(err);
          return res.status(500).send();
      }
      if(!user){
          return res.status(404).send({message:"no such user"});
      }
      return res.status(200).send(user);
  })
})

////register route
router.post('/register',(req,res,next)=>{
    user.find({email:req.body.email})
    .exec()
    .then(use=>{
        if(use.length>=1){
            return res.status(409).json({
                error:"mail exist"
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    res.status(500).json({
                        error:err
                    })
                }
                else{
                    const person=new user({
                        _id:new mongoose.Types.ObjectId(),
                        UserName:req.body.name,
                        password:hash,
                        email:req.body.email
                    });
                    person.save().then(result=>{
                        console.log(result);
                        res.status(200).json({
                            message:"post operation successful",
                            newUser: result
                        })
                    }).catch(err=>{
                        console.log(err)
                        res.status(500).json({
                            error:err
                        })
                     });
                }
            })
            
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
     });
})


/// delete account route
router.delete('/:userId',(req,res,next)=>{
    const id=req.params.userId;
    user.deleteOne({_id:id}).exec().then(result=>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


/// update password route
router.patch('/changePassword/:userId',(req,res,next)=>{
    const id=req.params.userId;
    user.update({_id:id},{$set:{password:req.body.newpassword}}).exec().then(result=>{
        console.log(result);
       res.status(200).json(result);
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports=router;

