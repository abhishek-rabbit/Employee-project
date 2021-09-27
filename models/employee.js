const mongoose=require('mongoose');

let newEmployeeSchema=new mongoose.Schema({
    name:String,
    designation:String,
    salary:Number
});

module.exports=mongoose.model('Employee3',newEmployeeSchema);