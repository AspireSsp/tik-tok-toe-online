const User = require("../models/userModel")
const bcrypt = require('bcryptjs');
// const authenticate = require('../middlewares/auth');


exports.registerUser = async(req, res)=>{
    const {name,userName, email, password} = req.body;
    if(!name || !email|| !password || !userName){
        return res.status(400).json({Error: "Plz fill all the field properly..",status: 400})
    }
    try {
        const userExist = await User.findOne({email: email});
        if(userExist){
            return res.status(400).json({Error: "User exist",status: 400})
        }
        const user = new User({name,userName, email, password});
        await user.save();
        res.status(200).json({message:"success",status: 200})
    } catch (error) {
        // console.log(err)
        res.status(400).json({error : error.message,status: 400})
    }
}

exports.loginUser = async(req, res)=>{
    try {
        const {userName, password} = req.body;
        if(!password || !userName){
            return res.status(400).json({error: "fill proper details",status: 400})
        }
        const userLogin = await User.findOne({userName}).select("+password");
        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);
            if(!isMatch){
               res.status(400).json({error: "invailid login details", status: 400})
           }else{
               res.status(200).json({message:"login sucessfull",status:200 ,userLogin })
            }
       }else{
            res.status(400).json({error : "user error",status: 400}) 
        }
    } catch (error) {
        // console.log(error);
        res.status(400).json({error : error.message,status: 400})
    } 
}