const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account, mongoose } = require('../../database/database');
const router= express.Router();

router.get('/balance',authMiddleware,async (req,res)=>{
    const account= await Account.findOne({
        userId: req.userId,
    });

    res.json({
        balance: account.balance
    })
});

router.post('/transfer',authMiddleware ,async (req,res)=>{
    console.log("Reached here")

    if (!mongoose.connection.readyState) {
        console.error( 'Mongoose not connected');
        return res.status(500).json({ message: 'Database connection error' });
    }

    const session= await mongoose.startSession();
    console.log("Reached here2")
    session.startTransaction();
    console.log("Reached here3")
    const {amount,to}=req.body;

    const fromAccount= await Account.findOne({userId: req.userId}).session(session);
    
    if(!fromAccount || fromAccount.balance<amount){
        await session.abortTransaction();
        console.log("Insufficient Balance");
        return res.json({
            message:"Insufficient Balance"
        });
    }

    const toAccount= await Account.findOne({userId: to}).session(session);

    if(!toAccount ){
        await session.abortTransaction();
        console.log("Account not found");
        return res.json({
            message:"Account not found"
        });
    }

    await Account.updateOne({userId: req.userId},{$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to},{$inc: {balance: +amount}}).session(session);

    await session.commitTransaction();
    console.log("Transaction Completed");

    return res.status(200).json({
        message:"Transaction Completed"
    })
});

module.exports=router;