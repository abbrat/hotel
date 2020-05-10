const express =require('express');
const router=express.Router();
const hotel=require('../models/hotel_model');
const mongoose=require('mongoose');

router.get('/',(req,res,next)=>{
    const location=req.body.location;
    hotel.find({location:location}).exec().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

router.post('/',(req,res,next)=>{
    const place=new hotel({
        _id:new mongoose.Types.ObjectId(),
        hotelName: req.body.hotel,
    Address: req.body.address,
    location:req.body.location,
    url:req.body.url,
    price:req.body.price,
    contact:req.body.contact,
    rooms:req.body.rooms
    });
    place.save().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(500).json(err);
    })
})



module.exports=router;




/*


mongodb+srv://hoteluser:hoteluser@hotel-c6ahv.mongodb.net/test?retryWrites=true&w=majority

*/