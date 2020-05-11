const express=require('express');
const app=express();
const morgan= require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


const user_router=require('./Api/routes/user_router');/// router handeling login and register
const booking_router=require('./Api/routes/booking_router')// router handing bookins ans modifying bookings
const hotel_router=require('./Api/routes/hotel_router');// router handeling hotel option details


mongoose.connect('mongodb+srv://order:order@order-rngvt.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true },()=>{
    console.log("db connected +")
});

// logger
app.use(morgan('dev'));
// parser 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extended:false}));
//// cors access
app.use((req,res,next)=>{    
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","*");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Method','GET,POST,DELETE,PATCH,PUT');
        return res.status(200).json({});
    }
    next();
})

//// routes
app.use('/user',user_router);
app.use('/book',booking_router);
app.use('/hotel',hotel_router);

/// error control
app.use((req,res,next)=>{
    const err=new Error('trying to acces an unhandeled route');
    err.status=404;
    next(err);
})
app.use((error,req,res,next)=>{
    res.status(error.status||500).json({
        error:{
            message:error.message,
            kk:"vfvdfbfbfb"
        }
    })

})

module.exports=app;