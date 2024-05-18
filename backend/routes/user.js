const express = require('express');
const {User,Account} = require('../../database/database');
const router= express.Router();
const JWT_SECRET=require("../config");
const jwt= require("jsonwebtoken");
const { authMiddleware } = require('../middleware');
const { signupSchema,signinSchema,updateSchema } = require('./zod');

router.post('/signup', async (req, res) => {
    const body= req.body;
    const {success} = signupSchema.safeParse(body);

    if(!success){
        console.log("Hello");
        return res.json({
            message: "Username already taken / Incorrect inputs"
        })
    }
    

    const user = await User.findOne({
        userName: body.userName
    })
 

    if(user){
        return res.json({
            message: "Username already taken / Incorrect inputs"
        })
    }

    const newUser = await User.create(body);
    const newUserId=newUser._id;

    await Account.create({
        userId: newUserId,
        balance: 1+Math.random()*10000,
    })

    const token = jwt.sign({
        userid: newUser._id,
    },JWT_SECRET);



    res.json({
        message:"User Created Successfully",
        token:token
    })

});

router.post('/signin',authMiddleware, async (req, res) => {
    const body= req.body;
    const {success} = signinSchema.safeParse(body);

    if(!success){
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }
    
    
    const user = await User.findOne({ userName: body.userName, password: body.password });
    if (user) {
        res.send("Signin successful");
    } else {
        res.status(401).send("Invalid credentials");
    }
});

router.put('/update',authMiddleware, async (req, res) => {
    const body= req.body;
    const {success} = updateSchema.safeParse(body);

    if(!success){
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }

    await User.updateOne(body,{
        id:body.userid,
    })

    res.json({
        message: "Updated Successfully"
    })
});


router.get('/bulk',authMiddleware, async (req,res)=>{
    const filter=  req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName:{
                "$regex": filter
            }
        },{ lastName:{
                "$regex": filter
            }
        },]
    })

    res.json({
        user: users.map(user=>({
            username: user.userName,
            firstname: user.firstName,
            lastname: user.lastName,
            _id: user._id,
        }))
    })
})

module.exports=router;