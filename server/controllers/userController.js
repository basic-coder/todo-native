import { sendMail } from '../utils/sendMail.js';
import User from '../models/users.js'

export const register = async(req,res) =>{
    try {

        const {name,email,password} = req.body

        //const {avatar} = req.files;

        const user = await User.find({email});

        if(user){
            return res.status(400).json({sucess:false, message: "User already exists"});
        }

        const otp = Math.floor(Math.random() * 100000);

        user = await User.create({name,email,password,avatar:{public_id:"",url:""},otp,otp_expiry:new Date.now()+ process.env.OTP_EXPIRY *60*1000})
        
        await sendMail(email,"Verify your account",`Your account is ${otp}`);

        sendToken(res,user,statusCode,"OTP send to your email, please verify your account")
    } catch (error) {
        res.status(500).json({sucess:false, message: "Server error"});
    }
}