const express =require('express');
const router=express.Router();
const booking=require('../models/booking_model');
const mongoose=require('mongoose');
const auth=require('../middleware/check-auth')

/// get the orders made by a perticular user
router.get('/mybooking/:userid',auth,(req,res,next)=>{
    const  user=req.params.userid;
    booking.find({user_id:user}).exec().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

// make the orders
router.post('/',auth,(req,res,next)=>{
   const order=new booking({
    _id:    new mongoose.Types.ObjectId(),
    user:   req.body.username,
    user_id:req.body.user_id,
    email:  req.body.email,
    hotel:  req.body.hotelName,
    checkIn:req.body.inDate,
    checkOut:req.body.outDate,
    Amount:req.body.Bill
    });
    order.save()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
})

/// cancel or delete order
router.delete('/del_order/:orderid',auth,(req,res,next)=>{
    const id=req.params.orderid;
    booking.deleteOne({_id:id}).exec().then(result=>{
        console.log(result);
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


module.exports=router;




/*


mongodb+srv://order:order@order-rngvt.mongodb.net/test?retryWrites=true&w=majority


*/