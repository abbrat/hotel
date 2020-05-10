const mongoose=require('mongoose');
const bookingSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user: String,
    user_id:String,
    email:String,
    hotel: String,
    checkIn:String,
    checkOut:String,
    Amount:Number
});


module.exports=mongoose.model('booking',bookingSchema);