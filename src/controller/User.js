import userModel from "../models/User.js";
import Auth from '../common/auth.js'
import nodeMail from 'nodemailer'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const create = async(req,res) =>{
    try {
        let user = await userModel.findOne({Email:req.body.Email}) 
        if(!user){
            req.body.Password= await Auth.hashPassword(req.body.Password)
            await userModel.create(req.body)
            res.status(202).send({
                message:"user created successfully",
            })
        }
        else{
            res.status(400).send({
                message:`user with ${req.body.Email} already exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
            
        })
    }
}

const login = async(req,res)=>{
    try {
        let user = await userModel.findOne({Email:req.body.Email}) 
        if(user){
            let hashCompare = await Auth.hashCompare(req.body.Password,user.Password)
            if(hashCompare){
                let token = await Auth.createToken({
                    Name:user.Name,
                    Email:user.Email,
                    Role:user.Role,
                    BMI:user.BMI
                })
                let userData = await userModel.findOne({Email:req.body.Email},{Password:0,Email:0,_id:0,Height:0,Weight:0,Gender:0})
                res.status(200).send({
                    message:"Login Successfully",
                    token,
                    userData

                })
            }
            else{
                res.status(400).send({
                    message:"Entered password is wrong"
                })
            }
        }
        else{
            res.status(400).send({
                message:`Account with ${req.body.Email} does not exist`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
const forgotPassword  = async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email})
        if(user){
            let sender=nodeMail.createTransport({
                service:"gmail",
                auth:{
                    user:process.env.EMAIL,
                    pass:process.env.PASSWORD
                },
            });
            const token = await Auth.createToken({id:user._id})
            //Reset link sending through Node Mailer
            let composeEmail={
                from:process.env.EMAIL,
                to:user.Email,
                subject:"Password reset link",
                html: `<p>Click <a href='${process.env.FE_URL}/${user._id}/${token}'> to reset your password</p>`
            }
            sender.sendMail(composeEmail, function(error, info){
                if(error){
                    console.log(error)
                }
                else{
                    res.status(200).send({
                        message:("Email sent Successfully", response.info),
                        info,
                    })
                }
            })
        }
        else{
            res.status(400).send({
                message:"Invalid email",
            })
        }
    } 
    catch (error) {
        console.log(error)
        
    }
}
const resetPassword = async(req,res)=>{
    const {id,token} = req.params
    const {Password} = req.body
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            bcrypt.hash(Password,10)
            .then(hash=>{
                userModel.findByIdAndUpdate({_id:id},{Password:hash})
                .then(u=>res.send({Status:"Success"}))
                .catch(err=>res.send({Status:err}))
            })
            .catch(err=>res.send({Status:err}))
        }
    })
}
const getAlluser = async(req,res)=>{
try {
    let user = await userModel.find({Role:'user'},{_id:1,Name:1,Height:1,Weight:1,Gender:1,BMI:1,Email:1})
    res.status(200).send({
        message:"User Fetched Successfully",
        user
    })
} 
catch (error) {
    res.status(500).send({
        message:"Internal Server Error",
        error:error.message
    })
}
}

export default {
    create,
    login,
    getAlluser,
    forgotPassword,
    resetPassword
}