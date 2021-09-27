const express=require('express');
const router=express.Router();
const Employee3=require('../models/employee.js');




router.get('/employee/new',(req,res)=>{
    res.render('addEmployee');
})
router.post('/employee/new',(req,res)=>{
    let newEmployee={
        name:req.body.name,
        designation:req.body.designation,
        salary:req.body.salary
    };
    Employee3.create(newEmployee)
        .then(employee=>{
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err)
        })
});
router.get('/',(req,res)=>{
    Employee3.find({})
        .then(employee=>{
            req.flash('success_msg','Employee Deleted Successfully');
            res.render('index',{employee:employee});
        })
        .catch(err=>{
            console.log(err);
        });
    
});

router.get('/employee/search',(req,res)=>{

    res.render('searchEmployee',{employee:""});
});

router.post('/employee/search/action',(req,res)=>{
    
    let query={
        name:req.body.name
    };
    Employee3.find(query)
        .then(employee=>{
            res.render('searchEmployee',{employee:employee});
        })
        .catch(err=>{
            console.log(err);
        });
    
});

router.get('/editEmployee',(req,res)=>{

    let query={_id:req.query.id};
    Employee3.findOne(query)
        .then(employee=>{
            res.render('editEmployee',{employee:employee});
        })
        .catch(err=>{
            console.log(err);
        });
    
});
router.get('/deleteEmployee',(req,res)=>{

    let query={_id:req.query.id};
    Employee3.remove(query)
        .then(employee=>{
            req.flash('success_msg','Employee Deleted Successfully');
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        });
    
});
router.post('/editEmployee/action',(req,res)=>{

    
    Employee3.updateOne({_id:req.body.id},{$set:{name:req.body.name,designation:req.body.designation,salary:req.body.salary}})
        .then(employee=>{
            req.flash('success_msg','Employee Deleted Successfully');
            console.log(success_msg);
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        });
    
});
module.exports=router;