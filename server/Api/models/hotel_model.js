const mongoose=require('mongoose');
const hotelSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    hotelName: String,
    Address: String,
    location:String,
    url:String,
    price:Number,
    contact:String,
    rooms:Number
});


module.exports=mongoose.model('hotel',hotelSchema);