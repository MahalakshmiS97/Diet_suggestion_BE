import mongoose from "./index.js"

const validateEmail = (e)=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e); 
}

const userSchema = new mongoose.Schema({
    Name:{type:String,required:[true,"Name is required"]},
    Email:{type:String,required:[true,"Email is required"],validate:validateEmail},
    Password:{type:String,required:[true,"Password is required"]},
    Height:{type:Number,required:[true,"Height is required"]},
    Weight:{type:Number,required:[true,"Weight is required"]},
    Gender:{type:String,required:[true,"Gender is required"]},
    Role:{type:String,default:'user'},
    BMI:{type:Number,default:function(){
        return (Math.floor((this.Weight) / (((this.Height) * (this.Height)) / 10000)))
    }},
    
    
},{
    collection:'user',
    versionKey:false
})

const userModel = mongoose.model('user',userSchema)
export default userModel