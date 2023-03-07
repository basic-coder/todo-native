import { sendMail } from '../utils/sendMail.js';
import User from '../models/users.js'
import { sendToken } from '../utils/sendToken.js';
import cloudinary from 'cloudinary'
import fs from 'fs';

export const register = async(req,res) =>{
    try {

        const {name,email,password} = req.body
        const {avatar} = req.files.avatar.tempFilePath;

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({success:false, message: "User already exists"});
        }

        const otp = Math.floor(Math.random() * 100000);

        const mycloud = await cloudinary.v2.uploader.upload(avatar(avatar,{
            folder: "todoApp"
        }))

        fs.rmSync("./tmp",{recursive : true})
        
        user = await User.create({name,email,password,avatar:{public_id:mycloud.public_id,url:mycloud.secure_url},otp,otp_expiry:new Date(Date.now() + process.env.OTP_EXPIRY *60*1000)})
        //await sendMail(email,"Verify your account",`Your account is ${otp}`);

        sendToken(res,user,201,"OTP send to your email, please verify your account")
    } catch (error) {
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const verify = async (req,res) =>{
    try {
        const otp = Number(req.body.otp)

        const user = await User.findById(req.user._id)

        if(user.otp !== otp || user.otp_expiry < Date.now()){
            return res.status(400).json({success:false, message: "Invalid otp or has been expired"});
        }

        user.verified = true
        user.otp = null;
        user.otp_expiry = null;

        await user.save()

        sendToken(res,user,200,"account verified")

    } catch (error) {
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const login = async(req,res) =>{
    try {

        const {email,password} = req.body
        //const {avatar} = req.files;

        let user = await User.findOne({email}).select('+password');

        if(!email||!password){
            return res.status(400).json({success:false, message: "Please enter all fields"});
        }

        if(!user){
            return res.status(400).json({success:false, message: "Invalid email or password"});
        }

        console.log(password);

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({success:false, message: "Invalid email or password"});
        }

        sendToken(res,user,200,"OTP send to your email, login successfully")
    } catch (error) {
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const logout = async(req,res) =>{
    try {

        res.status(200).cookie("token",null,{
            expires: new Date(Date.now())
        }).json({success: true, message: "Logged out sucessfully"})

    } catch (error) {
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const addTask = async(req,res) =>{
    try {

        const {title,description} = req.body

        const user = await User.findById(req.user._id);

        user.tasks.push({
            title,description,completed: false, createdAt: new Date(Date.now())
        })

        await user.save()

        res.status(200).json({success:true, message: "Task Added successfully"});

    } catch (error) {
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const removeTask = async(req,res) =>{
    try {

        const {taskId} = req.params

        const user = await User.findById(req.user._id);

        user.tasks = user.tasks.filter(task => task._id.toString() !== taskId.toString() );

        await user.save()

        res.status(200).json({success:true, message: "Task Deleted successfully"});

    } catch (error) {
        res.status(500).json({success:false, message: error.message});
    }
}

export const updateTask = async(req,res) =>{
    try {

        const {taskId} = req.params

        const user = await User.findById(req.user._id);

        user.task = user.tasks.find((task) => task._id.toString() === taskId.toString());

        console.log(user.task);
        user.task.completed = !user.task.completed    

        await user.save()

        res.status(200).json({success:true, message: "Task Updated successfully"});

    } catch (error) {
        res.status(500).json({success:false,  message: error.message});
    }
}

export const getMyProfile = async(req,res) =>{
    try {

        const user = await User.findById(req.user._id)

        sendToken(res,user,200,`Welcome Back ${user.name}`)
       
    } catch (error) {
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const updateProfile = async(req,res) =>{
    try {

        const user = await User.findById(req.user._id)

        const {name} = req.body;
        const {avatar} = req.files.avatar.tempFilePath;

        if(name) user.name = name
        if(avatar){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id)
            const mycloud = await cloudinary.v2.uploader.upload(avatar(avatar,{
                folder: "todoApp"
            }))
    
            fs.rmSync("./tmp",{recursive : true})
            user.avatar = {public_id:mycloud.public_id,url:mycloud.secure_url}
        } 

        await user.save()

        res.status(200).json({success:true, message: "User Updated successfully"});
       
    } catch (error) {
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const updatePassword = async(req,res) =>{
    try {

        const user = await User.findById(req.user._id).select('+password');

        const {oldPassword,newPassword} = req.body;
        
        const isMatch = await user.comparePassword(oldPassword);

        if(!isMatch){
            res.status(400).json({success:false, message: "invalid old password"});
        }

        user.password = newPassword

        await user.save()

        res.status(200).json({success:true, message: "Password Updated successfully"});
       
    } catch (error) {
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const forgotPassword = async(req,res) =>{
    try {

        const {email} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success:false, message: "Invalid email"});
        }
        
        const otp = Math.floor(Math.random() * 100000);

        user.resetPasswordOTP = otp;
        user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000

        console.log(otp);

        //const message = `Your OTP for reseting password is ${otp}. If you didn't request for this, please ignore this message`

        //await sendMail(email,"Request for updating password",message);

        await user.save()

        res.status(200).json({success:true, message: "otp has been sent to your email"});
       
    } catch (error) {
        res.status(500).json({success:false, message: error.message});
    }
}

export const resetPassword = async(req,res) =>{
    try {

        const {otp, newPassword} = req.body;

        const user = await User.findOne({
            resetPasswordOTP: otp,
            resetPasswordExpiry: {$gt: Date.now()}
        }).select('+password');

        if(!user){
            return res.status(400).json({success:false, message: "Invalid otp or has been expired"});
        }

        user.resetPasswordExpiry = null
        user.resetPasswordOTP = null
        user.password = newPassword
       
        await user.save()

        res.status(200).json({success:true, message: "Password changed successfully"});
       
    } catch (error) {
        res.status(500).json({success:false, message: "Server error"});
    }
}