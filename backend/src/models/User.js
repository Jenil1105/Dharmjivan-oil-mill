const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role:{
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    phone:{
        type: String,
        trim: true,
        unique: true,
    },
    address:{
        type: [String],
        trim: true,
    }

    
})

const User = mongoose.model("user", userSchema);
module.exports = User;