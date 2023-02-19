import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        selected: false,
        minlength: [8,"Password must be at least 8 character long"]
    },
    avatar:{
        public_id:String,
        url: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    verified:{
        type: Boolean,
        default: false
    },
    tasks:[{
        title: String,
        descripion: String,
        completed: Boolean,
        createdAt: Date
    }],
    otp: Number,
    otp_expiry: Date
})

userSchema.pre("save", async function(next){
    if(this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
})

userSchema.methods.getJWTToken = function(){
   return jwt.sign({_id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_COOKIE_EXPIRE
    })
}

const User = mongoose.model("User",userSchema)
export default User