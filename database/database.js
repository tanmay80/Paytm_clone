const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tanmayaswal80:CozhNFuXZHRka3SR@cluster0.2em89tf.mongodb.net/paytm_database');

const userSchema = new mongoose.Schema({
    
    userName: String,
    firstName: String,
    lastName: String,
    password: String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports={
    User,
    Account,
}