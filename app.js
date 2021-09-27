const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const session=require('express-session');
const flash=require('connect-flash');
const mongoose=require('mongoose');

dotenv.config({path:'./config.env'});
//Connecting with the database

mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const path=require('path');


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
const employeeRouter=require('./routes/employee.js');
const { nextTick } = require('process');
app.use(employeeRouter);
const PORT=process.env.PORT;
app.use(session({
    secret:"nodejs",
    resave:true,
    saveUninitialized:true

}));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash(('success_msg'));
    res.locals.success_error=req.flash(('success_error'));
    next();
})



app.listen(PORT,()=>{
    console.log('Server started at port:'+PORT);
});